var editor = {};
editor.post = {};
editor.warning = false;

editor.loadArticle = function(dbId) {
  articleView.getTemplate(function() {
    editor.livePreview();

    dbId = dbId || util.getQuery('id');
    console.log(dbId);
    Article.findById(dbId, function(array) {
      editor.autofill(array[0]);
    });
  });
};

editor.createArticle = function() {
  articleView.getTemplate(function() {
    editor.livePreview();
    console.log('create new article');
  });
};

editor.autofill = function(article) {
  $('#article-title').val(article.title);
  $('#article-author').val(article.author);
  $('#article-author-url').val(article.authorUrl);
  $('#article-markdown').val(article.markdown);
  $('#article-category').val(article.category);
  $('#article-sch-date').val(article.publishedOn);
  editor.post = article;
  editor.determinePubDate();
  $('form').trigger('mouseup');
};

editor.livePreview = function() {
  $('form').on('keyup mouseup', function(event) {
    event.preventDefault();
    // read values from form
    editor.post.title = $('#article-title').val();
    editor.post.author = $('#article-author').val();
    editor.post.authorUrl = $('#article-author-url').val();
    editor.post.markdown = $('#article-markdown').val();
    editor.post.body = marked(editor.post.markdown);
    editor.post.category = $('#article-category').val();
    editor.post.publishedOn = $('#article-sch-date').val();

    // generate article preview in right-hand module
    $('#preview').empty();
    var newArticle = new Article(editor.post);
    var compiledHTML = newArticle.toHTML();
    $('#preview').append(compiledHTML);
    $('.post-body~button').hide();

    // syntax highlighting for code blocks
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    // remove all warning labels
    $('.warning').remove();
    editor.warning = false;
  });
};

// the original publish date is display on form by default
// this function allows admin to change the date when the 'Use original publish date' box is unchecked
editor.determinePubDate = function() {
  $('#article-published').on('change', function() {
    $('#article-sch-date').attr('disabled', !$('#article-sch-date').attr('disabled'));
    if (!$('#article-published').attr('checked')) {
      editor.post.publishedOn = $('#article-sch-date').val();
    }
  });
};

editor.backToHome = function() {
  $('#back-home-button').on('click', function() {
    util.redirectTo('?admin=true');
  });
};

editor.saveChanges = function() {
  $('#save-button').on('click', function(event) {
    event.preventDefault();
    editor.post.updateRecord(editor.post, function() {
      editor.generateJSON('Your changes have been saved!', true);
    });
  });
};

editor.deletePost = function() {
  $('#delete-button').on('click', function(event) {
    event.preventDefault();
    var confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      editor.post.deleteRecord(function() {
        editor.generateJSON('Your article has been deleted.', false);
        editor.post = {};
      });
    }
  });
};

// generate JSON string with info of all articles
editor.generateJSON = function(msg, returnToEdit) {
  Article.loadAll(function() {
    $('#article-json').text(JSON.stringify(Article.all));
  });
  // option to display 'Back to Editor' button
  if (returnToEdit) {
    $('#return-button').show();
    $('#return-button').on('click', function(event) {
      event.preventDefault();
      $('#json-area').hide();
      $('#form-area').fadeIn();
    });
  } else {
    $('#return-button').hide();
  }
  $('#json-msg').text(msg);
  $('#form-area').hide();
  $('#json-area').fadeIn();
};

editor.handleButtons = function() {
  editor.saveChanges();
  editor.deletePost();
  editor.backToHome();
};

$(function() {
  // webDB.init();
  // editor.loadTemplate();
  editor.loadArticle();
  editor.handleButtons();
});

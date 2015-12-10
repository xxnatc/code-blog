var editor = {};
editor.post = {};
editor.warning = false;

editor.loadTemplate = function() {
  $.get('template/post-template.handlebars', function(data) {
    Article.prototype.template = Handlebars.compile(data);
  }).done();
};

editor.loadArticle = function() {
  var dbId = util.getQuery('id');
  webDB.execute([{
    'sql': 'SELECT * FROM articles WHERE id = ?',
    'data': [dbId]
  }], function(result) {
    editor.autofill(result[0]);
  });
};

editor.autofill = function(article) {
  console.log(article);
  $('#article-title').val(article.title);
  $('#article-author').val(article.author);
  $('#article-author-url').val(article.authorUrl);
  $('#article-markdown').val(article.markdown);
  $('#article-category').val(article.category);
  editor.post = article;
  $('form').trigger('mouseup');
};

editor.livePreview = function() {
  $('form').on('keyup mouseup', function(event) {
    event.preventDefault();
    // read values from form
    editor.post.title = $('#article-title').val();
    editor.post.author = $('#article-author').val();
    editor.post.authorUrl = $('#article-author-url').val();
    editor.post.publishedOn = new Date();
    editor.post.markdown = $('#article-markdown').val();
    editor.post.body = marked(editor.post.markdown);
    editor.post.category = $('#article-category').val();

    // generate article preview in right-hand module
    $('#home').children().remove();
    var newArticle = new Article(editor.post);
    newArticle.toHTML();
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

editor.backToHome = function() {
  $('#back-home-button').on('click', function() {
    $(location).attr('href', '/index.html');
  });
};

editor.saveChanges = function() {
  $('#save-button').on('click', function() {
    webDB.execute([{
      'sql': 'UPDATE articles SET title = ?, author = ?, authorUrl = ?, publishedOn = ?, markdown = ?, category = ? WHERE id = ?',
      'data': [editor.post.title, editor.post.author, editor.post.authorUrl, editor.post.publishedOn, editor.post.markdown, editor.post.category, editor.post.id]
    }]);
  });
};

editor.deletePost = function() {
  $('#delete-button').on('click', function() {
    webDB.execute([{
      'sql': 'DELETE FROM articles WHERE id = ?',
      'data': [editor.post.id]
    }], function() {
      editor.post = {};
      editor.autofill(editor.post);
    });
  });
};

$(function() {
  webDB.init();
  editor.loadTemplate();
  editor.livePreview();
  editor.loadArticle();
  editor.saveChanges();
  editor.deletePost();
  editor.backToHome();
});

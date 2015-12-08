var editor = {};

// grab content from form and generate preview on every keyup and mouseup
editor.preview = function() {
  editor.post = {};

  $('form').on('keyup mouseup', function(event) {
    event.preventDefault();

    editor.post.title = $('#article-title').val();
    editor.post.category = $('#article-category').val();
    editor.post.author = $('#article-author').val();    
    editor.post.authorUrl = $('#article-author-url').val();
    editor.post.publishedOn = new Date();
    editor.post.body = marked($('#article-body').val());

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
  });
};

// clear form and delete preview
editor.clear = function() {
  $('#clear-button').on('click', function() {
    $('form').find('input[type=text], textarea').val('');
    $('form').trigger('mouseup');
    $('#home').children().remove();
    $('#article-json').text('');
  });
};

// check if all fields in the form are filled in
// the function returns true if no field is empty, returns false otherwise and gives error message to corresponding fields
editor.checkNonEmpty = function() {
  var nonEmpty = true;
  var giveErrorMsg = function(selector) {
    $(selector).before('<span class="warning">This is a required field</span>');
    nonEmpty = false;
  };
  if (!editor.post.title) { giveErrorMsg('#article-title'); }
  if (!editor.post.author) { giveErrorMsg('#article-author'); }
  if (!editor.post.authorUrl) { giveErrorMsg('#article-author-url'); }
  if (!editor.post.body) { giveErrorMsg('#article-body'); }
  if (!editor.post.category) { giveErrorMsg('#article-category'); }
  return nonEmpty;
};

// dictate the JSON code generation and flipping of left module
editor.generateJSON = function() {
  $('#gen-code-button').on('click', function(event) {
    event.preventDefault();
    var nonEmpty = editor.checkNonEmpty();
    if (nonEmpty) {
      $('#article-json').text(JSON.stringify(editor.post));
      $('#form-area').hide();
      $('#json-area').fadeIn();
      $(location).attr('href', '#article-json'); 
    }
  });

  $('#return-button').on('click', function() {
    $('#json-area').hide();
    $('#form-area').fadeIn();
  });
};

// grab blog post template and call function to listen to changes
editor.getTemplate = function() {
  $.get('../template/post-template.handlebars', function(data) {
    Article.prototype.template = Handlebars.compile(data);
  }).done(function() {
    editor.preview();
    editor.clear();
    editor.generateJSON();
  });
};

$(function() {
  editor.getTemplate();  
});

var editor = {
  post: {},
  warning: false
};

// grab blog post template and call function to listen to changes
editor.getTemplate = function() {
  $.get('../template/post-template.handlebars', function(data) {
    Article.prototype.template = Handlebars.compile(data);
  }).done(function() {
    editor.preview();
    editor.loadFromCache();
    editor.clearForm();
    editor.generateJSON();
  });
};

// load content to form if a draft is found in local storage
editor.loadFromCache = function() {
  var draft = localStorage.getItem('draft');
  if (draft) {
    // write values to form 
    editor.post = JSON.parse(draft);
    $('#article-title').val(editor.post.title);
    $('#article-author').val(editor.post.author);
    $('#article-author-url').val(editor.post.authorUrl);
    $('#article-body').val(editor.post.markdown);
    $('#article-category').val(editor.post.category);
    $('form').trigger('mouseup');
  }
};

// grab content from form and generate preview on every keyup and mouseup
editor.preview = function() {

  $('form').on('keyup mouseup', function(event) {
    event.preventDefault();
    // read values from form
    editor.post.title = $('#article-title').val();
    editor.post.author = $('#article-author').val();    
    editor.post.authorUrl = $('#article-author-url').val();
    editor.post.publishedOn = new Date();
    editor.post.markdown = $('#article-body').val();
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

    // save the current content in local storage
    localStorage.setItem('draft', JSON.stringify(editor.post));
  });
};

// clear form, delete preview, 
editor.clearForm = function() {
  $('#clear-button').on('click', function() {
    $('form').find('input[type=text], textarea').val('');
    $('form').trigger('mouseup');
    localStorage.removeItem('draft');
    editor.warning = false;
    $('#home').children().remove();
  });
};

// check if all fields in the form are filled in
// the function returns true if no field is empty, returns false otherwise and gives error message to corresponding fields
// it also flags a warning tag to avoid multiple warnings
editor.checkNonEmpty = function() {
  var nonEmpty = true;
  var giveErrorMsg = function(selector) {
    $(selector).before('<span class="warning">This is a required field</span>');
    nonEmpty = false;
    editor.warning = true;
  };
  if (!editor.warning) {
    if (!editor.post.title) { giveErrorMsg('#article-title'); }
    if (!editor.post.author) { giveErrorMsg('#article-author'); }
    if (!editor.post.authorUrl) { giveErrorMsg('#article-author-url'); }
    if (!editor.post.body) { giveErrorMsg('#article-body'); }
    if (!editor.post.category) { giveErrorMsg('#article-category'); }
  }
  return nonEmpty;
};

// dictate the JSON code generation and flipping of left module
editor.generateJSON = function() {
  $('#gen-code-button').on('click', function(event) {
    event.preventDefault();
    var nonEmpty = editor.checkNonEmpty();
    if (nonEmpty && !editor.warning) {
      // generate and show JSON code only when all form fields are filled in
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

$(function() {
  editor.getTemplate();  
});

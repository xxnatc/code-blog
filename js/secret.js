var secret = {
  post: {},
  warning: false
};

// grab blog post template and call function to listen to changes
secret.getTemplate = function() {
  $.get('../template/post-template.handlebars', function(data) {
    Article.prototype.template = Handlebars.compile(data);
  }).done(function() {
    secret.preview();
    secret.loadFromCache();
    secret.clearForm();
    secret.generateJSON();
  });
};

// load content to form if a draft is found in local storage
secret.loadFromCache = function() {
  var draft = localStorage.getItem('draft');
  if (draft) {
    // write values to form
    secret.post = JSON.parse(draft);
    $('#article-title').val(secret.post.title);
    $('#article-author').val(secret.post.author);
    $('#article-author-url').val(secret.post.authorUrl);
    $('#article-body').val(secret.post.markdown);
    $('#article-category').val(secret.post.category);
    $('form').trigger('mouseup');
  }
};

// grab content from form and generate preview on every keyup and mouseup
secret.preview = function() {

  $('form').on('keyup mouseup', function(event) {
    event.preventDefault();
    // read values from form
    secret.post.title = $('#article-title').val();
    secret.post.author = $('#article-author').val();
    secret.post.authorUrl = $('#article-author-url').val();
    secret.post.publishedOn = new Date();
    secret.post.markdown = $('#article-body').val();
    secret.post.body = marked(secret.post.markdown);
    secret.post.category = $('#article-category').val();

    // generate article preview in right-hand module
    $('#home').children().remove();
    var newArticle = new Article(secret.post);
    newArticle.toHTML();
    $('.post-body~button').hide();

    // syntax highlighting for code blocks
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    // remove all warning labels
    $('.warning').remove();
    secret.warning = false;

    // save the current content in local storage
    localStorage.setItem('draft', JSON.stringify(secret.post));
  });
};

// clear form, delete preview,
secret.clearForm = function() {
  $('#clear-button').on('click', function() {
    $('form').find('input[type=text], textarea').val('');
    $('form').trigger('mouseup');
    localStorage.removeItem('draft');
    secret.warning = false;
    $('#home').children().remove();
  });
};

// check if all fields in the form are filled in
// the function returns true if no field is empty, returns false otherwise and gives error message to corresponding fields
// it also flags a warning tag to avoid multiple warnings
secret.checkNonEmpty = function() {
  var nonEmpty = true;
  var giveErrorMsg = function(selector) {
    $(selector).before('<span class="warning">This is a required field</span>');
    nonEmpty = false;
    secret.warning = true;
  };
  if (!secret.warning) {
    if (!secret.post.title) { giveErrorMsg('#article-title'); }
    if (!secret.post.author) { giveErrorMsg('#article-author'); }
    if (!secret.post.authorUrl) { giveErrorMsg('#article-author-url'); }
    if (!secret.post.body) { giveErrorMsg('#article-body'); }
    if (!secret.post.category) { giveErrorMsg('#article-category'); }
  }
  return nonEmpty;
};

// dictate the JSON code generation and flipping of left module
secret.generateJSON = function() {
  $('#gen-code-button').on('click', function(event) {
    event.preventDefault();
    var nonEmpty = secret.checkNonEmpty();
    if (nonEmpty && !secret.warning) {
      // generate and show JSON code only when all form fields are filled in
      $('#article-json').text(JSON.stringify(secret.post));
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
  secret.getTemplate();
});

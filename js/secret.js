var editor = {};

editor.preview = function() {
  editor.prop = {};

  $('form').on('keyup mouseup', function(event) {
    event.preventDefault();

    editor.prop.title = $('#article-title').val();
    editor.prop.category = $('#article-category').val();
    editor.prop.author = $('#article-author').val();    
    editor.prop.authorUrl = $('#article-author-url').val();
    // editor.prop.publishedOn = (new Date()).toISOString().substring(0,10);
    editor.prop.publishedOn = new Date();
    editor.prop.body = marked($('#article-body').val());

    $('#home').children().remove();
    var newArticle = new Article(editor.prop);
    newArticle.toHTML();

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
};

editor.clear = function() {
  $('#clear-button').on('click', function() {
    $('form').find('input[type=text], textarea').val('');
    $('form').trigger('mouseup');
    $('#home').children().remove();
    $('#article-json').text('');
  });
};

editor.generateJSON = function() {
  $('#gen-code-button').on('click', function(event) {
    event.preventDefault();
    // $('#article-json').val(JSON.stringify(editor.prop));
    $('#article-json').show().text(JSON.stringify(editor.prop));
    $(location).attr('href', '#article-json'); 
  });
};

$(function() {
  editor.preview();
  editor.clear();
  editor.generateJSON();
});

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
  $('#article-title').val(article.title);
  $('#article-author').val(article.author);
  $('#article-author-url').val(article.authorUrl);
  $('#article-markdown').val(article.markdown);
  $('#article-category').val(article.category);
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

$(function() {
  webDB.init();
  editor.loadTemplate();
  editor.livePreview();
  editor.loadArticle();
});

$('#preview-button').on('click', function(event) {
  event.preventDefault();

  var prop = {};
  prop.title = $('#article-title').val();
  prop.author = $('#article-author').val();
  prop.authorUrl = $('#article-author-url').val();
  prop.category = $('#article-category').val();
  prop.publishedOn = new Date();

  $articleBody = $('#article-body').val();
  prop.body = marked($articleBody);

  var newArticle = new Article(prop);
  $('#home').children().remove();
  newArticle.toHTML();

  $('#article-json').val(JSON.stringify(prop));
});

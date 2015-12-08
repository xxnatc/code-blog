var stats = {};

stats.display = function() {
  stats.showTotalArticles();
  stats.showTotalAuthors();

};

stats.showTotalArticles = function(argument) {
  var $headline = $('<h3>Number of Articles</h3>');
  var $number = $('<h2>' + blog.articles.length + '</h2>');
  $('#num-articles').append([$headline, $number]);
};

stats.showTotalAuthors = function(argument) {
  var $headline = $('<h3>Number of Authors</h3>');
  var $number = $('<h2>' + blog.listAuthor.length + '</h2>');
  $('#num-authors').append([$headline, $number]);
};

$(function() {
  blog.importArticles();
  $(document).ajaxComplete(stats.display);
});

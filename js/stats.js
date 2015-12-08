var stats = {};

stats.displayStats = function() {
  stats.showTotalArticles();
  stats.showTotalAuthors();
  stats.wordCount();
  stats.showTotalWords();

};

stats.showTotalArticles = function() {
  var $headline = $('<h3>Number of Articles</h3>');
  var $number = $('<h2>' + blog.articles.length + '</h2>');
  $('#num-articles').append([$headline, $number]);
};

stats.showTotalAuthors = function() {
  var $headline = $('<h3>Number of Authors</h3>');
  var $number = $('<h2>' + blog.listAuthor.length + '</h2>');
  $('#num-authors').append([$headline, $number]);
};

stats.listWordCount = [];
stats.wordCount = function() {
  blog.articles.forEach(function(article) {
    stats.listWordCount.push(stats.wordPerArticle(article));
  });
};

stats.wordPerArticle = function(article) {
  return article.body.split(' ').length;
};

stats.showTotalWords = function() {
  var $headline = $('<h3>Number of Words</h3>');
  var $number = $('<h2>' + stats.listWordCount.reduce(stats.sum) + '</h2>');
  $('#num-words').append([$headline, $number]);
};

stats.sum = function(acc, num) {
  return acc + num;
};

$(function() {
  blog.importArticles();
  $(document).ajaxComplete(stats.displayStats);
});

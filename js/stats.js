var stats = {};

stats.displayStats = function() {
  stats.showTotalArticles();
  stats.showTotalAuthors();
  // execute word count
  stats.countAll();
  
  stats.showTotalWords();
  stats.showAvgOverall();
  stats.showAvgPerAuthor();
};

/* ==================== write on page ==================== */
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

stats.showTotalWords = function() {
  var $headline = $('<h3>Number of Words</h3>');
  var $number = $('<h2>' + stats.listWordCount.reduce(stats.sum) + '</h2>');
  $('#num-words').append([$headline, $number]);
};

stats.showAvgOverall = function() {
  var $headline = $('<h3>Average length of article</h3>');
  var $number = $('<h2>' + stats.listWordCount.reduce(stats.sum) / blog.articles.length + ' words</h2>');
  $('#avg-overall').append([$headline, $number]);
};

stats.showAvgPerAuthor = function() {
  var $headline = $('<h3>Average article length per author</h3>');
  $('#avg-authors').append($headline);
  stats.avgWordsPerAuthor();
};

/* ==================== word count ==================== */
// count number of words on each article
stats.listWordCount = [];
stats.countAll = function() {
  blog.articles.forEach(function(article) {
    stats.listWordCount.push(stats.countArticle(article));
  });
};

stats.countArticle = function(article) {
  return article.body.split(' ').length;
};

/* ==================== word count per author ==================== */

stats.avgWordsPerAuthor = function() {
  blog.listAuthor.forEach(stats.wordsPerAuthor);
};

stats.wordsPerAuthor = function(element, index, array) {
  var wpa = blog.listAuthorIndex[index].reduce(function(acc, current) {
    return acc + stats.listWordCount[current];
  }, 0);
  stats.appendPerAuthor(blog.listAuthor[index], wpa);
};

stats.appendPerAuthor = function(author, count) {
  var comp = $('<p>');
  comp.text(author + ': ' + count);
  $('#avg-authors').append(comp);
};

/* ==================== helpers ==================== */
stats.sum = function(acc, num) {
  return acc + num;
};


$(function() {
  blog.importArticles();
  $(document).ajaxComplete(stats.displayStats);
});

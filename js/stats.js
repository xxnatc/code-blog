var stats = {};

stats.displayStats = function() {
  console.log('Initiatizing stats');
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
  var $headline = $('<h3>Average article length</h3>');
  var $number = $('<h2>'
    + (stats.listWordCount.reduce(stats.sum) / blog.articles.length).toFixed(2)
    + ' words</h2>');
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
  return article.body.split(/\s/).filter(stats.excludeAttr).length;
};

// account for extra word caused by counting an attribute
// (marked.js inserts an id for headers, this filter will eliminate that concern)
stats.excludeAttr = function(segment) {
  return !segment.startsWith('="', 2);
};

/* ==================== word count per author ==================== */
stats.avgWordsPerAuthor = function() {
  blog.listAuthor.forEach(stats.wordsPerAuthor);
};

stats.listWordCountAuthor = [];  // keep track of calculated value, this array is not used
stats.wordsPerAuthor = function(element, index, array) {
  var articleIndex = blog.listAuthorIndex[index];
  var sumPerAuthor = articleIndex.reduce(function(acc, current) {
    return acc + stats.listWordCount[current];
  }, 0);
  var avgPerAuthor = (sumPerAuthor / articleIndex.length).toFixed(2);
  stats.listWordCountAuthor.push(avgPerAuthor);
  stats.appendPerAuthor(blog.listAuthor[index], avgPerAuthor);
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

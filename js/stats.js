var stats = {};

stats.displayStats = function() {
  stats.showTotalArticles();
  stats.showTotalAuthors();

  stats.countAll();
  stats.showTotalWords();


  stats.showAvgOverall();
  stats.showAvgPerAuthor();
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
stats.countAll = function() {
  blog.articles.forEach(function(article) {
    stats.listWordCount.push(stats.countArticle(article));
  });
};

stats.countArticle = function(article) {
  return article.body.split(' ').length;
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

stats.appendAvgPerAuthor = function(author, count) {
  var comp = $('<p>');
  comp.text(author + ': ' + count);
  $('#avg-authors').append(comp);
};

stats.wpa = [];
stats.avgWordsPerAuthor = function() {
  blog.listAuthor.forEach(stats.wordsPerAuthor);
};

stats.wordsPerAuthor = function(element, index, array) {
// list of article indices
  var wpa = blog.listAuthorIndex[index].reduce(function(acc, current) {
    return acc + stats.listWordCount[current];
  }, 0);
  console.log(blog.listAuthor[index], wpa);
  stats.appendAvgPerAuthor(blog.listAuthor[index], wpa);
  stats.wpa.push(wpa);
};

stats.sum = function(acc, num) {
  return acc + num;
};



$(function() {
  blog.importArticles();
  $(document).ajaxComplete(stats.displayStats);
});

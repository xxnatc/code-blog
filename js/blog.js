var blog = {};

blog.articles = [];

// import content from blogArticles.js
blog.importArticles = function() {
  for (var i = 0; i < blog.rawData.length; i++) {
    var post = new Article(blog.rawData[i]);
    blog.articles.push(post);
  }
};

// sorting all posts such that latest post appears on top
blog.sortArticles = function() {
  blog.articles.sort(function(a, b) {
    return b.published - a.published;
  });
};

// write posts to page
blog.populate = function() {
  for (var i = 0; i < blog.rawData.length; i++) {
    blog.articles[i].toHTML();
  };
};

$(function() {
  var today = new Date();
  // import & sort through raw data
  blog.importArticles();
  blog.sortArticles();
  
  // print to page
  blog.populate();
});

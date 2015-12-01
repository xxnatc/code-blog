var today = Date.parse(new Date());

// import content from blogArticles.js
blog.articles = [];
for (var i = 0; i < blog.rawData.length; i++) {
  var post = new Article(blog.rawData[i]);
  blog.articles.push(post);
}

// sorting all posts such that latest post appears on top
blog.articles.sort(function(a, b) {
  return b.published - a.published;
});

// write posts to page
for (var i = 0; i < blog.rawData.length; i++) {
  blog.articles[i].toHTML();
};

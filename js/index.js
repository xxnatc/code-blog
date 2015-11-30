var today = Date.parse(new Date());

// import content and write to HTML
blog.articles = [];
for (var i = 0; i < blog.rawData.length; i++) {
  var post = new Article(blog.rawData[i]);
  post.toHTML();
  blog.articles.push(post);
}

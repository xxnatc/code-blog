var today = Date.parse(new Date());

// import content and write to HTML
blog.articles = [];
blog.content = '';
for (var i = 0; i < blog.rawData.length; i++) {
  var post = new Article(blog.rawData[i]);
  blog.articles.push(post);
  blog.content += blog.articles[i].toHTML();
}
$('main').html(blog.content);

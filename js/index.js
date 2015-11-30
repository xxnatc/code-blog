blog.articles = [];

var post1 = new Article(blog.rawData[0]);
blog.articles.push(post1);
console.log(blog.articles[0].toHTML());
$('main').html(blog.articles[0].toHTML());

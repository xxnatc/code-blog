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

// display blog posts on home page
blog.populate = function() {
  for (var i = 0; i < blog.rawData.length; i++) {
    blog.articles[i].toHTML();
  };
};

// display just the first paragraph of each post, 
// showing the rest only when the 'Read on' button is pressed
blog.previewArticles = function() {
  $('article p:not(:first-child)').hide();

  // listen for click
  $('#blog-posts').on('click', '.post-read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('p').show();
    $(this).hide();
  });
};

$(function() {
  var today = new Date();
  // import & sort through raw data
  blog.importArticles();
  blog.sortArticles();
  
  // print to page
  blog.populate();

  // truncate posts to the first paragraph
  blog.previewArticles();
});

var blog = {};
blog.articles = [];
blog.listAuthor = [];
blog.listCategory = [];

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
  $('#home').on('click', '.post-read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('p').show();
    $(this).hide();
  });
};

blog.createFilters = function() {
  for (var i = 0; i < blog.articles.length; i++) {
    var temp = blog.articles[i].author;
    // check if already logged
    if (blog.listAuthor.indexOf(temp) < 0) {
      blog.listAuthor.push(temp);
    }
  }

  for (var i = 0; i < blog.articles.length; i++) {
    var temp = blog.articles[i].category;
    if (blog.listCategory.indexOf(temp) < 0) {
      blog.listCategory.push(temp);
    }
  }
};

blog.createFilters = function(list, selectId, prop) {
  for (var i = 0; i < blog.articles.length; i++) {
    var temp = blog.articles[i][prop];
    if (list.indexOf(temp) < 0) {
      list.push(temp);
    }
  }
  for (var i = 0; i < list.length; i++) {
    var $newOption = $(selectId).children(':first-child').clone();
    $newOption.attr('value', prop.substring(0, 3) + i);
    $newOption.html(list[i]);
    $(selectId).append($newOption);
  };
};

blog.showFilters = function() {
  blog.createFilters(blog.listAuthor, '#filter-by-author', 'author');
  blog.createFilters(blog.listCategory, '#filter-by-category', 'category');
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

  blog.showFilters();
});

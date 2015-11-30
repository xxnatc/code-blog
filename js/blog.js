var Article = function(raw) {
  this.title = raw.title;
  this.category = raw.category;
  this.author = raw.author;
  this.authorUrl = raw.authorUrl;
  this.published = Date.parse(raw.publishedOn);
  this.body = raw.body;
};

Article.prototype.toHTML = function() {
  return '<article>' + 
    '<h1>' + this.title + '</h1>' +
    '<h3>By <a href="' + this.authorUrl +'">' + this.author + '</a>, ' +
    'published ' + this.published + 'ago</h3>' +
    this.body +
    '<h6>Category: ' + this.category + '</h6>' +
    '</article>';
};

var blog = {};

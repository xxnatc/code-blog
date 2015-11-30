var Article = function(raw) {
  this.title = raw.title;
  this.category = raw.category;
  this.author = raw.author;
  this.authorUrl = raw.authorUrl;
  this.published = Date.parse(raw.publishedOn);
  this.body = raw.body;
};

Article.prototype.daysSincePublished = function() {
  var msDiff = today - this.published;
  var dayDiff = Math.floor(msDiff / 8.64e7);
  if (dayDiff > 1) {
    return dayDiff + ' days ago';
  } else {
    return dayDiff + ' day ago';
  }
};

Article.prototype.toHTML = function() {
  return '<article>' + 
    '<h1>' + this.title + '</h1>' +
    '<h3>By <a href="' + this.authorUrl +'">' + this.author + '</a>, ' +
    'published ' + this.daysSincePublished() + '</h3>' +
    this.body +
    '<h6>Category: ' + this.category + '</h6>' +
    '</article>';
};

var blog = {};

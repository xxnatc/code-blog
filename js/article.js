var Article = function(raw) {
  this.title = raw.title;
  this.category = raw.category;
  this.author = raw.author;
  this.authorUrl = raw.authorUrl;
  this.published = Date.parse(raw.publishedOn);
  this.body = raw.body;
};

Article.prototype.daysSincePublished = function() {
  var msDiff = Date.parse(new Date()) - this.published;
  var dayDiff = Math.floor(msDiff / 8.64e7);
  if (dayDiff === 0) {
    return ', published today';
  } else if (dayDiff === 1) {
    return ', published yesterday';
  } else {
    return ', published ' + dayDiff + ' days ago';
  }
};

Article.prototype.toHTML = function() {
  var $template = $('#template').clone().removeAttr('id class');
  $template.find('.post-title').html(this.title);
  $template.find('.post-subtitle').html('By <a href="' + this.authorUrl +'">' + this.author + '</a>' + this.daysSincePublished());
  $template.find('.post-body').html(this.body);
  $template.find('.post-category').html('Category: ' + this.category);
  
  $('#home').append($template);
};

var Article = function(raw) {
  this.title = raw.title;
  this.category = raw.category;
  this.author = raw.author;
  this.authorUrl = raw.authorUrl;
  this.publishedOn = raw.publishedOn;
  this.published = Date.parse(raw.publishedOn);
  this.body = raw.body;
  this.daysPub = function() {
    var msDiff = Date.parse(new Date()) - this.published;
    var dayDiff = Math.round(msDiff / 8.64e7);
    if (dayDiff === 0) {
      return ', published today';
    } else if (dayDiff === 1) {
      return ', published yesterday';
    } else {
      return ', published ' + dayDiff + ' days ago';
    }
  };
};

Article.prototype.toHTML = function() {
  var compiledHTML = this.template(this);
  $('#home').append(compiledHTML);
};

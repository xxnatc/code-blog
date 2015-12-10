var Article = function(raw) {
  this.title = raw.title;
  this.category = raw.category;
  this.author = raw.author;
  this.authorUrl = raw.authorUrl;
  this.publishedOn = raw.publishedOn;
  this.published = Date.parse(raw.publishedOn);
  this.markdown = raw.markdown;
  this.dbId = raw.id;
  this.msDiff = Date.parse(new Date()) - this.published;
  this.daysPub = function() {
    var dayDiff = Math.round(this.msDiff / 8.64e7);
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
  if (this.msDiff >= 0 || util.getQuery('admin')) {
    this.body = marked(this.markdown);
    var compiledHTML = this.template(this);
    $('#home').append(compiledHTML);
  }
};

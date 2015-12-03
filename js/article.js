var Article = function(raw) {
  this.title = raw.title;
  this.category = raw.category;
  this.author = raw.author;
  this.authorUrl = raw.authorUrl;
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

// Article.prototype.daysSincePublished = function() {
//   var msDiff = Date.parse(new Date()) - this.published;
//   var dayDiff = Math.round(msDiff / 8.64e7);
//   if (dayDiff === 0) {
//     return ', published today';
//   } else if (dayDiff === 1) {
//     return ', published yesterday';
//   } else {
//     return ', published ' + dayDiff + ' days ago';
//   }
// };

Article.prototype.toHTML = function() {
  // this.daysPub = this.daysSincePublished();
  var template = $('#post-template').html();
  var compiledTemplate = Handlebars.compile(template);

  var compiledHTML = compiledTemplate(this);
  console.log(this, template, compiledTemplate, compiledHTML);
  $('#home').append(compiledHTML);
};

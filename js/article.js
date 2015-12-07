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

Article.prototype.template = '';

// var getTemplate = function() {
//   $.get('../template/post-template.handlebars', function(data) {
//     console.log(data);
//     Article.prototype.template = Handlebars.compile(data);
//   });
// };

var getTemplate = function() {
  $.ajax({
    url: '../template/post-template.handlebars',
    success: function(data) {
      Article.prototype.template = Handlebars.compile(data);
    },
    async: false
  });
};


getTemplate();

Article.prototype.toHTML = function() {
  // var template = $('#post-template').html();
  // var compiledTemplate = Handlebars.compile(template);
  // var compiledHTML = compiledTemplate(this);
  // console.log(this.template);
  var compiledHTML = this.template(this);
  // console.log(compiledHTML);
  $('#home').append(compiledHTML);
};

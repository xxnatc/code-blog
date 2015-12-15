// this file contains all rendering components

var articleView = {};

// articleView.render = function(article) {
//   return articleView.template(article);
// };

articleView.showSection = function() {
  $('section:not(#home)').hide();
  $('#articles').empty();
  $('#loading-div').hide();
  $('#home').fadeIn();
};

articleView.render = function(article) {
  var compiledHTML = article.toHTML();
  $('#articles').append(compiledHTML);
};

articleView.renderAll = function() {
  Article.all.forEach(articleView.render);
};

articleView.getTemplate = function(callback) {
  callback = callback || function() {};
  if (!Article.prototype.template) {
    $.get('/template/post-template.html', function(data) {
      console.log('get template');
      Article.prototype.template = Handlebars.compile(data);
      callback();
    });
  } else {
    console.log('cache template');
    callback();
  }
};

articleView.selection = function(data) {
  this.showSection();
  this.getTemplate(function() {
    data.forEach(articleView.render);
  });
};


articleView.index = function() {
  this.showSection();
  this.getTemplate(this.renderAll);
  util.setActiveNav('home');
};

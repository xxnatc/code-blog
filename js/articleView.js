// this file contains all rendering components

var articleView = {};

// articleView.render = function(article) {
//   return articleView.template(article);
// };

articleView.showSection = function() {
  $('section:not(#home)').hide();
  $('#home').fadeIn();
  $('#loading-div').hide();
};
  // articleView.showSection();
  // $('#articles').empty();

articleView.render = function(article) {
  console.log(article);
  var compiledHTML = article.toHTML();
  $('#articles').append(compiledHTML);
};

articleView.renderAll = function() {
  articleView.showSection();
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

articleView.individual = function(id) {
  Article.fetchArticle(id, function(data) {
    if (data.length === 1) {
      articleView.getTemplate(function() {
        articleView.render(new Article(data[0]));
      });
    }
  });
  this.showSection();


};


articleView.index = function() {
  this.getTemplate(this.renderAll);
  util.setActiveNav('home');
};

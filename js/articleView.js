// this file contains all rendering components

var articleView = {};

// articleView.render = function(article) {
//   return articleView.template(article);
// };

articleView.renderAll = function() {
  $('section:not(#home)').hide();
  $('#home').fadeIn();
  $('#loading-div').hide();
  Article.all.forEach(function(el) {
    el.toHTML();
    // $('#home').append(el.toHTML);
  });
};

articleView.index = function() {
  // if (articleView.template) {
  //   articleView.renderAll();
  // } else {
  //   $.get('/templates/post-template.handlebars', function(data) {
  //     articleView.template = Handlebars.compile(data);
  //     articleView.renderAll();
  //   });
  // }

  $.get('/template/post-template.html', function(data) {
    console.log('get template');
    Article.prototype.template = Handlebars.compile(data);
    articleView.renderAll();
  });
  util.setActiveNav('home');
};

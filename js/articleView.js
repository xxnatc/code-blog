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
    articleView.teaser();
    articleView.handleAdmin();
  });
};

articleView.index = function() {
  this.showSection();
  this.getTemplate(function() {
    articleView.renderAll();
    articleView.teaser();
    articleView.handleAdmin();
  });
  util.setActiveNav('home');
};

articleView.teaser = function() {
  $('.post-body').children().not('p:first-of-type, :header:first-of-type:first-child').hide();
  $('.post-collapse').hide();

  $('#articles').on('click', '.post-read-on', function(event) {
    event.preventDefault();
    $(this).hide().siblings('button').show();
    $(this).siblings('.post-body').children().slideDown();
  });

  $('#articles').on('click', '.post-collapse', function(event) {
    event.preventDefault();
    $(this).hide().siblings('button').show();;
    $(this).siblings('.post-body').children().not('p:first-of-type, :header:first-of-type:first-child').slideUp();
  });
};

articleView.handleAdmin = function() {
  if (util.getQuery('admin')) {
    console.log('admin mode!');
    $('#articles').on('click', '.post-edit', function(event) {
      event.preventDefault();
      var dbId = $(this).data('dbid');
      console.log(dbId);
      // util.redirectTo('/editor.html?id=' + dbId);
    });

    $('#exit-admin').show().on('click', function(event) {
      event.preventDefault();
      util.redirectTo('/');
    });
  }
};

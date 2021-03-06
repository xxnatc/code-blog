var articleView = {};

articleView.showSection = function() {
  $('section:not(#home)').hide();
  $('#articles').empty();
  $('#loading-div-home, #article-to-home').hide();
  $('#home').fadeIn();
  if ($('#filter-by-author option').length === 1 && $('#filter-by-category option').length === 1) {
    articleView.filter();
  }
  util.setActiveNav('home');
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
      Article.prototype.template = Handlebars.compile(data);
      callback();
    });
  } else {
    callback();
  }
};

articleView.selection = function(data) {
  articleView.showSection();
  articleView.getTemplate(function() {
    data.forEach(articleView.render);
    articleView.teaser();
    articleView.handleAdmin();
  });
};

articleView.index = function() {
  articleView.showSection();
  articleView.getTemplate(function() {
    articleView.renderAll();
    articleView.teaser();
    articleView.handleAdmin();
  });
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
      util.redirectTo('/editor.html?id=' + dbId);
    });

    $('#exit-admin').show().on('click', function(event) {
      event.preventDefault();
      util.redirectTo('/');
    });
  } else {
    $('#exit-admin').hide();
  }
};


articleView.filter = function() {
  $('#filter-by-author').children(':not(:first-child)').remove();
  $('#filter-by-category').children(':not(:first-child)').remove();;
  Article.uniqueAuthor(function(data) {
    data.forEach(function(obj) {
      articleView.populateFilter('#filter-by-author', obj.author);
    });
  });
  Article.uniqueCategory(function(data) {
    data.forEach(function(obj) {
      articleView.populateFilter('#filter-by-category', obj.category);
    });
  });
};

articleView.populateFilter = function(selectId, prop) {
  $(selectId).append($('<option>').text(prop).attr('value', prop.split(' ').join('-')));
};

articleView.backToHome = function() {
  $('#article-to-home').show().on('click', function(event) {
    page.redirect('/');
    $(this).hide();
  });
};

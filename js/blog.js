var blog = {};
blog.articles = [];
blog.listAuthor = [];
blog.listCategory = [];

// import content from remote server or cache in local storage
blog.importArticles = function() {
  var rawDataCache = localStorage.getItem('raw-data');
  if (!rawDataCache) {  
  // no cache in local storage
    blog.importFromRemote();
  } else {
    var eTagCache = localStorage.getItem('etag');
    var eTagRemote = '';
    $.getJSON('js/hackerIpsumMin.json', function(data, textStatus, xhr) {
      eTagRemote = xhr.getResponseHeader('etag');
      console.log(eTagCache);
      console.log(eTagRemote);
    }).done(function() {
      if (eTagCache == eTagRemote) {
        // cache is up to date
        blog.loadFromCache(rawDataCache);
      } else {
        // cache is outdated
        blog.importFromRemote();
      }
    });
  }
};

// create instances of article object from raw data
blog.processRawData = function(data) {
  for (var i = 0; i < data.length; i++) {
    if (!data[i].body) {
      data[i].body = marked(data[i].markdown);
    }
    var post = new Article(data[i]);
    console.log(data[i]);
    blog.articles.push(post);
  }
};

// import raw data from server, then start building blog
blog.importFromRemote = function() {
  $.getJSON('js/hackerIpsumMin.json', function(data, textStatus, xhr) {
    blog.processRawData(data);
    // update local storage with updated data
    localStorage.setItem('raw-data', JSON.stringify(blog.articles));
    localStorage.setItem('etag', xhr.getResponseHeader('etag'));
  })
  .done(function() {
    blog.sortArticles();
    blog.showFilters();
    blog.getTemplate();
  });  
};

// import raw data from local storage
blog.loadFromCache = function(rawDataCache) {
  var data = JSON.parse(rawDataCache);
  blog.processRawData(data);

  blog.sortArticles();
  blog.showFilters();
  blog.getTemplate();
};

// grab blog post template and call function to print articles to page
blog.getTemplate = function() {
  $.get('../template/post-template.handlebars', function(data) {
    Article.prototype.template = Handlebars.compile(data);
  }).done(function() {
    // print to page
    blog.populate();
    // truncate posts to the first paragraph
    blog.previewArticles();
  });
};

// write blog posts to DOM by calling .toHTML() on each article
blog.populate = function() {
  for (var i = 0; i < blog.articles.length; i++) {
    blog.articles[i].toHTML();
  };
};

// display just the first paragraph of each post,
// showing the rest only when the 'Read on' button is pressed
blog.previewArticles = function() {
  $('.post-body').children().not('p:first-of-type, :header:first-of-type').hide();

  $('#home').on('click', '.post-read-on', function(event) {
    event.preventDefault();
    $(this).html('Collapse <span class="glyphicon glyphicon-triangle-up"></span>');
    $(this).parent().find('p').slideDown();
  });
};

// sorting all posts such that latest post appears on top
blog.sortArticles = function() {
  blog.articles.sort(function(a, b) {
    return b.published - a.published;
  });
};

// generate a list of filter options, then populate dropdown menu
blog.createFilters = function(list, selectId, prop) {
  for (var i = 0; i < blog.articles.length; i++) {
    var temp = blog.articles[i][prop];
    if (list.indexOf(temp) < 0) {
      list.push(temp);
    }
  }

  for (var i = 0; i < list.length; i++) {
    var $newOption = $(selectId).children(':first-child').clone();
    $newOption.attr('value', prop.substring(0, 3) + i);
    $newOption.html(list[i]);
    $(selectId).append($newOption);
  }
};

// create specific filters and start event listeners for each dropdown;
// the event listeners prevent user from selecting multiple criteria
blog.showFilters = function() {
  blog.createFilters(blog.listAuthor, '#filter-by-author', 'author');
  blog.createFilters(blog.listCategory, '#filter-by-category', 'category');

  // left menu: filter by author
  $('select:first-child').on('change', function(event) {
    event.preventDefault();
    // show only posts with matching criterion
    var text = $(this).find('option:selected').text();
    if ($(this).find('option:selected').attr('value') === 'reset') {
      $('article:not(:first-child)').fadeIn();
    } else {
      $('article:visible').hide();
      $('article:hidden').find('.post-subtitle:contains(' + text + ')').parent().show();
    }
    // reset the other dropdown to prevent multiple selections
    $('select:last-child').find('option[value=reset]').attr('selected', true);
  });

  // right menu: filter by category
  $('select:last-child').on('change', function(event) {
    event.preventDefault();

    var text = $(this).find('option:selected').text();
    if ($(this).find('option:selected').attr('value') === 'reset') {
      $('article:not(:first-child)').fadeIn();
    } else {
      $('article:visible').hide();
      $('article:hidden').find('.post-category:contains(' + text + ')').parent().show();
    }

    $('select:first-child').find('option[value=reset]').attr('selected', true);
  });
};

// initiate blog
$(function() {
  var today = new Date();
  // import & sort through raw data
  blog.importArticles();
  // blog.sortArticles();

  // print to page
  // blog.getTemplate();
  
  // create and show filter options
  // blog.showFilters();
});

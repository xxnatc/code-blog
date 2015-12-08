var blog = {};
blog.articles = [];
blog.listAuthor = [];
blog.listCategory = [];
blog.listAuthorIndex = [];
blog.listCategoryIndex = [];

// import content from remote server or cache in local storage
blog.importArticles = function() {
  var rawDataCache = localStorage.getItem('raw-data');
  if (!rawDataCache) {
    // no cache in local storage
    blog.importFromRemote();
    console.log('Import raw data: Cache miss, no cache found.');
  } else {
    var eTagCache = localStorage.getItem('etag');
    var eTagRemote = '';
    $.getJSON('js/hackerIpsumMin.json', function(data, textStatus, xhr) {
      eTagRemote = xhr.getResponseHeader('etag');
      console.log('eTag from cache: ' + eTagCache);
      console.log('eTag from server: ' + eTagRemote);
    }).done(function() {
      if (eTagCache == eTagRemote) {
        // cache is up to date
        blog.loadFromCache(rawDataCache);
        console.log('Import raw data: Cache hit, data loading from cache.');
      } else {
        // cache is outdated
        blog.importFromRemote();
        console.log('Import raw data: Cache outdated, loading from server');
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
    // initiate blog
    if ($(location).attr('pathname') == '/') {
      blog.getTemplate();
    }
  });
};

// import raw data from local storage
blog.loadFromCache = function(rawDataCache) {
  var data = JSON.parse(rawDataCache);
  blog.processRawData(data);
  // initiate blog
  blog.sortArticles();
  blog.showFilters();
  if ($(location).attr('pathname') == '/') {
    blog.getTemplate();
  }
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

// display up to the first paragraph of each post,
// toggle the rest when 'Read on' or 'Collpase' button is clicked
blog.previewArticles = function() {
  $('.post-body').children().not('p:first-of-type, :header:first-of-type').hide();
  $('.post-collapse').hide();

  $('#home').on('click', '.post-read-on', function(event) {
    event.preventDefault();
    $(this).hide();
    $(this).siblings('.post-body').children().slideDown();
    $(this).siblings('button').show();
  });

  $('#home').on('click', '.post-collapse', function(event) {
    event.preventDefault();
    $(this).hide();
    $(this).siblings('.post-body').children().not('p:first-of-type, :header:first-of-type').slideUp();
    $(this).siblings('button').show();
  });
};

// sorting all posts such that latest post appears on top
blog.sortArticles = function() {
  blog.articles.sort(function(a, b) {
    return b.published - a.published;
  });
};

// generate a list of filter options, then populate dropdown menu
blog.createFilters = function(list, listIndex, selectId, prop) {
  for (var i = 0; i < blog.articles.length; i++) {
    var item = blog.articles[i][prop];
    var itemIndex = list.indexOf(item);
    if (itemIndex < 0) {
      list.push(item);
      listIndex.push([i]);
    } else {
      listIndex[itemIndex].push(i);
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
  blog.createFilters(blog.listAuthor, blog.listAuthorIndex, '#filter-by-author', 'author');
  blog.createFilters(blog.listCategory, blog.listCategoryIndex, '#filter-by-category', 'category');

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
//
// $(function() {
//   blog.importArticles();
// });

var blog = {};
blog.articles = [];
blog.listAuthor = [];
blog.listCategory = [];
blog.listAuthorIndex = [];
blog.listCategoryIndex = [];
blog.importUrl = 'data/hackerIpsumMin.json';

// grab blog post template and call function to load article data
blog.loadTemplate = function() {
  $.get('template/post-template.handlebars', function(data) {
    Article.prototype.template = Handlebars.compile(data);
  }).done(function() {
    $.ajax({
      type: 'HEAD',
      url: blog.importUrl,
      success: blog.fetchArticles
    });
  });
};

// process eTag
blog.fetchArticles = function(data, textStatus, xhr) {
  var eTagCache = localStorage.getItem('etag');
  var eTagRemote = xhr.getResponseHeader('etag');
  console.log('eTag from cache: ' + eTagCache);
  console.log('eTag from server: ' + eTagRemote);

  if (eTagCache != eTagRemote) {
    console.log('Import raw data: Cache miss');
    // update etag in localStorage
    localStorage.setItem('etag', eTagRemote);
    // remove cached article data from DB
    webDB.execute('DELETE FROM articles;');
    blog.fetchFromJSON();
  } else {
    console.log('Import raw data: Cache hit!');
    blog.fetchFromDB();
  }
};

// import data from remote server
blog.fetchFromJSON = function() {
  $.getJSON(blog.importUrl, function(data, textStatus, xhr) {
    data.forEach(function(element, index, array) {
      blog.insertArticleToDB(element);
      // blog.loadIntoBlogObj(element);
    });
  }).done(function() {
    blog.fetchFromDB();
  });
};

// load data from DB
blog.fetchFromDB = function() {
  webDB.execute(
    'SELECT * FROM articles',
    function(result) {
      result.forEach(blog.loadIntoBlogObj);
      blog.init();
    }
  );
};

blog.loadIntoBlogObj = function(element) {
  blog.articles.push(new Article(element));
};

blog.insertArticleToDB = function(article) {
  webDB.execute(
    [{
      'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
      'data': [article.title, article.author, article.authorUrl, article.category, article.publishedOn, article.markdown]
    }]
  );
};

blog.init = function() {
  blog.sortArticles();
  blog.populate();
  blog.previewArticles();
  blog.showFilters();
  blog.handleAdmin();
};

blog.handleAdmin = function() {
  $('#home').on('click', '.post-edit', function(event) {
    event.preventDefault();
    var dbId = $(this).data('dbid');
    console.log(dbId);
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

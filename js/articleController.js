var articleController = {};

articleController.index = function() {
  Article.loadAll(function() {
    articleView.index();
  });
  articleController.handleFilters();
};

articleController.selectId = function(ctx) {
  var id = ctx.params.id;

  Article.findById(id, function(data) {
    articleView.selection(data);
  });
};

articleController.selectAuthor = function(ctx) {
  var author = ctx.params.author;
  console.log(author);
  Article.findByAuthor(author, function(data) {
    articleView.selection(data);
  });
};

articleController.handleFilters = function() {
  $('#filter-by-author').on('change', function(event) {
    event.preventDefault();
    if ($(this).find('option:selected').attr('value') === 'reset') {
      $('#articles').fadeIn();
    } else {
      var author = $(this).find('option:selected').text();
      Article.findByAuthor(author, function(data) {
        articleView.selection(data);
      });
    }
    // reset the other dropdown to prevent multiple selections
    $('#filter-by-category').find('option[value=reset]').attr('selected', true);
  });

  $('#filter-by-category').on('change', function(event) {
    event.preventDefault();
    if ($(this).find('option:selected').attr('value') === 'reset') {
      $('#articles').fadeIn();
    } else {
      var category = $(this).find('option:selected').text();
      Article.findByCategory(category, function(data) {
        articleView.selection(data);
      });
    }
    $('#filter-by-author').find('option[value=reset]').attr('selected', true);
  });
};

var articleController = {};
articleController.filterOn = false;

articleController.index = function() {
  Article.loadAll(articleView.index);
  articleController.handleFilters();
};

articleController.selectId = function(ctx) {
  Article.findById(ctx.params.id, articleView.selection);
  articleController.handleFilters();
};

articleController.selectAuthor = function(ctx) {
  Article.findByAuthor(ctx.params.author, articleView.selection);
  articleController.handleFilters();
};

articleController.selectCategory = function(ctx) {
  Article.findByCategory(ctx.params.category, articleView.selection);
  articleController.handleFilters();
};

articleController.handleFilters = function() {
  if (!articleController.filterOn) {
    articleController.filterOn = true;
    $('#filter-by-author').on('change', function(event) {
      event.preventDefault();
      if ($(this).find('option:selected').attr('value') === 'reset') {
        page('/');
      } else {
        var author = $(this).find('option:selected').text();
        page('/authors/' + author);
      }
      // reset the other dropdown to prevent multiple selections
      $('#filter-by-category').find('option[value=reset]').attr('selected', true);
    });

    $('#filter-by-category').on('change', function(event) {
      event.preventDefault();
      if ($(this).find('option:selected').attr('value') === 'reset') {
        page('/');
      } else {
        var category = $(this).find('option:selected').text();
        page('/categories/' + category);
      }
      $('#filter-by-author').find('option[value=reset]').attr('selected', true);
    });
  }
};

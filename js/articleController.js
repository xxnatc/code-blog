var articleController = {};

articleController.index = function() {
  Article.loadAll(function() {
    articleView.index();
  });
};

articleController.showIndividual = function(ctx, next) {
  var id = ctx.params.id;

  articleView.individual(id);
};

var articleController = {};

articleController.index = function() {
  Article.loadAll(function() {
    articleView.index();
  });
};

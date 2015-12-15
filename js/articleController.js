var articleController = {};

articleController.index = function() {
  Article.loadAll(function() {
    articleView.index();
  });
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

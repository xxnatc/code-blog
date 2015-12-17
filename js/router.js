page('/', function() {
  console.log('called /');
  articleController.index();
});

page('/about', function() {
  console.log('called /about');
  aboutController.index();
});

page('/contact', function() {
  console.log('called /contact');
  contactController.index();
});

page('/articles/:id', function(ctx, next) {
  console.log('called /articles/' + ctx.params.id);
  articleController.selectId(ctx);
});

page('/authors/:author', function(ctx, next) {
  console.log('called /authors/' + ctx.params.author);
  articleController.selectAuthor(ctx);
});

page('/edit/:id', function(ctx, next) {
  console.log('called /edit/' + ctx.params.id);
  util.redirectTo('/editor.html?id=' + ctx.params.id);
});

page.start();

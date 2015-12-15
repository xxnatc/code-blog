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
  articleController.showIndividual(ctx, next);
});

page.start();

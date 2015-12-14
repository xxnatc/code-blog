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


page.start();

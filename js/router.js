page('/', function() {
  articleController.index();
  console.log('called /');
});

// page('/about', function() {
//   $('#about').show();
//   $('#articles').hide();
//   console.log('called /about');
// });

page.start();

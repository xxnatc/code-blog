// initiate blog
$(function() {
  var today = new Date();
  // import & sort through raw data
  blog.importArticles();
  blog.sortArticles();

  // print to page
  blog.getTemplate();
  blog.populate();

  // truncate posts to the first paragraph
  blog.previewArticles();

  // create and show filter options
  blog.showFilters();
});

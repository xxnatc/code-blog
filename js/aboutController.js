var aboutController = {};

aboutController.index = function() {
  // get data and give it to the view
  repo.requestAll(aboutView.index);
};

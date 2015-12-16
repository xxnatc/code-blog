var aboutController = {};

aboutController.index = function() {
  // get data and give it to the view
  aboutView.showSection();
  util.setActiveNav('about');

  repo.requestAll(aboutView.repo);
  bio.request(aboutView.bio);
  activity.request(aboutView.activity);

};

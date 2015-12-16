var aboutController = {};

aboutController.index = function() {
  // get data and give it to the view
  aboutView.showSection();
  util.setActiveNav('about');

  repo.requestAll(aboutView.repo);
  ghBio.request(aboutView.bio);
  ghActivity.request(aboutView.activity);

};

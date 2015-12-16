var aboutController = {};

aboutController.index = function() {
  aboutView.showSection();

  ghRepo.requestAll(aboutView.repo);
  ghBio.request(aboutView.bio);
  ghActivity.request(aboutView.activity);
};

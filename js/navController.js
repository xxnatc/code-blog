var contactView = {};
contactView.render = function() {
  $('section:not(#contact)').hide();
  $('#contact').fadeIn();
  util.setActiveNav('contact');
};

var contactController = {};
contactController.index = function() {
  contactView.render();
};

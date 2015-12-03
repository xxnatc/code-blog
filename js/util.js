var util = {};

// reset tabs to inactive and hide all sections  
util.resetPage = function() {
  $('.nav-tabs li').removeAttr('class');
  $('section').hide();
};

// control single-page tabbed navigation
util.navigate = function() {
  util.resetPage();
  $('.nav-tabs').on('click', 'li', function(event) {
    event.preventDefault();
    util.resetPage();
    $(this).attr('class', 'active');
    $('#' + $(this).data('content')).fadeIn();
  });
  // set default tab: home
  $('.nav-tabs li:first').trigger('click');
};

// set up event listener to hamburger menu
util.navigateHam = function() {
  $('#ham-menu').on('click', function(event) {
    event.preventDefault();
    $('#primary-nav').slideToggle();
    console.log('click');
  });
};

$(function() {
  util.navigate();
  util.navigateHam();
});

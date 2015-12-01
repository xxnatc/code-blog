var util = {};

util.navigate = function() {
  util.resetPage();
  $('.nav-tabs').on('click', 'li', function(event) {
    event.preventDefault();
    util.resetPage();
    $(this).attr('class', 'active');
    $('#' + $(this).data('content')).show();
  });

  $('.nav-tabs li:first').trigger('click');
};

util.resetPage = function() {
  $('.nav-tabs li').removeAttr('class');
  $('section').hide();
};

$(function() {
  util.navigate();
});

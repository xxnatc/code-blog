var util = {};

// reset tabs to inactive and hide all sections
util.resetPage = function() {
  $('.nav-tabs li').removeAttr('class');
  $('section').hide();
};

util.handleNav = function() {
  util.resetPage();
  // control single-page tabbed navigation
  $('.nav-tabs').on('click', 'li', function(event) {
    event.preventDefault();
    util.resetPage();
    $(this).attr('class', 'active');
    $('#' + $(this).data('content')).fadeIn();
    localStorage.setItem('tab-position', $(this).data('content'));
  });
  // handle hamburger menu on mobile
  $('#ham-menu').on('click', function(event) {
    event.preventDefault();
    $('#primary-nav').slideToggle();
    console.log('click');
  });
  // set default tab: home
  var tabCache = localStorage.getItem('tab-position');
  if (!tabCache) {
    $('.nav-tabs li[data-content=home]').trigger('click');
  } else {
    $('.nav-tabs li[data-content=' + tabCache + ']').trigger('click');
  }
};

// return a value stored in a given key from browser query string
util.getQuery = function (key) {
  var match = RegExp('[?&]' + key + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

var helper = {};
helper.clearCache = function() {
  webDB.execute(
    'DROP TABLE articles;',
    function() {
      localStorage.removeItem('etag');
      console.log('Cache all cleared');
    }
  );
};

Handlebars.registerHelper('if_admin', function (block) {
  if (util.getQuery('admin')) {
    return block.fn(this);
  } else {
    return block.inverse(this);
  }
});

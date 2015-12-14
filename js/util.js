/* ==================== utility functions ==================== */
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
  // set nav tab
  var tabCache = localStorage.getItem('tab-position');
  if (!tabCache) {
    $('.nav-tabs li[data-content=home]').trigger('click');
  } else {
    $('.nav-tabs li[data-content=' + tabCache + ']').trigger('click');
  }
};

// return a value stored in a given key from browser query string
util.getQuery = function(key) {
  var match = RegExp('[?&]' + key + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

// redirect page to specific path
util.redirectTo = function(path) {
  $(location).attr('href', $(location).attr('origin') + path);
};

/* ==================== Handlebars helper ==================== */
Handlebars.registerHelper('if_admin', function (block) {
  if (util.getQuery('admin')) {
    return block.fn(this);
  } else {
    return block.inverse(this);
  }
});

/* ==================== testing helper ==================== */
var helper = {};
helper.clearCache = function() {
  webDB.execute(
    'DROP TABLE articles;',
    function() {
      localStorage.removeItem('etag');
      localStorage.removeItem('draft');
      localStorage.removeItem('tab-position');
      console.log('Cache all cleared');
    }
  );
};

// provide shortcut for redirecting
helper.rd = function(shortcut) {
  switch (shortcut) {
  case 'i':
    util.redirectTo('/');
    break;
  case 'a':
    util.redirectTo('?admin=true');
    break;
  case 'e':
    util.redirectTo('/editor.html?id=');
    break;
  case 'st':
    util.redirectTo('/stats.html');
    break;
  case 'se':
    util.redirectTo('/secret.html');
    break;
  default:
    console.log('Redirect shortcut invalid.');
    break;
  }
};

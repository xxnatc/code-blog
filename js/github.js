/* ==================== repositories ==================== */
var ghRepo = {};

ghRepo.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/user/repos?sort=updated'
  }).done(callback);
};

/* ==================== profile ==================== */
var ghBio = {};

ghBio.request = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/user'
  }).done(callback);
};

/* ==================== activities (events) ==================== */
var ghActivity = {};

ghActivity.request = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/users/xxnatc/events'
  }).done(callback);
};

ghActivity.extractBranch = function(ref) {
  return ref.split('/')[ref.split('/').length - 1];
};

ghActivity.relTimestamp = function(created) {
  var diff = new Date() - new Date(created);
  var minDiff = diff / 1000 / 60;
  if (minDiff < 60) {
    return Math.round(minDiff) + ' minutes ago';
  }
  var hourDiff = minDiff / 60;
  if (hourDiff < 24) {
    if (hourDiff < 1.5) {
      return 'an hour ago';
    } else {
      return Math.round(hourDiff) + ' hours ago';
    }
  }
  var dayDiff = hourDiff / 24;
  if (dayDiff < 30) {
    if (dayDiff < 1.5) {
      return 'a day ago';
    } else {
      return Math.round(dayDiff) + ' days ago';
    }
  }
  var monthDiff = dayDiff / 30;
  if (monthDiff < 1.5) {
    return 'a month ago';
  } else {
    return Math.round(monthDiff) + ' months ago';
  }
};

ghActivity.msgPreview = function(msg, limit) {
  if (msg.length > limit) {
    return msg.substring(0, limit) + '...';
  } else {
    return msg.substring(0, limit);
  }
};

var aboutView = {};

aboutView.showSection = function() {
  $('section:not(#about)').hide();
  $('#gh-bio, #gh-activity, #gh-repo').empty();
  $('#about').fadeIn();
};

aboutView.renderRepo = function(repo) {
  var $a = $('<a class="list-group-item">').attr('href', repo.html_url).attr('target', '_blank').text(repo.full_name);
  $a.append(
    $('<span class="badge">').text(repo.stargazers_count + '  ')
    .append($('<span class="glyphicon glyphicon-star">'))
  );
  $('#gh-repo').append($a);
};

// aboutView.index = function(data) {
//   aboutView.showSection();
//   data.forEach(aboutView.renderRepo);
//   util.setActiveNav('about');
// };

aboutView.repo = function(data) {
  data.filter(function(repo) {
    return !repo.fork;
  }).slice(0, 5)
    .forEach(aboutView.renderRepo);
};

aboutView.getTemplateBio = function (callback) {
  callback = callback || function() {};
  if (!bio.template) {
    $.get('/template/bio-template.html', function(data) {
      bio.template = Handlebars.compile(data);
      callback();
    });
  } else {
    callback();
  }
};

aboutView.renderBio = function(obj) {
  var compiledHTML = bio.template(obj);
  $('#gh-bio').append(compiledHTML);
};

aboutView.bio = function(obj) {
  aboutView.getTemplateBio(function() {
    aboutView.renderBio(obj);
  });
};

aboutView.extractBranch = function(ref) {
  return ref.split('/')[ref.split('/').length - 1];
};

aboutView.relTimestamp = function(created) {
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

aboutView.msgPreview = function(msg, limit) {
  if (msg.length > limit) {
    return msg.substring(0, limit) + '...';
  } else {
    return msg.substring(0, limit);
  }

};


aboutView.commitPref = '  <span class="glyphicon glyphicon-comment"></span>  ';

aboutView.renderActivity = function(activity) {
  var $li = $('<li class="list-group-item">');
  var listed = true;
  var $time = $('<small class="rel-time">')
    .html(aboutView.relTimestamp(activity.created_at));

  switch (activity.type) {
  case 'PushEvent':
    var branch = aboutView.extractBranch(activity.payload.ref);
    var msg = aboutView.msgPreview(activity.payload.commits[0].message, 80);
    var $sub = $('<small class="activity-sub">');
    if (activity.payload.size === 1) {
      $sub.html('1 commit:' + aboutView.commitPref + msg);
    } else {
      $sub.html(activity.payload.size + ' commits:' + aboutView.commitPref + msg);
    }
    $li.html('Pushed to <code>' + branch + '</code> at <code>' + activity.repo.name + '</code>').prepend($time).append($sub);
    break;
  case 'CreateEvent':
    var branch = aboutView.extractBranch(activity.payload.ref);
    $li.html('Created branch <code>' + branch + '</code> at <code>' + activity.repo.name + '</code>').prepend($time);
    break;
  case 'PullRequestEvent':
    var $sub = $('<small class="activity-sub">')
      .html('<span class="glyphicon glyphicon-saved"></span> '
        + activity.payload.pull_request.commits + ' commits with '
        + activity.payload.pull_request.additions + ' and '
        + activity.payload.pull_request.deletions + ' deletions');

    $li.html('Merged pull request <code>' + activity.repo.name + '#' + activity.payload.number + '</code>').prepend($time).append($sub);
    break;
  default:
    console.log('event not coded');
    listed = false;
    break;
  }
  if (listed) {
    $('#gh-activity').append($li);
  }
};

aboutView.activity = function(data) {
  data.slice(0, 10).forEach(aboutView.renderActivity);
};

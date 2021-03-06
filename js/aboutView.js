var aboutView = {};

aboutView.showSection = function() {
  $('section:not(#about), #about .row').hide();
  $('#gh-bio, #gh-activity, #gh-repo').empty();
  $('#about, #loading-div-about').fadeIn();
  util.setActiveNav('about');
};

aboutView.showContent = function() {
  $('#about .row').show();
  $('#loading-div-about').hide();
};

/* ==================== repositories ==================== */
aboutView.renderRepo = function(repo) {
  var $a = $('<a class="list-group-item">').attr('href', repo.html_url).attr('target', '_blank').text(repo.full_name);
  $a.append(
    $('<span class="badge">').text(repo.stargazers_count + '  ')
    .append($('<span class="glyphicon glyphicon-star">'))
  );
  $('#gh-repo').append($a);
};

aboutView.repo = function(data) {
  aboutView.showContent();
  data.filter(function(repo) {
    return !repo.fork;
  }).slice(0, 5)
    .forEach(aboutView.renderRepo);
};

/* ==================== profile ==================== */
aboutView.getTemplateBio = function (callback) {
  callback = callback || function() {};
  if (!ghBio.template) {
    $.get('/template/bio-template.html', function(data) {
      ghBio.template = Handlebars.compile(data);
      callback();
    });
  } else {
    callback();
  }
};

aboutView.renderBio = function(obj) {
  var compiledHTML = ghBio.template(obj);
  $('#gh-bio').append(compiledHTML);
};

aboutView.bio = function(obj) {
  aboutView.showContent();
  aboutView.getTemplateBio(function() {
    aboutView.renderBio(obj);
  });
};

/* ==================== activities (events) ==================== */
aboutView.renderActivity = function(obj) {
  var $li = $('<li class="list-group-item">');
  var listed = true;
  var $time = $('<small class="rel-time">').html(ghActivity.relTimestamp(obj.created_at));

  switch (obj.type) {
  case 'PushEvent':
    var branch = ghActivity.extractBranch(obj.payload.ref);
    var lastMsg = ' <span class="glyphicon glyphicon-comment"></span> ' + ghActivity.msgPreview(obj.payload.commits[obj.payload.size - 1].message, 80);
    var $sub = $('<small class="activity-sub">');
    if (obj.payload.size === 1) {
      $sub.html('1 commit:' + lastMsg);
    } else {
      $sub.html(obj.payload.size + ' commits:' + lastMsg);
    }
    $li.html('Pushed to <code>' + branch + '</code> at <code>' + obj.repo.name + '</code>').prepend($time).append($sub);
    break;

  case 'CreateEvent':
    var branch = ghActivity.extractBranch(obj.payload.ref);
    $li.html('Created branch <code>' + branch + '</code> at <code>' + obj.repo.name + '</code>').prepend($time);
    break;

  case 'PullRequestEvent':
    var $sub = $('<small class="activity-sub">')
      .html('<span class="glyphicon glyphicon-saved"></span> '
        + obj.payload.pull_request.commits + ' commits with '
        + obj.payload.pull_request.additions + ' and '
        + obj.payload.pull_request.deletions + ' deletions');
    if (obj.payload.action === 'closed' && obj.payload.pull_request.merged) {
      var action = 'Merged';
    } else {
      var action = obj.payload.action[0].toUpperCase() + obj.payload.action.slice(1);
    }
    $li.html(action + ' pull request <code>' + obj.repo.name + '#' + obj.payload.number + '</code>').prepend($time).append($sub);
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
  aboutView.showContent();
  data.slice(0, 8).forEach(aboutView.renderActivity);
};

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

aboutView.renderActivity = function(activity) {
  var $li = $('<li class="list-group-item">').text(activity.type);
  $('#gh-activity').append($li);
};

aboutView.activity = function(data) {
  data.slice(0, 10).forEach(aboutView.renderActivity);
};

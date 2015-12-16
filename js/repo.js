var repo = {};
repo.all = [];

repo.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/user/repos?sort=updated',
    headers: {
      Authorization: 'token ' + githubToken
    }
  }).done(function(data) {
    console.log(data);
    repo.all = data;
    callback(data);
  });
};

var bio = {};

bio.request = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/user',
    headers: {
      Authorization: 'token ' + githubToken
    }
  }).done(function(data) {
    console.log(data);
    callback(data);
  });
};

var activity = {};

activity.request = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/xxnatc/events',
    headers: {
      Authorization: 'token ' + githubToken
    }
  }).done(function(data) {
    console.log(data);
    callback(data);
  });
};

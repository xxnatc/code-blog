var repo = {};
repo.all = [];

repo.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/xxnatc/repos?sort=updated',
    headers: {
      Authorization: 'token ' + githubToken
    }
  }).done(function(data) {
    console.log(data);
    callback(data);
  });
};

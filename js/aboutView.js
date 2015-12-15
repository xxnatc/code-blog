var aboutView = {};

aboutView.showSection = function() {
  $('section:not(#about)').hide();
  $('#about ul').empty();
  $('#about').fadeIn();
};

aboutView.renderRepo = function(repo) {
  // var $li = $('<li class="list-group-item">');
  var $a = $('<a class="list-group-item">').attr('href', repo.html_url).attr('target', '_blank').text(repo.full_name);
  $a.append(
    $('<span class="badge">').text(repo.stargazers_count + '  ')
    .append($('<span class="glyphicon glyphicon-star">'))
  );
  // $li.append($a);
  $('#about .list-group').append($a);
};

aboutView.index = function(data) {
  aboutView.showSection();
  data.forEach(aboutView.renderRepo);
  util.setActiveNav('about');
};

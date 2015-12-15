var aboutView = {};

aboutView.showSection = function() {
  $('section:not(#about)').hide();
  $('#about ul').empty();
  $('#about').fadeIn();
};

aboutView.render = function(repo) {
  var $li = $('<li class="list-group-item">').text(repo.full_name);
  $('#about ul').append($li);

};

aboutView.index = function(data) {
  aboutView.showSection();
  data.forEach(aboutView.render);
  util.setActiveNav('about');
};

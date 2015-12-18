articleView.setIdentifier = function(id) {
  var disqus_config = function () {
    // Replace PAGE_URL with your page's canonical URL variable
    this.page.url = 'http://blog.chownatalie.com';
    // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    this.page.identifier = id;
  };

  (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//xxnatc-blog.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
};

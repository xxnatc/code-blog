var Article = function(raw) {
  // this.dbId = raw.id;
  // this.title = raw.title;
  // this.category = raw.category;
  // this.author = raw.author;
  // this.authorUrl = raw.authorUrl;
  // this.publishedOn = raw.publishedOn;
  // this.markdown = raw.markdown;
  Object.keys(raw).forEach(function(el, index, array) {
    this[el] = raw[el];
  }, this);

  this.published = Date.parse(raw.publishedOn);
  this.msDiff = Date.parse(new Date()) - this.published;
};

// calculate and determine the string for displaying relative timestamp
Article.prototype.daysPub = function() {
  var dayDiff = Math.round(this.msDiff / 8.64e7);
  // future posts
  if (dayDiff < 0) {
    if (dayDiff === -1) { return ', scheduled to publish tomorrow'; }
    else { return ', scheduled to publish ' + dayDiff * -1 + ' days later'; }
  // posts published within the month: identify by days
  } else if (dayDiff < 30) {
    if (dayDiff === 0) { return ', published today'; }
    else if (dayDiff === 1) { return ', published yesterday'; }
    else { return ', published ' + dayDiff + ' days ago'; }
  // posts published within the year: identify by months
  } else if (dayDiff < 365) {
    var monthDiff = Math.round(dayDiff / 30);
    if (monthDiff === 1) { return ', published about a month ago'; }
    else { return ', published about ' + monthDiff + ' months ago'; }
  // posts older than 1 year: identify by year
  } else {
    var yearDiff = Math.round(dayDiff / 30 / 12);
    if (yearDiff === 1) { return ', published about a year ago'; }
    else { return ', published about ' + yearDiff + ' years ago'; }
  }
};

Article.prototype.toHTML = function() {
  if (this.msDiff >= 0 || util.getQuery('admin') || $(location).attr('pathname') === '/editor.html') {
    this.body = marked(this.markdown);
    var compiledHTML = this.template(this);
    $('#home').append(compiledHTML);
  }
};

Article.prototype.insertArticleToDB = function() {
  webDB.execute(
    [{
      'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
      'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown]
    }]
  );
};

Article.deletePost = function(dbId, callback) {
  callback = callback || function() {};
  webDB.execute([{
    'sql': 'DELETE FROM articles WHERE id = ?',
    'data': [dbId]
  }],
    callback
  );
};

Article.saveChanges = function(edits, callback) {
  callback = callback || function() {};
  webDB.execute([{
    'sql': 'UPDATE articles SET title = ?, author = ?, authorUrl = ?, publishedOn = ?, markdown = ?, category = ? WHERE id = ?',
    'data': [edits.title, edits.author, edits.authorUrl, edits.publishedOn, edits.markdown, edits.category, edits.id]
  }],
    callback
  );
};

Article.fetchArticle = function(dbId, callback) {
  callback = callback || function() {};
  webDB.execute([{
    'sql': 'SELECT * FROM articles WHERE id = ?',
    'data': [dbId]
  }],
    callback
  );
};

Article.loadAll = function(callback) {
  callback = callback || function() {};
  webDB.execute('SELECT * FROM articles', callback);
};

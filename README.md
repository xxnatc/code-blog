# code-blog
_Assignment for Code Fellows 301_

#### Description
Code-blog is a single-page blog that imports its content from `js/hackerIpsum.json` and caches in Web SQL. Users can filter blog posts by authors or categories.

#### Pages
There is a editor page (`secret.html`) for author to add content. The page takes styling in markdown format and displays a preview instantly. It can also convert the data to a JSON string for use in the raw data file.

A page (`stats.html`) has been added to calculate vanity metrics. It displays numbers including total author, article, and word count.

We've introduced an administrator mode which shows an edit option for each article. The links redirect the admin to an editor page (`editor.html`), and provides options to update or delete the article.

#### Helper function
A helper object has been created in `util.js` to assist with testing during the coding process. It contains the following methods:

##### `helper.clearCache()`
Calling `helper.clearCache()` will clear all values stored in the browser, i.e. the database in Web SQL; eTag value, index page tab position, and draft of new article in Local Storage

##### `helper.rd(shortcut)`
This function redirects the page to a specified page.

`shortcut` takes one of the following string values:
- `'i'` redirects to home page (`index.html`)
- `'a'` enables admin mode
- `'e'` redirects to the editor page (`editor.html`) - make sure to specify id in address bar to access specific articles if you're using this shortcut
- `'st'` redirects to vanity metrics page (`stats.html`)
- `'se'` redirects to new article editor page (`secret.html`)

## Credits
##### Individuals
[Kenneth Suk](https://github.com/suhk) helped with the content editor and preview page. (Pair programming on 12/4/2015 - Driver: Kenneth, Navigator: Natalie)

##### Framework and Libraries used
- [Normalize.css](http://necolas.github.io/normalize.css/)
- [Bootstrap](http://getbootstrap.com/) CSS
- [Glyphicons](http://glyphicons.com/)
- [jQuery](http://jquery.com/)
- [Handlebars.js](http://handlebarsjs.com/)
- [Marked](https://github.com/chjj/marked)
- [Highlight.js](https://highlightjs.org/)

# code-blog
_Assignment for Code Fellows 301_

## Deployment
You can find this project live on [blog.chownatalie.com](http://blog.chownatalie.com) or on [Heroku](https://xxnatc-blog.herokuapp.com).

## Description
Code-blog is a single-page blog that imports its content from `data/hackerIpsum.json` and caches in Web SQL. Users can filter blog posts by authors or categories.

#### Pages
A page (`stats.html`) has been added to calculate vanity metrics. It displays numbers including total author, article, and word count. The stats page is not currently functional.

We've introduced an administrator mode which shows an edit option for each article. The links redirect the admin to an editor page (`editor.html`). The page takes styling in markdown format and displays a preview instantly. It also provides options to update or delete the article, which will then convert all data to a JSON string for use in the raw data file. More features will be added to the editor.

#### Helper functions
A helper object has been created in `util.js` to assist with testing during the coding process. It contains the following methods:

##### `helper.clearCache()`
Calling `helper.clearCache()` will clear all values stored in the browser, i.e. the database in Web SQL; eTag value and draft of new article in Local Storage

##### `helper.rd(shortcut)`
This function redirects the page to a specified page.

`shortcut` takes one of the following string values:
- `'i'` redirects to home page (`index.html`)
- `'a'` enables admin mode
- `'e'` redirects to the editor page (`editor.html`) - make sure to specify id in address bar to access specific articles if you're using this shortcut
- `'st'` redirects to vanity metrics page (`stats.html`)

#### Room for Improvement
Here's a list of implementation details I wish to improve on:
- add option to create article in admin mode (utilizing `editor.html`)
- right now, the `stats.html` pages are not fully functional as the site is undergoing MVC restructuring

## Credits
##### Individuals
[Kenneth Suk](https://github.com/suhk) helped with the content editor and preview page. (Pair programming on 12/4/2015 - Driver: Kenneth, Navigator: Natalie)

##### Framework and Libraries used
- [Normalize.css](http://necolas.github.io/normalize.css/)
- [Bootstrap](http://getbootstrap.com/) (CSS)
- [Glyphicons](http://glyphicons.com/)
- [jQuery](http://jquery.com/)
- [Handlebars.js](http://handlebarsjs.com/)
- [Marked](https://github.com/chjj/marked)
- [Highlight.js](https://highlightjs.org/)
- [html5sql.js](http://html5sql.com/)
- [page.js](https://github.com/visionmedia/page.js)
- [Disqus](https://disqus.com)

## slush announcement front-end dev wp-theme

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com)
- [Bower](https://bower.io/)

### Plugins

-[autoprefixer](https://www.npmjs.com/package/autoprefixer) - Parse CSS and add vendor prefixes to rules by Can I Use
-[browser-sync](https://www.npmjs.com/package/browser-sync) - Live CSS Reload & Browser Syncing
-[cssnano](https://www.npmjs.com/package/cssnano) - A modular minifier, built on top of the PostCSS ecosystem.
-[del](https://www.npmjs.com/package/del) - Delete files and folders
-[gulp-cache](https://www.npmjs.com/package/gulp-cache) - A cache proxy plugin for Gulp (removing cached data.json)
-[gulp-concat](https://www.npmjs.com/package/gulp-concat) - Concatenates files
-[gulp-data](https://www.npmjs.com/package/gulp-data) - Generate a data object from json for nunjucks templates
-[gulp-html-beautify](https://www.npmjs.com/package/gulp-html-beautify) - Gulp plugin to beautify HTML files
-[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - Minify PNG, JPEG, GIF and SVG images
-[gulp-nunjucks](https://www.npmjs.com/package/gulp-nunjucks) - Compile/precompile Nunjucks templates
-[gulp-postcss](https://www.npmjs.com/package/gulp-postcss) - PostCSS gulp plugin
-[gulp-rename](https://www.npmjs.com/package/gulp-rename) - Rename files
-[gulp-sass](https://www.npmjs.com/package/gulp-sass) - Gulp plugin for sass
-[gulp-size](https://www.npmjs.com/package/gulp-size) - Display the size of your project
-[gulp-stylefmt](https://www.npmjs.com/package/gulp-stylefmt) - Automatically formats stylesheets
-[run-sequence](https://www.npmjs.com/package/run-sequence) - Run a series of dependent gulp tasks in order


### Tasks

```gulp```: Runs the **default task** including the following ones:

- ```styles```: scss compiling to CSS, autoprefixing and formatting.
- ```html```: rendering HTML from templates using nunjucks and data.json
- ```scripts```: compiling scripts from each module to single and transferring to dist/js
- ```images```: Image compression
- ```copy```: transferring static files and fonts

- ```clean```: clean ```dist/```.
- ```dist```: starts a server at ```dist/``` with all your compiled files, looking for file changes and injecting them into your browser.


### Project Structure

```
.
├── /bower_components/       # Bower packages
├── /dist/                   # Compiled project
│   ├── /styles/             # CSS files
│   ├── /fonts/              # Fonts
│   ├── /images/             # Images
│   ├── /scripts/            # JS files
│   └── *.html               # Rendered and compiled HTML
├── /node_modules/           # Node modules dependencies and packages
├── /src/                    # Source files
│   ├── /images/             # Images
│   ├── /modules/            # Modules with their own templates/styles/scrips/images
│   ├── /scripts/            # JavaScript files
│   ├── /styles/             # SCSS folder with global styles
│   │   ├── common/          # Common styles
│   │   ├── helpers/         # SCSS mixins and variables
│   │   └── styles.scss      # Base SCSS file
│   ├── /templates/          # Common files for nunjucks
│   │   ├── data.json        # Data for templates
│   │   └── layout.nunjucks  # Base HTML template
│   └── *.html               # HTML pages
├── bower.json               # Bower configuration file
├── gulpfile.js              # Gulp automatization file
└── package.json             # information about project and npm-packages
```
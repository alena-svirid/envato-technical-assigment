'use strict';

global.__config = config = require('./config.json');

var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    stylefmt = require('gulp-stylefmt'),

    data = require('gulp-data'),
    nunjucksRender = require('gulp-nunjucks-render'),
    cache = require('gulp-cache'),
    htmlbeautify = require('gulp-html-beautify'),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./config.json')),

    imagemin =  require('gulp-imagemin'),
    del =  require('del'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    zip = require('gulp-zip'),

    mainBowerFiles = require('main-bower-files'),
    concat = require('gulp-concat'),

    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),

    gulpBundleFiles = require('gulp-bundle-files'),

    reload = browserSync.reload;


gulp.task('clean', function () {
    return del([
        '.tmp',
        'dist/*',
        '*.zip',
        '!dist/.git'
    ], {
        dot: true
    });
});

gulp.task('bower', function() {
    // mainBowerFiles is used as a src for the task,
    // usually you pipe stuff through a task
    return gulp.src(mainBowerFiles({includeDev: true}))
        // Then pipe it to wanted directory, I use
        // dist/lib but it could be anything really
        .pipe(gulp.dest('dist/libs'))
        .pipe(gulp.dest('package/'+ config.project + '/libs'));
});

gulp.task('copy', function () {

    gulp.src([
            'src/*',
            '!src/variative_content',
            '!src/*.html',
            '!src/templates',
            '!src/modules',
            '!src/common',
            '!src/helpers',
            '!src/*.xml'
        ], {
            dot: true
        })
        .pipe(gulp.dest('dist'))
        .pipe(size({ title: 'copy' }));

    gulp.src([
        'src/modules/fonts/**/*',
        '!src/modules/fonts/*.scss'
    ], {
        dot: true
    })
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulp.dest('package/' + config.project + '/fonts'))
    .pipe(size({
        title: 'fonts'
    }));

    gulp.src([
        'src/index.xml'
    ], {
        dot: true
    })
        .pipe(rename({
            basename:config.project
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('package/' + config.project))
        .pipe(size({ title: 'copy' }));
});

gulp.task('zip', function () {

    gulp.src([
        'package/**'
    ], {
        dot: true
    })
        .pipe(zip('' + config.project + '.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(data(function (file) {
            var json = './src/templates/fill.json';
            delete require.cache[require.resolve(json)];
            return require(json);
        }))
        .pipe(nunjucksRender({
            path: 'src/'
        }))
        .pipe(htmlbeautify({
            "indent_size":4,
            "max_preserve_newlines": 0
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('theme', function () {
    return gulp.src('src/index.html')
        .pipe(data(function (filetheme) {
            var jsontheme = './src/templates/xml.json';
            delete require.cache[require.resolve(jsontheme)];
            return require(jsontheme);
        }))
        .pipe(nunjucksRender({
            path: 'src/',
            envOptions: {
                autoescape: false
            }
        }))
        .pipe(htmlbeautify({
            "indent_size":4,
            "max_preserve_newlines": 0
        }))
         .pipe(rename({
             basename:config.project
            }))
         .pipe(gulp.dest('dist'))
         .pipe(gulp.dest('package/'+ config.project));
});

gulp.task('images', function () {
    return gulp.src('src/modules/**/images/*')
        .pipe(cache(imagemin([imagemin.jpegtran(), imagemin.optipng()], {
            progressive: true,
            interlaced: true,
            svgoPlugins: [{ removeViewBox: false }]
        })))
        .pipe(rename({dirname:''}))
        .pipe(gulp.dest('dist/images'))
        .pipe(gulp.dest('package/'+ config.project + '/images'))
        .pipe(size({ title: 'images' }));
});

gulp.task('content', function () {
    return gulp.src('src/modules/**/content/*')
        .pipe(cache(imagemin([imagemin.jpegtran(), imagemin.optipng()], {
            progressive: true,
            interlaced: true,
            svgoPlugins: [{ removeViewBox: false }]
        })))
        .pipe(rename({dirname:''}))
        .pipe(gulp.dest('dist/content'))
        .pipe(size({ title: 'content' }));
});

gulp.task('styles', function () {
    var processors = [
        autoprefixer({
            browsers:[
                'ie >= 9',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 7',
                'android >= 4.4',
                'bb >= 10'
            ]
        })//,
        //cssnano
    ];
    return gulp.src('src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(stylefmt({indent_size:4}))
        .pipe(size({ title: 'styles' }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(gulp.dest('package/'+ config.project + '/styles'));
});

gulp.task('bundle', function() {
    gulpBundleFiles(config.configBundle);
});

gulp.task('scripts', function () {

    gulp.src([
        'dist/scripts/**/*'
    ], {
        dot: true
    })
        .pipe(gulp.dest('package/' + config.project + '/scripts'))
        .pipe(size({
            title: 'scripts'
        }));

});

gulp.task('dist', ['default'], function () {
    browserSync({
        notify: false,
        logPrefix: 'WGF',
        server: {
            baseDir: 'dist'
        },
        port: 3005
    });

    gulp.watch(['src/modules/**/*.{html,njk}', 'src/templates/*'], ['html', reload]);
    gulp.watch(['src/*.xml'], ['copy', reload]);
    gulp.watch(['src/styles/*.{scss,css}', 'src/modules/**/styles/*.{scss,css}'], ['styles', reload]);
    gulp.watch(['src/modules/**/scripts/*.js', 'src/scripts/*.js'], ['bundle', reload]);
    gulp.watch(['src/modules/**/images/*'], ['images', reload]);
    gulp.watch(['src/modules/**/content/*'], ['content', reload]);
    gulp.watch(['bower_components/**'], ['bower', reload]);
});

gulp.task('default', ['clean'], function (cb) {
    return runSequence('styles', ['html', 'bower', 'bundle', 'images', 'content', 'copy', 'theme'], 'scripts', cb);
});
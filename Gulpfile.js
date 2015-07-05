var gulp                = require('gulp')
,   browserSync         = require('browser-sync')
,   jshint              = require('gulp-jshint')
,   inject              = require('gulp-inject')
,   wiredep             = require('wiredep').stream
,   templateCache       = require('gulp-angular-templatecache')
,   gulpif              = require('gulp-if')
,   minifyCss           = require('gulp-minify-css')
,   useref              = require('gulp-useref')
,   uglify              = require('gulp-uglify')
,   uncss               = require('gulp-uncss');

gulp.task('webserver', function(){
    browserSync({
      server: {
        baseDir: __dirname + '/app/',
        directory: true
      },
      ghostMode: false,
      notify: false,
      debounce: 200,
      port: 8901,
      startPath: 'index.html'
    });

    gulp.watch([
      __dirname + '/app/**/*.{js,html,css,svg,png,gif,jpg,jpeg}'
    ], {
      debounceDelay: 400
    }, function() {
      browserSync.reload();
    });
});

gulp.task('dist-server', function(){
    browserSync({
      server: {
        baseDir: __dirname + '/app/',
        directory: true
      },
      ghostMode: false,
      notify: false,
      debounce: 200,
      port: 8901,
      startPath: 'index.html'
    });

    gulp.watch([
      __dirname + '/app/**/*.{js,html,css,svg,png,gif,jpg,jpeg}'
    ], {
      debounceDelay: 400
    }, function() {
      browserSync.reload();
    });
});

gulp.task('inject', function() {
    var sources = gulp.src(['./app/js/**/*.js','./app/style/**/*.css']);
    return gulp.src('index.html', {cwd: './app'})
    .pipe(inject(sources, {
        read: false,
        ignorePath: '/app'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('wiredep', function () {
    gulp.src('./app/index.html')
    .pipe(wiredep({
        directory: './app/lib'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('reload', function(){
    gulp.src('./app/**/*.{html,js,css}');
});

gulp.task('templates', function(){
    gulp.src('./app/views/**/*.html')
    .pipe(templateCache({
        root: 'views/',
        module: 'psAdvance.templates',
        standalone: true
    }))
    .pipe(gulp.dest('./app/js/templates'));
});

gulp.task('compress', function(){
    gulp.src('./app/index.html')
    .pipe(useref.assets())
    .pipe(gulpif('*.js', uglify({mangle: false})))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function(){
    gulp.src('./app/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
    gulp.src('./app/img/**')
    .pipe(gulp.dest('./dist/img'));
    gulp.src('./app/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./app/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./app/style/**')
    .pipe(gulp.dest('./dist/style'));

    gulp.src('./app/lib/angular-motion/**')
    .pipe(gulp.dest('./dist/lib/angular-motion'));
    gulp.src('./app/lib/angular-loading-bar/**')
    .pipe(gulp.dest('./dist/lib/angular-loading-bar'));
    gulp.src('./app/lib/components-font-awesome/**')
    .pipe(gulp.dest('./dist/lib/components-font-awesome'));
    gulp.src('./app/lib/angular-datepicker/**')
    .pipe(gulp.dest('./dist/lib/angular-datepicker'));
});

gulp.task('watch', function(){
    gulp.watch(['./app/**/*.{html,js,css}'], ['reload']);
    gulp.watch(['./bower.json'], ['wiredep']);
    gulp.watch(['./app/js/**/*.js'], ['inject']);
    gulp.watch(['./app/views/**/*.html'], ['templates']);
});

gulp.task('prepare', ['wiredep', 'inject', 'templates']);
gulp.task('build', ['prepare', 'compress', 'copy']);
gulp.task('default', ['prepare', 'webserver', 'watch', 'inject']);

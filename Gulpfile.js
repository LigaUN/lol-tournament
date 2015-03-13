var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    historyApiFallback = require('connect-history-api-fallback'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream,
    templateCache = require('gulp-angular-templatecache'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss');

gulp.task('webserver', function(){
    connect.server({
        root:'./app',
        hostname: '0.0.0.0',
        port: 9000,
        liveReload: true,
        middleware: function(connect, opt) {
            return [ historyApiFallback ];
        }
    });
});

gulp.task('dist-server', function(){
    connect.server({
        root: './dist',
        hostname: '0.0.0.0',
        port: 9002,
        liveReload: true,
        middleware: function(connect, opt) {
            return [historyApiFallback];
        }
    });
});

gulp.task('inject', function() {
    var sources = gulp.src(['./app/js/**/*.js','./app/styles/**/*.css']);
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
    gulp.src('./app/**/*.{html,js,css}')
    .pipe(connect.reload());
});

gulp.task('jshint', function(){
    return gulp.src('./app/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('templates', function(){
    gulp.src('./app/views/**/*.tpl.html')
    .pipe(templateCache({
        root: 'views/',
        module: 'evaluon.templates',
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
    gulp.src('./app/styles/material-icons/**')
    .pipe(gulp.dest('./dist/styles/material-icons'));
    gulp.src('./app/styles/material-icons.css')
    .pipe(gulp.dest('./dist/styles'));

});

gulp.task('uncss', function(){
    gulp.src('./dist/styles/style.min.css')
    .pipe(uncss({
        html: ['./app/index.html', './app/views/404.tpl.html',
        './app/views/about.tpl.html', './app/views/forgot.tpl.html',
        './app/views/home.tpl.html']
    }))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('watch', function(){
    gulp.watch(['./app/**/*.{html,js,css}'], ['reload']);
    gulp.watch(['./bower.json'], ['wiredep']);
    gulp.watch(['./app/js/**/*.js'], ['inject']);
    gulp.watch(['./app/views/**/*.tpl.html'], ['templates']);
});

gulp.task('prepare', ['templates', 'wiredep', 'inject']);
gulp.task('build', ['prepare', 'compress', 'copy']);
gulp.task('default', ['prepare', 'webserver', 'watch']);

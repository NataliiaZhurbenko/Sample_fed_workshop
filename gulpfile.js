var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    imageResize = require('gulp-image-resize'),
    imageMin = require('gulp-imagemin'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    csswring = require('csswring');

var pathMap = {
    scss:'./stylesheet/sass',
    css:'./stylesheet/css'
};

gulp.task('scssToCss',function(){
    gulp.src(pathMap.scss+"/**/*.scss")
        //.pipe(concat('main.css'))
        .pipe(sass.sync().on('error',sass.logError))
        .pipe(gulp.dest(pathMap.css))
});

gulp.task('default',function(){
    gulp.start('scssToCss');
    gulp.watch(pathMap.scss+"/**/*.scss",['scssToCss']);
});

gulp.task('minify',function(){
    gulp.src('images/*.png')
        //.pipe(imageResize({
        //    width : 2000
        //}))
        .pipe(imageMin({
            progressive:true
        }))
        .pipe(gulp.dest('minifiedImages/'));
});

gulp.task('resize',function(){
   gulp.src('images/*.png')
       .pipe(imageResize({
           width:100,
           height:100
       }))
       .pipe(gulp.dest('resizedImages/'))
});

gulp.task('convToPng', function () {
    return gulp.src('test.jpg')
        .pipe(imageResize({ format : 'jpg' }))
        .pipe(gulp.dest('testFolder'));
});

//PostCSS

gulp.task('PostCSS', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src('./stylesheet/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
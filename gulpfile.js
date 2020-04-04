"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemap = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var webp = require("gulp-webp");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var plumber = require("gulp-plumber");
var server = require("browser-sync").create();

gulp.task("style", function() {
  return gulp.src("source/sass/main.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
});

gulp.task("script", function() {
  return gulp.src("source/js/*.js")
    .pipe(concat("main.js"))
    // .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js"))
});

gulp.task("images", function() {
  return gulp.src(["source/design/**/*.{png,jpg,svg}", "!source/design/preview/**"])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"))
});

gulp.task("webp", function () {
  return gulp.src(["source/design/**/*.{png,jpg}", "!source/design/preview/**"])
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("source/img/webp"))
});

gulp.task("sprite", function () {
  return gulp.src("source/img/svg/sp-*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/svg"))
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/*",
    "source/img/**/*",
    "source/js/lib/*"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
});

gulp.task("clean", function() {
  return del("build")
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/sass/**/*.{sass,scss}", gulp.series("style", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("script", "refresh"));
  gulp.watch("source/img/svg/sp-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/img/**/*", gulp.series("copy", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("pixel-glass", function() {
  return gulp.src("source/design/preview/*", {base: "source/design"})
    .pipe(gulp.dest("build"))
});

gulp.task("build", gulp.series("clean", "copy", "sprite", "html", "style", "script"));
gulp.task("start", gulp.series("build", "pixel-glass", "server"));

"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemap = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var plumber = require("gulp-plumber");
var server = require("browser-sync");

gulp.task("style", function() {
  return gulp.src("source/sass/style.scss")
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

gulp.task("html", function() {
  return gulp.src("source/*.html", {base: "source"})
  .pipe(gulp.dest("build"))
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/*"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
});

gulp.task("clean", function() {
  return del("build")
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
})

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{sass,scss}", gulp.series("style", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("build", gulp.series("clean", "copy", "style", "html"));
gulp.task("start", gulp.series("build", "server"));

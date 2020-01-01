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

gulp.task("html", function() {
  return gulp.src("source/*.html", {base: "source"})
    .pipe(gulp.dest("build"))
});

gulp.task("script", function() {
  return gulp.src("source/js/*.js")
    .pipe(concat("min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
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

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/*.html").on("change", gulp.series("html", server.reload));
  gulp.watch("source/sass/**/*.{sass,scss}").on("change", gulp.series("style", server.reload));
  gulp.watch("source/js/**/*.js").on("change", gulp.series("script", server.reload));
});

gulp.task("pixel-glass", function() {
  return gulp.src("source/design/preview/*", {base: "source/design"})
    .pipe(gulp.dest("build"))
});

gulp.task("build", gulp.series("clean", "copy", "html", "style", "script"));
gulp.task("start", gulp.series("build", "pixel-glass", "server"));

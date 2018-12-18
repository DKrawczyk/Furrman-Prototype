var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task("watch", function() {
  gulp.watch("scss/**/*.scss", ["sass"]);
});

gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("scss/*.scss", ["sass"]);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("js/*.js").on("change", browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass({
      outputStyle: 'nested',
      sourceComments: 'map'
   })
   .on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
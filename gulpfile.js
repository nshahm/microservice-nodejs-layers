var gulp = require("gulp");
var gulpTypings = require("gulp-typings");
var ts = require('gulp-typescript');

gulp.task("default", ["compile"]);

gulp.task("compile", function () {
  return gulp
    .src("test/dal/*.ts")
    .pipe(ts({
        module: "commonjs",
        target: "ES5",
        sourcemap: false,
        logErrors: true
    }))
    .pipe(gulp.dest("test/dal/"))    
});

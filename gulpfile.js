var gulp = require("gulp");
var gulpTypings = require("gulp-typings");
var ts = require('gulp-typescript');
//var webpack = require('webpack-stream');
var shell = require("gulp-shell");

gulp.task("install", ['shell-install']);
gulp.task("test", ['test-compile', 'shell-test-run']);
gulp.task("dev", ['setconfig', 'setconfig-folder', 'shell-dev', 'shell-run']);
gulp.task("qa", ['setconfig-qa', 'setconfig-folder', 'shell-run']);
gulp.task("stage", ['setconfig-stage', 'setconfig-folder', 'shell-run']);
gulp.task("prod", ['shell-prod', 'shell-run']);

gulp.task("default", ["install", "dev"]);

gulp.task("test-compile", function () {
  return gulp
    .src("test/**/*.ts")
    .pipe(ts({
        module: "commonjs",
        target: "ES5",
        sourcemap: false,
        logErrors: true
    }))
    .pipe(gulp.dest("dist/test/"));

});


gulp.task('shell-install', shell.task(['npm run build']));
gulp.task('shell-dev', shell.task(['npm run dev']));
gulp.task('shell-run', shell.task(['npm start']));
gulp.task('shell-test-run', shell.task(['npm run test']));  
gulp.task('shell-prod', shell.task(['npm run prod']));
/**
 * Config
 */
gulp.task('setconfig-folder', shell.task(['set NODE_CONFIG_DIR=./config/environment']));
gulp.task('setconfig', shell.task(['set NODE_ENV=dev']));
gulp.task('setconfig-qa', shell.task(['set NODE_ENV=qa']));
gulp.task('setconfig-stage', shell.task(['set NODE_ENV=stage']));
gulp.task('setconfig-prod', shell.task(['set NODE_ENV=prod']));

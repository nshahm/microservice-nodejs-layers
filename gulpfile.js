var gulp        = require("gulp");
var gulpTypings = require("gulp-typings");
var shell        = require("gulp-shell");
var ts          = require("gulp-typescript");
var webpack     = require("webpack-stream");
var install     = require("gulp-install");
var clean       = require("gulp-clean");
var runSequence = require("run-sequence");
var env         = require("gulp-env");
var mocha       = require("gulp-mocha");
var path        = require("path");
 
gulp.task('clean', function () {  
  return gulp.src('dist', {read: false})
    .pipe(clean());
});
 
 
gulp.task("install", function() {
    runSequence("npm-install", "typings");
});
 
gulp.task("npm-install", function() {
  return gulp.src([ './package.json'])
    .pipe(install());
  
});

gulp.task("typings", function() {
    return gulp.src("./typings.json")
        .pipe(gulpTypings());
})

gulp.task('build',function() {
    runSequence('clean', 'compile-src', 'test');
});

gulp.task("test", function() {
    runSequence('compile-test', 'run-tests');
});
 
gulp.task("compile-src", function()  {
      
      return gulp.src('./app.ts')
        .pipe(webpack(require('./webpack.server.config.js')))
        .pipe(gulp.dest('dist/'));
});
 
 gulp.task('run', function() {
      env.set({
            NODE_CONFIG_DIR : path.resolve(__dirname, './config/environment')
      });
      gulp.run(shell.task(['npm start']));
 });
 
gulp.task("compile-test", function () {
  return gulp
    .src("test/**/*.ts")
    .pipe(ts({  
        module: "commonjs",
        target: "ES5",
        sourcemap: false,
        logErrors: true,
        removeComments: false,
        preserveConstEnums: true,
        sourceMap: true,
        experimentalDecorators: true,
        declaration: true
    }))
    .pipe(gulp.dest("dist/test/"));

});

 gulp.task('run-tests', shell.task(['npm run test']));  


var gulp        = require("gulp");
var gulpTypings = require("gulp-typings");
var shell       = require("gulp-shell");
var ts          = require("gulp-typescript");
var webpack     = require("webpack-stream");
var install     = require("gulp-install");
var clean       = require("gulp-clean");
var runSequence = require("run-sequence");
var env         = require("gulp-env");
var mocha       = require("gulp-mocha");
var path        = require("path");
var tslint      = require("gulp-tslint");
var merge       = require("merge2");
var concat      = require("gulp-concat");
var nodemon     = require("gulp-nodemon");
var istanbul    = require("gulp-istanbul");
var sourcemaps  = require("gulp-sourcemaps");
var uglify      = require('gulp-uglify');

var tsProject = ts.createProject('tsconfig.json');

/**
 * Clean 
 */ 
gulp.task('clean', function () {  
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

/**
 * tslint
 */
gulp.task("tslint", function() {
    gulp.src("./src/**/*.ts")
        .pipe(tslint({
                // contains rules in the tslint.json format 
                configuration: "./tslint.json"
        }))
        .pipe(tslint.report("prose", {
             emitError: true,
             reportLimit: 0,
             summarizeFailureOutput: true
        }));
});

/**
 * install - installing node_modules and typings 
 */ 
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

/**
 * Build  
 */
gulp.task('build',function() {
    runSequence('clean', 'compile-src', 'tslint', 'create-one-js', 'create-one-typedefinition','test');
});

/**
 * Coverage using istanbul
 */
gulp.task('coverage', function (cb) {
  gulp.src(['./src/**/*.ts', 'typings/index.d.ts', './test/**/*.ts'])
    .pipe(ts(tsProject))
    .js
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.src('dist/js/src/**/*.js'))
    .pipe(istanbul())
    .pipe(istanbul.hookRequire()) 
    .on('finish', function () {
      gulp.src(['./dist/js/test/**/*.js'])
         .pipe(mocha({ui: 'bdd'}))
         .pipe(istanbul.writeReports())
	.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
	.on('end', cb);
    });
});

/**
 * Running the testcase
 */
gulp.task("test", function() {
    runSequence('compile-test', 'run-tests');
});

gulp.task("compile-test", function () {
    
  gulp.src(['test/**/*.ts', 'typings/index.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .js
        .pipe(
            sourcemaps.write('.', {
            sourceRoot: function(file) {
                    return file.cwd + '/test';
                }
            }
            )) 
        .pipe(gulp.dest('dist/js/test'));
});
gulp.task('run-tests', ['setenv'],  shell.task(['npm run test']));
 
gulp.task('setenv', () => {
   env.set({
            NODE_CONFIG_DIR : path.resolve(__dirname, './src/config/environment')
      }); 
});

/**
 * Running - invoking npm start;
 * Prerequisite - gulp build
 */ 
gulp.task('run', function() {
      env.set({
            NODE_CONFIG_DIR : path.resolve(__dirname, './src/config/environment')
      });
      gulp.run(shell.task(['npm start']));
 });

gulp.task('compile-src', function() {
    var tsResult = gulp.src(['src/**/*.ts', 'typings/index.d.ts']) // By default the gulp-typescript plugin not resolving directory that mentioned in 
                   .pipe(sourcemaps.init())
                   .pipe(ts(tsProject));
              
   return (process.env.NODE_ENV === 'dev') ? 
    merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
         
        tsResult.dts.pipe(gulp.dest('dist/js/definitions')),
        tsResult.js.pipe(
            sourcemaps.write('.', {
            sourceRoot: function(file) {
                    return file.cwd + '/src';
                }
            }
            )) 
            .pipe(gulp.dest('dist/js/src'))
    ]) : 
    merge([ 
         
        tsResult.dts.pipe(gulp.dest('dist/js/definitions')),
        tsResult.js.pipe(uglify())
                   .pipe(gulp.dest('dist/js/'))
    ]);
    // return tsResult
});

// gulp.task('copy-environment', function() {
//         return  gulp.src('./src/config/environment/*.json')
//             .pipe(gulp.dest('./dist/js/src/config/environment'));
// })

gulp.task('create-one-js', function() {
     return gulp.src(['dist/js/src/**/*.js', 'dist/js/src/*.js'])
                .pipe(concat('app.js'))
                .pipe(gulp.dest('./dist/'));
});

gulp.task('create-one-typedefinition', function() {
     return gulp.src(['dist/js/definitions/**/*.d.ts', 'dist/js/definitions/*.d.ts'])
            .pipe(concat('app.d.ts'))
            .pipe(gulp.dest('./dist/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: './dist/js/src/app.js'
          , ext: 'js'
          //, ignore: ['ignored.js']
          //, tasks: ['tslint']
          , env: { 'NODE_ENV': 'dev',
                    'NODE_CONFIG_DIR' : path.resolve(__dirname, './src/config/environment') 
                 } 
         })
    .on('restart', function () {
      console.log('RE-STARTED!')
    })
});

gulp.task('nodemon-test', function () {
  nodemon({ 
          watch: './dist/js/test'
          , ext: 'js',
          exec : 'mocha --colors --reporter spec',
          //, ignore: ['ignored.js']
          //, tasks: ['tslint']
          env: { 'NODE_ENV': 'dev',
                    'NODE_CONFIG_DIR' : path.resolve(__dirname, './src/config/environment') 
                 } 
         })
    .on('restart', function () {
      console.log('SPEC RE-STARTED!')
    })
});

gulp.task('re-compile', function() {
    gulp.watch('src/**/*.ts', ['compile-src', 'tslint']);
});  

gulp.task('re-compile-test', function() {
    gulp.watch('test/**/*.ts', ['compile-test', 'tslint']);
});  



gulp.task('watch', function() {
    runSequence('re-compile', 'nodemon');
});

gulp.task('watchspec', function() {
    runSequence('re-compile-test');
});




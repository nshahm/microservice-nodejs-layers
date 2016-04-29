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
  gulp.src(['./src/*.ts'])
    .pipe(ts(tsProject))
    .pipe(gulp.dest('dist/js/src'))
    .pipe(istanbul())
    .pipe(istanbul.hookRequire()) 
    .on('finish', function () {
      gulp.src(['./dist/js/test/*.js'])
        .pipe(mocha())
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
    
 return gulp.src('test/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('dist/js/test'));
});
gulp.task('run-tests', shell.task(['npm run test']));
 
//gulp.task("compile-src",  shell.task(['npm run dev']));
//  {
  //    shell.task(['npm run dev']);
    //   return gulp.src('./app.ts')
    //     .pipe(webpack(require('./webpack.server.config.js')))
    //     .pipe(gulp.dest('dist/'));
//});

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
    var tsResult = gulp.src('src/**/*.ts')
                    .pipe(ts(tsProject));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest('dist/js/definitions')),
        tsResult.js.pipe(gulp.dest('dist/js/src'))
    ]);
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

gulp.task('remove-ref', function() {
    var a = '/// <reference path="../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />';
    
    var b = new RegExp('/\/\/\/[^]*/>$');
    console.log(b.test(a));
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
})

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

gulp.task('re-compile', function() {
    gulp.watch('src/**/*.ts', ['compile-src', 'tslint']);
});  

gulp.task('watch', function() {
    runSequence('re-compile', 'nodemon');
});



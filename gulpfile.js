var gulp        = require("gulp"),
    gulpTypings = require("gulp-typings"),
    shell       = require("gulp-shell"),
    ts          = require("gulp-typescript"),
    webpack     = require("webpack-stream"),
    install     = require("gulp-install"),
    clean       = require("gulp-clean"),
    runSequence = require("run-sequence"),
    env         = require("gulp-env"),
    mocha       = require("gulp-mocha"),
    path        = require("path"),
    tslint      = require("gulp-tslint"),
    merge       = require("merge2"),
    concat      = require("gulp-concat"),
    nodemon     = require("gulp-nodemon"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
    jsdoc       = require("gulp-jsdoc3"),
    apidoc      = require("gulp-apidoc"),
    rename      = require("gulp-rename"),
    gutil       = require("gulp-util"),
    gulpif      = require("gulp-if"),
    webpack     = require('webpack-stream');

var tsProject = ts.createProject('tsconfig.json');

/**
 * Clean 
 */ 
gulp.task('clean', function () {  
  return gulp.src(['dist', 'docs'], {read: false})
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
    runSequence('clean', 'compile-src', 'tslint', 'bundle-one-js',  'create-one-typedefinition', 'doc', 'apidoc');
});

/**
 * Running the testcase
 */
gulp.task("test", function() {
    return runSequence('compile-test', 'run-tests');
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
        .pipe(gulp.dest('dist/test'));
});
gulp.task('run-tests', shell.task(['npm run test']));


/**
 * Running - invoking npm start;
 * Prerequisite - gulp build
 */ 
gulp.task('run', function() {
      gulp.run(shell.task(['npm start']));
 });

gulp.task('compile-src', function() {
    var copy =  gulp.src("config/*.json")
                    .pipe(gulp.dest('dist/config'));
                    
    var copyPkgJson =  gulp.src("./package.json")
                    .pipe(gulp.dest('dist/'));                  
    
    var tsResult = gulp.src(['src/**/*.ts', 'typings/index.d.ts', "config/*.ts"]) // By default the gulp-typescript plugin not resolving directory that mentioned in 
                   .pipe(sourcemaps.init())
                   .pipe(ts(tsProject));
              
   return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
         
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js.pipe(
            gulpif(process.env.NODE_ENV === 'dev', 
                sourcemaps.write('.', {
                sourceRoot: function(file) {
                        return file.cwd + '/src';
                    }
                }
                )))
            .pipe(gulp.dest('dist/src'))

    ]);
});

gulp.task('bundle-one-js', function() {
     return gulp.src('dist/src/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('create-one-typedefinition', function() {
     return gulp.src(['dist/definitions/**/*.d.ts', 'dist/definitions/*.d.ts'])
            .pipe(concat('app.d.ts'))
            .pipe(gulp.dest('./dist/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: './dist/src/app.js'
          , ext: 'js'
          //, ignore: ['ignored.js']
          //, tasks: ['tslint']
          , env: { 
                'NODE_ENV': 'dev'
                 } 
         })
    .on('restart', function () {
      console.log('RE-STARTED!')
    })
});

gulp.task('nodemon-test', function () {
  nodemon({ 
          watch: './dist/test'
          , ext: 'js',
          exec : 'mocha --colors --reporter spec',
          //, ignore: ['ignored.js']
          //, tasks: ['tslint']
            env: {
                    'NODE_ENV': 'dev'                  
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

/**
 * JSDoc for all the service and dao layer using jsdoc3
 */
gulp.task('doc', function (cb) {
    var config = require('./jsdoc.json');
    gulp.src(['README.md'], {read: false})
         .pipe(jsdoc(config, cb));
});

/**
 * API documentation using apidocjs
 */
gulp.task('apidoc',function(done){
    apidoc({
        src: "dist/src/api/",
        dest: "dist/docs/api/",
        debug: true,
        includeFilters: [ ".*\\.js$" ]
    },done);
});

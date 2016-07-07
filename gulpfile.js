const gulp = require('gulp');
const typescript = require('gulp-typescript');

const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');

const tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src(['app/**/*.ts', "typings/browser.d.ts"])
    .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/app'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['app/**/*',
                   'assets/**/*',
                   'index.html',
                   'styles.css',
                   '!app/**/*.ts'], { base : './' })
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['compile', 'copy:assets']);
gulp.task('default', ['build']);

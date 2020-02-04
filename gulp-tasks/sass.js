import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer  from 'gulp-autoprefixer';
var tildeImporter = require('node-sass-tilde-importer');

import {path} from './config';
import {error} from './logs';

gulp.task('styles', () => {
  return gulp.src(`${path.dev.sass}*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({importer: tildeImporter}))
    .on('error', ({messageFormatted}) => { error(messageFormatted) })
    .pipe(autoprefixer({ browsers: ['last 3 version', 'safari 7', 'ie 9','ie 10', 'ios 7', 'android 4'] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
})



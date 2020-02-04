import gulp from 'gulp';
import del from 'del';
import bump from 'gulp-bump';

import tasks from './gulp-tasks';
import {path} from './gulp-tasks/config';
import {info} from './gulp-tasks/logs';


let commomTasks = ['styles', 'media', 'fonts', 'img', 'twig', 'data', 'audio'];

gulp.task('clean', () => del([ path.build.root ], {dot: true}));

gulp.task('prod-node-env', () => {
    return new Promise(function(resolve, reject) {
        info('Setting NODE_ENV to production...')
        process.env.NODE_ENV = 'production';
        resolve();
    });
});

gulp.task('bump-theme-version', () => {
  return gulp.src(['./style.css'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});


gulp.task('default', gulp.series(...commomTasks, 'watch'));
gulp.task('build:static', gulp.series('clean','prod-node-env','js', ...commomTasks, 'compress'));
gulp.task('sync', gulp.series('clean','build:static','compress','copy-modules','clean'));


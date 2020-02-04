import gulp from 'gulp';
import browserSync from 'browser-sync';

import {path} from './config';

gulp.task('dev-server', () => {
    browserSync.init({
        logLevel: 'info',
        server: { baseDir: path.build.root}
    });
});


import gulp from 'gulp';

import styles from './sass';
import twig from './twig';
import js from './javascripts';
import server from './dev-server';
import {path} from './config';

const watchProcess = () => {
    gulp.watch(`${path.dev.sass}**/*.scss`, { usePolling: true }, gulp.series('styles'));
    gulp.watch(`${path.dev.html}**/*.twig`, { usePolling: true }, gulp.series('twig'));
    gulp.watch([`${path.dev.media}**/*`,`${path.dev.img}**/*`,`${path.dev.audio}**/*`], { usePolling: true }, gulp.series('media','fonts','img','audio'));
}

gulp.task('watch', gulp.parallel(watchProcess,'dev-server','js'));

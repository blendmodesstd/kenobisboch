import gulp from 'gulp';

import {path} from './config';

const copyAssets = () => gulp.src([`${path.build.root}assets/**/*`])
    .pipe(gulp.dest(path.wp.assets))

const copyTwig = () => gulp.src([`${path.dev.html}modules/**/*`])
    .pipe(gulp.dest(path.wp.modules))


gulp.task('copy-modules', gulp.series(copyAssets,copyTwig))

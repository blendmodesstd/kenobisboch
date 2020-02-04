import gulp from 'gulp';
import twig from 'gulp-twig';
import browserSync from 'browser-sync';
import fs from 'fs';

import {path} from './config';
import {error,warning} from './logs';

const printSvg = filename => {
    try {
        let content = fs.readFileSync(`${path.dev.svg}${filename}`)
        return content.toString()
    } catch(err) {
        error(err)
    }
}

const assetPath = path => `assets/${path}`

gulp.task('twig', next => {
    return gulp.src(`${path.dev.html}pages/**/*.twig`)
        .pipe(twig({
            base: path.dev.html,
            data : {},
            functions : [
                {
                    name: 'svg',
                    func: printSvg
                },
                {
                    name: 'asset',
                    func:  assetPath
                }
            ]
        }))
        .on('error', ({message}) => {
            error(`ERROR: ${message}`)
            next()
        })
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
});


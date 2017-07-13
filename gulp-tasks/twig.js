'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    twig = require('gulp-twig');

var config = require('./config.js'),
    printError = require('./printError.js');

gulp.task('twig', function (cb) {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src(config.dev.html+'pages/**/*.twig')
        .pipe(twig({
            base : config.dev.html,
            functions : [
                {
                    name: 'source',
                    func: function (file) { 
                        return fs.readFileSync(config.dev.html + 'svg/' + file).toString();
                    }
                },
                {
                    name: 'slugify',
                    func: function (text) {
                        return text.toString().toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^\w\-]+/g, '')
                            .replace(/\-\-+/g, '-')
                            .replace(/^-+/, '')
                            .replace(/-+$/, '');
                    }
                }
            ]
        }))
        .on('error', (err) => {
            printError('TWIG: ', err.message);
            cb();
        })
        .pipe(gulp.dest(config.prod.html));
});
 
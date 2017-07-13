"use strict";

var makePath = (root, obj) => {
    for (let value in obj) {
        obj[value] = root + obj[value];
    }
    return obj;
};

var basedir = './';
var config = {
    dev: makePath(basedir + 'src/', {
        root: '',
        html: 'html/',
        sass: 'assets/sass/',
        js: 'assets/js/',
        svg: 'assets/svg/',
        media: 'media/',
        img: 'assets/img/',
        fonts: 'assets/fonts/'
    }),
    prod: makePath(basedir+ 'build/', {
        root: '',
        html: '',
        css: 'assets/css/',
        js: 'assets/js/',
        svg: 'assets/svg/',
        media: 'media/',
        img: 'assets/img/',
        fonts: 'assets/fonts/'
    }),
    isProduction : function() {
        return process.env.NODE_ENV == 'production';
    }
};


module.exports = config;
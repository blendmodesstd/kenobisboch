let baseDev = './src/';
let baseProd = './dist/';
let baseWp = './';

export const path = {
    dev : {
        html  :  `${baseDev}html/`,
        sass  :  `${baseDev}assets/sass/`,
        js    :  `${baseDev}assets/js/`,
        svg   :  `${baseDev}assets/svg/`,
        media :  `${baseDev}media/`,
        img   :  `${baseDev}assets/img/`,
        audio :  `${baseDev}assets/audio/`,
        fonts :  `${baseDev}assets/fonts/`,
        data  :  `${baseDev}assets/data/`
    },
    build : {
        root  :  baseProd,
        html  :  baseProd,
        css   :  `${baseProd}assets/css/`,
        js    :  `${baseProd}assets/js/`,
        media :  `${baseProd}media/`,
        img   :  `${baseProd}assets/img/`,
        audio :  `${baseProd}assets/audio/`,
        fonts :  `${baseProd}assets/fonts/`,
        data  :  `${baseProd}assets/data/`
    },
    wp: {
        assets : `${baseWp}static/`,
        modules : `${baseWp}templates/modules/`
    }
}

export const isProduction =  () => process.env.NODE_ENV == 'production'

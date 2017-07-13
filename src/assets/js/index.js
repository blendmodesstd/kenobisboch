import ofi from 'object-fit-images';
import Animations from '_modules/_animations.js';
import isTouch from './_helpers/_h-isTouch.js';

Animations().init();

if (isTouch) {
    document.body.classList.remove('no-touch')
}

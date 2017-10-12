import Animations from '_modules/_animations.js';
import Konami from '_modules/_konami.js';
import isTouch from './_helpers/_h-isTouch.js';

Animations().init();
Konami().init();

var styles1 = [
      'color: #000'
    , 'display: block'
    , 'line-height: 28px'
    , 'padding: 10px 10px 10px 10px'
    , 'background: #fff'
    , 'font-weight: lighter'
].join(';');

var styles2 = [
      'color: white'
    , 'display: block'
    , 'line-height: 28px'
    , 'padding: 10px 10px 10px 10px'
    , 'background: #000'
    , 'font-weight: lighter'
].join(';');

console.log('')
console.log('%c Developed by', styles1);
console.log('%cwww.blendmodes.com', styles2);
console.log('')
console.log('')
console.log('Ps. Konami Code :P');

if (isTouch) {
    document.body.classList.remove('no-touch');
}

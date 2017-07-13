import ofi from 'object-fit-images';
import Animations from '_modules/_animations.js';
import Konami from '_modules/_konami.js';
import isTouch from './_helpers/_h-isTouch.js';

Animations().init();
Konami().init();

console.log('Developed by Nicholas "TraXtorM Ruggeri');
console.log('http://www.ruggeri.io');
console.log('');
console.log('');
console.log('');
console.log('Ps. Konami Code :P');

if (isTouch) {
    document.body.classList.remove('no-touch')
}

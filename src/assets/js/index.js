import Animations from '_modules/_animations.js'
import Konami from '_modules/_konami.js'
import Signatures from '_modules/_signature.js'
import FollowMouse from './_modules/_followMouse.js'
import isTouch from './_helpers/_h-isTouch.js'

Animations().init()
Konami().init()
Signatures().init()

if (!isTouch) {
    FollowMouse.init()
}

if (isTouch) {
    document.body.classList.remove('no-touch')
}

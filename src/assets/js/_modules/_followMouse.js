import {x0, x} from '../_helpers'

const FollowMouse = (function() {

    var needForRAF = true

    const _updatePositionFollowMouse = (e) => {
        document.documentElement.style.setProperty('--mousey', e.clientY)
        document.documentElement.style.setProperty('--mousex', e.clientX)
        needForRAF = true
    }

    const _init = () => {
        document.addEventListener('mousemove', (e) => {

            let targetClasses

            if (needForRAF) {
                needForRAF = false;
                requestAnimationFrame(() => {
                    _updatePositionFollowMouse(e)
                })
            }

            if (e.target.hasAttribute('js-magnet')) {
                targetClasses = e.target.getAttribute('js-magnet')
                x0('[js-follow-mouse]').classList.add(targetClasses)
            } else {
                x0('[js-follow-mouse]').className = ''
            }

        })
    }

    return {
        init: _init
    }

}())

export default FollowMouse


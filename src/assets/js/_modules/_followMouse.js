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
                document.querySelector('[js-follow-mouse]').classList.add(targetClasses)
            } else {
                document.querySelector('[js-follow-mouse]').className = ''
            }

        })
    }

    return {
        init: _init
    }

}())

export default FollowMouse


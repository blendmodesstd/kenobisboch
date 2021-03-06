const Konami = function() {

    const _doc = document;
    const _screen = _doc.querySelector('.screen');

    // a key map of allowed keys
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        66: 'b'
    };

    // the 'official' Konami Code sequence
    const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

    // a variable to remember the 'position' the user has reached so far.
    var konamiCodePosition = 0;

    function _handleEvents() {
        // add keydown event listener
        _doc.addEventListener('keydown', (e) => {
            // get the value of the key code from the key map
            var key = allowedKeys[e.keyCode];
            // get the value of the required key from the konami code
            var requiredKey = konamiCode[konamiCodePosition];

            // compare the key with the required key
            if (key == requiredKey) {
                // move to the next key in the konami code sequence
                konamiCodePosition++;

                // if the last key is reached, activate cheats
                if (konamiCodePosition == konamiCode.length) {
                    _activateCheats();
                    konamiCodePosition = 0;
                }
            } else {
                konamiCodePosition = 0;
            }
        });
    }

    function _activateCheats() {
        _screen.classList.toggle('is-on');
        _screen.classList.toggle('is-off');
    }

    function _init() {
        _handleEvents();
    }

    return {
        init: _init
    }

}

export default Konami
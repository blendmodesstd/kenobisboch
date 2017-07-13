import TweenLite from 'gsap';
import nanoajax from 'nanoajax';

const Animations = function() {

    var _doc = document;

    function _removePreloader(cb) {
        console.log('remove preloader');
        var _screen = _doc.querySelector('.screen');
        _screen.classList.add('is-on');
    }

    function _getData() {

        var _list = _doc.querySelector('.m-list-shows');

        var _api = "https://api.twitch.tv/kraken/feed/kenobisboch/posts?client_id=0auj7aw5ss9f03dbrtafgg0ljmsmf1";

        nanoajax.ajax({url:_api}, function (code, responseText) {
            var content = JSON.parse(responseText);
            content.posts.forEach(function(entry) {

                console.log(entry)


                var _LI = document.createElement('li');
                var _tmp = `
                        <span class="m-date">${entry.created_at}</span>
                        <p>
                            ${entry.body}
                        </p>
                `;

                _LI.innerHTML = _tmp
                _list.appendChild(_LI);
            });

        })

    }

    function _init() {
        window.onload = function(){
            _getData();
            setTimeout(()=> {
                _removePreloader(function() {
                })
            }, 1000)
        };
    }

    return {
        init: _init
    }

}

export default Animations


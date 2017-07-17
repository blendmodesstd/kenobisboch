import nanoajax from 'nanoajax';
import timezone from 'moment-timezone';
import moment from 'moment';

const Animations = function() {

    moment.tz.setDefault('Europe/Berlin');

    const _doc = document;
    const _list = _doc.querySelector('.m-list-events');
    const _screen = _doc.querySelector('.screen');
    var listEvents = [];
    var urlEvents = [];

    function _removePreloader() {
        _screen.classList.add('is-on');
    }

    function _startGlitch() {
        var _elements = _doc.querySelectorAll('[data-glitch]');
        var item = Math.floor(Math.random() * _elements.length);
        Array.prototype.forEach.call(_elements, function(el, i){
            el.classList.remove('is-active');
        });
        _elements[item].classList.add('is-active');
    }


    function _renderData(entry) {

        var isExpired = moment(entry.start_time).isAfter(moment().format('llll'));

        var _LI = document.createElement('li');
        if (!isExpired) {
            _LI.classList.add('is-expired');
        }
        const _markup = `
            <a href="${entry.request_url}">
                <div class="event-thumbnail">
                    <img src="${entry.thumbnail_url}" alt="" />
                </div>
                <div>
                    <span class="m-event__date">
                        ${entry.start_time}
                    </span>
                    <div>
                        <p class="m-event__title" data-glitch-hover="${entry.title}">
                            ${entry.title}
                        </p>
                    </div>
                    <p class="m-event__description">
                        ${entry.description}
                    </p>
                </div>
            </a>
        `;

        _LI.innerHTML = _markup;
        _list.appendChild(_LI);
    }

    function _getData() {

        const _api = "https://api.twitch.tv/kraken/feed/kenobisboch/posts?client_id=0auj7aw5ss9f03dbrtafgg0ljmsmf1&limit=50";

        nanoajax.ajax({url:_api}, function (code, responseText) {
            var content = JSON.parse(responseText);
            content.posts.forEach(function(entry) {
                if (entry.embeds.length > 0) {
                    if (entry.embeds[0].type == 'event') {
                        var _currentUrl = entry.embeds[0].request_url;
                        entry.embeds[0].start_time = moment(entry.embeds[0].start_time).format('llll');
                        if (urlEvents.indexOf(_currentUrl) == -1) {
                            urlEvents.push(_currentUrl);
                            listEvents.push(entry.embeds[0])
                        }
                    }
                }
            });
            listEvents.sort((a, b) => {
                if (moment(a.start_time).isAfter(b.start_time)) {
                    return -1;
                } else {
                    return 1;
                }
            });
            listEvents.forEach(_renderData);
            _doc.querySelector('.m-shows__title').innerHTML = 'Upcoming Events';
        })

    }

    function _init() {
        window.onload = function(){
            _getData();
            setInterval(() => {
                _startGlitch();
            }, 3000);
            setTimeout(() => {
                _removePreloader();
            }, 100);
            setTimeout(() => {
                _doc.querySelector('.is-flickering').classList.remove('is-flickering');
            }, 7000);
        };
    }

    return {
        init: _init
    }

}

export default Animations


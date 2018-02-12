import nanoajax from 'nanoajax'
import timezone from 'moment-timezone'
import moment   from 'moment'

const Animations = () => {

    moment.tz.setDefault('Europe/Berlin')

    const _doc       = document
    const _list      = _doc.querySelector('.m-list-events')
    const _screen    = _doc.querySelector('.screen')
    const _embedLive = _doc.querySelector('.embed-live')
    var listEvents   = []
    var urlEvents    = []
    var isOnAir      = false

    function _removePreloader() {
        _screen.classList.add('is-on')
    }

    function _startGlitch() {
        var item      = 0
        var _elements = _doc.querySelectorAll('[data-glitch]')

        setInterval(() => {
            item = Math.floor(Math.random() * _elements.length)
            Array.prototype.forEach.call(_elements, (el, i) => {
                el.classList.remove('is-active')
            })
            _elements[item].classList.add('is-active')
        }, 3000)
    }


    function _renderData(entry) {

        var isExpired = moment(entry.end_time).isAfter(moment().format())
        var _LI       = document.createElement('li')

        if ((moment(entry.end_time).isAfter(moment().format())) && (moment(entry.start_time).isBefore(moment().format()))){
            _screen.classList.add('on-air')
            _screen.querySelector('.on-air__element').setAttribute('href', entry.request_url)
            _screen.querySelector('.on-air__element strong').innerHTML = entry.title
            isOnAir = true
        }

        if (!isExpired) {
            _LI.classList.add('is-expired')
        }

        const _markup = `
            <a href="${entry.request_url}" target="_blank" js-magnet="-scale">
                <div class="event-thumbnail">
                    <img src="${entry.thumbnail_url}" alt="" />
                </div>
                <div>
                    <span class="m-event__date">
                        ${moment(entry.start_time).format('llll')}
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
        `

        _LI.innerHTML = _markup
        _list.appendChild(_LI)
    }

    function _getData() {

        const _api = "https://api.twitch.tv/kraken/feed/kenobisboch/posts?client_id=0auj7aw5ss9f03dbrtafgg0ljmsmf1&limit=100";

        nanoajax.ajax({url: _api}, (code, responseText) => {
            var content = JSON.parse(responseText)

            content.posts.forEach((entry) => {
                if (entry.embeds.length > 0) {
                    if (entry.embeds[0].type == 'event') {
                        var _currentUrl = entry.embeds[0].request_url;
                        entry.embeds[0].start_time = moment(entry.embeds[0].start_time).format();
                        if (urlEvents.indexOf(_currentUrl) == -1) {
                            urlEvents.push(_currentUrl);
                            listEvents.push(entry.embeds[0])
                        }
                    }
                }
            })

            listEvents.sort((a, b) => {
                if (moment(a.start_time).isAfter(b.start_time)) {
                    return -1
                } else {
                    return 1
                }
            })

            listEvents.forEach(_renderData)

            if (isOnAir) {
                const _markupEmbed = `
                    <iframe
                        src="http://player.twitch.tv/?channel=kenobisboch"
                        height=""
                        width=""
                        frameborder="0"
                        scrolling="no"
                        allowfullscreen="true">
                    </iframe>
                `

                _embedLive.innerHTML = _markupEmbed
                _embedLive.classList.remove('not-live')
            }

            _doc.querySelector('.m-shows__title').innerHTML = 'Upcoming Events'
        })

    }

    function _init() {
        window.onload = () => {
            _getData()
            _startGlitch()

            setTimeout(() => {
                _removePreloader()
            }, 100)

            setTimeout(() => {
                _doc.querySelector('.is-flickering').classList.remove('is-flickering')
            }, 7000)
        };
    }

    return {
        init: _init
    }

}

export default Animations


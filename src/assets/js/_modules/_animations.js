import nanoajax from 'nanoajax'
import timezone from 'moment-timezone'
import moment   from 'moment'
import {x0, x} from '../_helpers'

const Animations = () => {

    moment.tz.setDefault('Europe/Berlin')

    const _list      = x0('.m-list-events')
    const _oldList   = x0('.m-list-old-events')
    const _screen    = x0('.screen')
    const _embedLive = x0('.embed-live')

    let listEvents   = []
    let urlEvents    = []
    let isOnAir      = false
    let _counter     = 0
    let _bestClip    = ''

    const _removePreloader = () => {
        _screen.classList.add('is-on')
    }

    const _startGlitch = () => {
        let _glithItem  = 0
        const _elements = x('[data-glitch]')

        setInterval(() => {
            _glithItem = Math.floor(Math.random() * _elements.length)
            Array.prototype.forEach.call(_elements, (el, i) => {
                el.classList.remove('is-active')
            })
            _elements[_glithItem].classList.add('is-active')
        }, 1500)
    }

    const _renderData = (entry) => {

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
        } else {
            _counter++
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
            </a>`

        _LI.innerHTML = _markup

        if (!isExpired) {
            _oldList.appendChild(_LI)
        } else {
            if (_list.prepend !== undefined) {
                _list.prepend(_LI)
            } else {
                _list.appendChild(_LI)
            }
        }
    }

    const _getData = (res, rej) => {
        const _api = "https://api.twitch.tv/kraken/feed/kenobisboch/posts?client_id=0auj7aw5ss9f03dbrtafgg0ljmsmf1&limit=100";

        nanoajax.ajax({url: _api}, (code, responseText) => {
            const content = JSON.parse(responseText)

            console.log(content)

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
                        src="https://player.twitch.tv/?channel=kenobisboch"
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

            res()
        })
    }

    const _getDataClip = (res, rej) => {
        const _api = "https://api.twitch.tv/kraken/clips/top?channel=kenobisboch";

        nanoajax.ajax({
            url: _api,
            headers: {
                "Client-ID": "0auj7aw5ss9f03dbrtafgg0ljmsmf1",
                "Accept": "application/vnd.twitchtv.v5+json"
            }
        }, (code, responseText) => {
            const content = JSON.parse(responseText)

            _bestClip = content.clips[0].embed_url

            res()
        })
    }

    const _init = () => {
        _startGlitch()
        _handleClip()

        window.onload = () => {
            // const _promise = new Promise((resolve, reject) => {
            //     _getData(resolve, reject)
            // })

            // _promise.then(() => {
            //     _removePreloader()

            //     setTimeout(() => {
            //         x0('.is-flickering').classList.remove('is-flickering')
            //     }, 7000)

            //     if (_counter == 0) {
            //         x0('.m-shows__title.-main').remove()
            //     } else {
            //         x0('.m-shows__title.-main').innerHTML = 'Upcoming Events'
            //     }
            // })
            // 
            _removePreloader()

            const _promiseClip = new Promise((resolve, reject) => {
                _getDataClip(resolve, reject)
            })

            _promiseClip.then(() => {
                x0('#trigger-clip').classList.add('-active')
            })
        }
    }

    const _handleClip = () => {
        const _triggerClip = x0('#trigger-clip')
        const _triggerClose = x0('.close-iframe')
        const _boxClip = x0('#trending-clip')

        _triggerClip.addEventListener('click', () => {
            _boxClip.classList.add('-active')
            x0('.wrap-iframe iframe').src = _bestClip
        })

        _triggerClose.addEventListener('click', () => {
            _boxClip.classList.remove('-active')
            x0('.wrap-iframe iframe').src = ''
        })

    }

    return {
        init: _init
    }

}

export default Animations


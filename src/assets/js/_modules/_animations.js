import TweenLite from 'gsap';
import nanoajax from 'nanoajax';
import timezone from 'moment-timezone';
import moment from 'moment';

const Animations = function() {

    moment.tz.setDefault('Europe/Berlin');

    var _doc = document;
    var _list = _doc.querySelector('.m-list-events');

    var listEvents = [];
    var urlEvents = [];

    function _removePreloader(cb) {
        var _screen = _doc.querySelector('.screen');
        _screen.classList.add('is-on');
    }


    function _renderData(entry) {

        var isExpired = moment(entry.start_time).isAfter(moment().format('llll'));

        var _LI = document.createElement('li');
        if (!isExpired) {
            _LI.classList.add('is-expired');
        }
        var _tmp = `
            <a href="${entry.request_url}">
                <span class="m-event__date">${entry.start_time}</span>
                <p class="m-event__title">
                    ${entry.title}
                </p>
                <p class="m-event__description">
                    ${entry.description}
                </p>
            </a>
        `;

        _LI.innerHTML = _tmp
        _list.appendChild(_LI);
    }

    function _getData() {

        var _fakeData = {
            "_cursor": "21_eyJ0IjoiZmVlZCIsImkiOiJwb3N0OmQ2ZTdhY2I0LWFkODMtNGY2My05OGM0LTI4ZDBkN2U0OGRkNyIsInMiOjQxNTIxNS44NTUzNDgzMzU4fQ==",
            "_topic": "feeds.channel.149683488",
            "posts": [
                {
                    "id": "dfd1bc2b-b4e6-4d07-8ff6-e396e57e33d1",
                    "body": "Siamo LIVE con una mezz'oretta di musica, poi SFIDIAMO LE CAPRE in BROKEN SWORD!",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-07-04T19:04:45Z",
                    "deleted": false,
                    "embeds": [],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {},
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "f8a5d252-4f73-4958-b6df-43c04d7c5abe",
                    "body": "Lunedì a casa Kenobisboch significa Lunedì PSX. Questa sera Antonio ci condurrà per mano nel bizzarro mondo dei giochi con visuale in soggettiva su PlayStation 1.\nhttps://www.facebook.com/events/1825177841131075/",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-26T11:48:45Z",
                    "deleted": false,
                    "embeds": [],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {},
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "421906ab-b11c-4478-9342-1e06c869d645",
                    "body": "Una serata speciale per festeggiare il ritorno di Bisboch e Surgo dall'E3. Con un ospite d'eccezione: Davide Soliani. Giocheremo a Super Mario Galaxy in un tripudio d'amore idraulico.\nhttps://www.twitch.tv/events/59779",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-21T09:56:21Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/59779",
                            "type": "event",
                            "title": "Super Mario Galaxy (e festa post E3)",
                            "description": "Una serata speciale per festeggiare il ritorno di Bisboch e Surgo dall'E3. Con un ospite d'eccezione: Davide Soliani. Giocheremo a Super Mario Galaxy in un tripudio d'amore idraulico.",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/Gv8uoVx.p7ejF8d0qAD1LWDmlu3n9Sq4-500x281",
                            "provider_name": "Twitch",
                            "game": "Super Mario Galaxy",
                            "start_time": "2017-07-21T19:30:00Z",
                            "end_time": "2017-06-22T11:00:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 2,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "8eb6e15c-5c66-44e7-a3de-7e2cff7c797c",
                    "body": "Siamo LIVE con dei giochi pazzeschi per PSX. https://www.twitch.tv/kenobisboch",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-19T20:08:43Z",
                    "deleted": false,
                    "embeds": [],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {},
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "a82c5c26-d852-4076-aca0-f3a157594b4f",
                    "body": "https://www.twitch.tv/videos/152224401\n",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-16T11:58:05Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/videos/152224401",
                            "type": "video",
                            "title": "DadoBax finisce Prince of Persia",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/s3_vods/kenobisboch/152224401/4b30401e-cab3-4464-aa51-268701ad9476/thumb/custom51d547090c738afe-640x360.png",
                            "player_html": "<iframe src=\"https://player.twitch.tv/?%21branding=&amp;autoplay=true&amp;video=v152224401\" width=\"500\" height=\"281\" frameborder=\"0\" scrolling=\"no\" allowfullscreen></iframe>",
                            "provider_name": "Twitch",
                            "created_at": "2017-06-16T11:08:08Z",
                            "game": "Prince of Persia",
                            "video_length": 3655,
                            "twitch_type": "vod"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "24578e88-648d-4813-97f5-ba0fbe64da58",
                    "body": "Questa sera, visto che vedere Super Mario Odyssey ci ha fatto venire l'acquolina in bocca, ci riposiamo dalle fatiche dell'E3 giocando a Super Mario Galaxy. Alle 21:30, direttamente dal divano, riscoprire un classico moderno e per chiacchierare di questo E3.",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-14T15:48:05Z",
                    "deleted": false,
                    "embeds": [],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        },
                        "133537": {
                            "emote": "KAPOW",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "5d16621b-9828-4c4f-8d37-0a7a7aa2cb8e",
                    "body": "L'E3 senza peli sulla lingua di Kenobisboch Productions. Una masnada di ospiti a casa Kenobit per 12 ore di maratona, dallo Showcase PC fino alle 5 del mattino con la conferenza di Sony. Per ingannare il tempo tra una conferenza e l'altra, talk show culinari, cocktail d'autore, approfondimenti, giochi. Programma e dettagli su Facebook: https://www.facebook.com/events/857710997716164\nhttps://www.twitch.tv/events/55560",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-09T11:26:46Z",
                    "deleted": false,
                    "embeds": [],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "58127": {
                            "emote": "CoolCat",
                            "count": 3,
                            "user_ids": []
                        },
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 8,
                            "user_ids": []
                        },
                        "160402": {
                            "emote": "SabaPing",
                            "count": 4,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "8a687cc5-9f7f-4b9d-b288-9a6575f7500e",
                    "body": "Questa sera siamo carichissimi con Sam & Max. Avremo come ospite Virginia (che avete già visto nella seconda puntata di Simon the Sorcerer).\nhttps://www.twitch.tv/events/54110",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-08T16:17:07Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/54110",
                            "type": "event",
                            "title": "Punta e Clicca - Sam & Max (seconda parte)",
                            "description": "Seconda puntata dedicata a Sam & Max.",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/a4zClWOJ6x3nXs4Cx_xmnvf0MRaWsdC4-500x281",
                            "provider_name": "Twitch",
                            "game": "Sam & Max Hit the Road",
                            "start_time": "2017-06-08T19:30:00Z",
                            "end_time": "2017-06-08T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {},
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "eab9a77e-ad80-404c-9060-bd146e6250c6",
                    "body": "Una serata dedicata ai classici e alle perle nascoste di Capcom. Con Kenobit e Bisboch.\nhttps://www.twitch.tv/events/54111",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-05T12:49:14Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/54111",
                            "type": "event",
                            "title": "Serata CAPCOM",
                            "description": "Una serata dedicata ai classici e alle perle nascoste di Capcom. Con Kenobit e Bisboch.",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/gO8qF6vX052HcYOaCafsvrU.7otOoUlI-500x281",
                            "provider_name": "Twitch",
                            "game": "Retro",
                            "start_time": "2017-06-07T19:30:00Z",
                            "end_time": "2017-06-07T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 5,
                            "user_ids": []
                        },
                        "endorse": {
                            "emote": "endorse",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "c396d848-3830-4fa5-98d2-eaa39bd06ccb",
                    "body": "Seconda puntata dedicata a Sam & Max. Con #martasuldivano, Kenobit e un ospite sbloccabile.\nhttps://www.twitch.tv/events/54110",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-05T12:46:09Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/54110",
                            "type": "event",
                            "title": "Punta e Clicca - Sam & Max (seconda parte)",
                            "description": "Seconda puntata dedicata a Sam & Max.",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/a4zClWOJ6x3nXs4Cx_xmnvf0MRaWsdC4-500x281",
                            "provider_name": "Twitch",
                            "game": "Sam & Max Hit the Road",
                            "start_time": "2017-06-08T19:30:00Z",
                            "end_time": "2017-06-08T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 3,
                            "user_ids": []
                        },
                        "endorse": {
                            "emote": "endorse",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "7839110c-1dbe-4aa8-8404-641bc31c17df",
                    "body": "Starless si impossessa delle frequenze di Kenobisboch Productions per una nuova rubrica dedicata alla prima PlayStation. STASERA!\nhttps://www.twitch.tv/events/54100",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-06-05T11:53:51Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/54100",
                            "type": "event",
                            "title": "Lunedì PSX",
                            "description": "Starless si impossessa delle frequenze di Kenobisboch Productions per una nuova rubrica dedicata alla prima PlayStation.",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/0KnmX1wMg8fy79TYzogxDwLM6p.meTX8-500x281",
                            "provider_name": "Twitch",
                            "game": "Retro",
                            "start_time": "2017-06-05T19:30:00Z",
                            "end_time": "2017-06-05T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "4302a2f0-bd72-4f7a-ba5a-2c455d7f6932",
                    "body": "Sam & Max: pixel prestigiosi da un'era d'oro del punta e clicca.\nhttps://www.twitch.tv/events/51591",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-29T08:19:44Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/51591",
                            "type": "event",
                            "title": "PUNTA E CLICCA - Sam & Max",
                            "description": "La seconda avventura della serie Punta e Clicca di KB Productions è Sam & Max.",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/CNy3_wjSaQpSIL0QpqzZKx6KGYy3mQmM-500x281",
                            "provider_name": "Twitch",
                            "game": "Sam & Max Hit the Road",
                            "start_time": "2017-05-31T19:30:00Z",
                            "end_time": "2017-05-31T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 3,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "5519cf67-2195-4788-9205-0643c53e610c",
                    "body": "Uno stream sperimentale! Napo dei Uochi Toki e musica dal vivo!\nhttps://www.twitch.tv/events/51590",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-29T08:16:35Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/51590",
                            "type": "event",
                            "title": "Realtà virtuale: Lapis Niger + H!U",
                            "description": "Lapis Niger (aka Napo dei Uochi Toki) disegna nella realtà virtuale di Tilt Brush, accompagnato dalla musica dal vivo di H!U.",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/8Ff8TXRUoJF4_pxEt7oecdWitkv381f8-500x281",
                            "provider_name": "Twitch",
                            "game": "Creative",
                            "start_time": "2017-05-30T19:30:00Z",
                            "end_time": "2017-05-30T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "e95164e4-0caa-4ba5-8507-08d69242ba86",
                    "body": "Stasera, Alex Kidd e Ray Bibbia con Kenobit e Matteo Corradini!\nhttps://www.twitch.tv/events/49189",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-25T12:39:07Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/49189",
                            "type": "event",
                            "title": "Alex Kidd in Miracle World + Ray Bibbia (ospite Matteo Corradini)",
                            "description": "Kenobit e Matteo Corradini di The Pills alle prese con l'amore per il Master System. Bonus: sneak peak di Ray Bibbia!",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/TjNImd8G9frGde_TI0ti1CW0sZudw2X1-500x281",
                            "provider_name": "Twitch",
                            "game": "Alex Kidd in Miracle World",
                            "start_time": "2017-05-25T19:30:00Z",
                            "end_time": "2017-05-25T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 2,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "0ef89eaa-3612-41b4-a350-06236b038087",
                    "body": "Stream straordinario dedicato ad Alex Kidd, con l'ospite speciale Matteo Corradini!\n\nhttps://www.twitch.tv/events/49189",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-22T13:34:24Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/49189",
                            "type": "event",
                            "title": "Alex Kidd in Miracle World + Ray Bibbia (ospite Matteo Corradini)",
                            "description": "Kenobit e Matteo Corradini di The Pills alle prese con l'amore per il Master System. Bonus: sneak peak di Ray Bibbia!",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/TjNImd8G9frGde_TI0ti1CW0sZudw2X1-500x281",
                            "provider_name": "Twitch",
                            "game": "Alex Kidd in Miracle World",
                            "start_time": "2017-05-25T19:30:00Z",
                            "end_time": "2017-05-25T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "1ec09d0b-f457-4113-b1b0-443c328914c2",
                    "body": "Che dite, ce la facciamo a finire Simon, questo martedì?\n\nhttps://www.twitch.tv/events/49184",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-22T13:28:02Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/49184",
                            "type": "event",
                            "title": "PUNTA E CLICCA - Simon the Sorcerer (terza e ultima parte?)",
                            "description": "Terza (e ultima?) puntata di Simon the Sorcerer!",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/Xz5I9Uzkplxh7mhF4XkWUz_i1U55edPk-500x281",
                            "provider_name": "Twitch",
                            "game": "Simon the Sorcerer",
                            "start_time": "2017-05-23T19:30:00Z",
                            "end_time": "2017-05-23T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "289b9e01-da37-4115-a32f-d8bb2e990d66",
                    "body": "Questo mercoledì tornano i longplay di Kenobisboch!\n\nhttps://www.twitch.tv/events/49180",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-22T13:22:51Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/49180",
                            "type": "event",
                            "title": "Demon's Crest [BLIND RUN]",
                            "description": "Blind run di Demon's Crest, capolavoro di Capcom per Super Nintendo. Con Babich e Kenobit!",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/FJz7HHYxkXk9.wuUfgodl2kf4eaHtC9H-500x281",
                            "provider_name": "Twitch",
                            "game": "Retro",
                            "start_time": "2017-05-24T19:30:00Z",
                            "end_time": "2017-05-24T21:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "4d7b8201-7253-4935-b0bd-7e4c2e8c25f2",
                    "body": "LIVE right now! ",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-17T19:54:22Z",
                    "deleted": false,
                    "embeds": [],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "ee5ef8e8-946d-4d17-9e03-8b7b74307b4b",
                    "body": "https://www.twitch.tv/videos/143441413\n",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-15T07:30:17Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/videos/143441413",
                            "type": "video",
                            "title": "Speed run di Super Metroid! [replica]",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/s3_vods/kenobisboch/143441413/a6230d45-21da-4848-810d-642e8c2b62ac/thumb/custom4b242c4619e25445-640x360.png",
                            "player_html": "<iframe src=\"https://player.twitch.tv/?%21branding=&amp;autoplay=true&amp;video=v143441413\" width=\"500\" height=\"281\" frameborder=\"0\" scrolling=\"no\" allowfullscreen></iframe>",
                            "provider_name": "Twitch",
                            "created_at": "2017-05-14T15:10:10Z",
                            "game": "Super Metroid",
                            "video_length": 5213,
                            "twitch_type": "vod"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 1,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                },
                {
                    "id": "d6e7acb4-ad83-4f63-98c4-28d0d7e48dd7",
                    "body": "Seconda serata di retrogaming per NINJA!\n\nhttps://www.twitch.tv/events/46396",
                    "comments": {
                        "_total": 0,
                        "_cursor": "",
                        "comments": []
                    },
                    "created_at": "2017-05-14T15:51:19Z",
                    "deleted": false,
                    "embeds": [
                        {
                            "request_url": "https://www.twitch.tv/events/46396",
                            "type": "event",
                            "title": "Retrogaming per NINJA (seconda parte)",
                            "description": "Seconda serata dedicata al retrogaming per NINJA! Una serata a base di sala giochi, Commodore 64 e Sega Megadrive.",
                            "author_name": "kenobisboch",
                            "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-event-images/149683488/PFgliblhD4P9RW4NRdaKT5.Oy4exQBRh-500x281",
                            "provider_name": "Twitch",
                            "game": "Shinobi",
                            "start_time": "2017-05-17T19:30:00Z",
                            "end_time": "2017-05-17T22:30:00Z"
                        }
                    ],
                    "emotes": [],
                    "permissions": {
                        "can_reply": false,
                        "can_moderate": false,
                        "can_delete": false
                    },
                    "reactions": {
                        "62835": {
                            "emote": "bleedPurple",
                            "count": 2,
                            "user_ids": []
                        }
                    },
                    "user": {
                        "display_name": "kenobisboch",
                        "_id": 149683488,
                        "name": "kenobisboch",
                        "type": "user",
                        "bio": "Amiamo il retrogaming. Dopo un passato su riviste di videogiochi come Giochi per il Mio Computer, TGM, Xbox Magazine Ufficiale, PSM e Nintendo la Rivista Ufficiale, ci divertiamo a riscoprire classici e perle nascoste in streaming.",
                        "created_at": "2017-03-07T09:16:52Z",
                        "updated_at": "2017-07-13T15:31:21Z",
                        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/kenobisboch-profile_image-8dcd5deb3202131e-300x300.png",
                        "_links": {
                            "self": "https://api.twitch.tv/kraken/users/kenobisboch"
                        }
                    }
                }
            ],
            "_total": 21
        }

        var _api = "https://api.twitch.tv/kraken/feed/kenobisboch/posts?client_id=0auj7aw5ss9f03dbrtafgg0ljmsmf1&limit=50";

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
            document.querySelector('.m-shows__title').innerHTML = 'Upcoming Events';
        })

        // _fakeData.posts.forEach(function(entry) {
        //     if (entry.embeds.length > 0) {
        //         if (entry.embeds[0].type == 'event') {
        //             var _currentUrl = entry.embeds[0].request_url;
        //             entry.embeds[0].start_time = moment(entry.embeds[0].start_time).format('llll');
        //             if (urlEvents.indexOf(_currentUrl) == -1) {
        //                 urlEvents.push(_currentUrl);
        //                 listEvents.push(entry.embeds[0])
        //             }
        //         }
        //     }
        // });

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


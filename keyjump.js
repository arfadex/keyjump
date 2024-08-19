// ==UserScript==
// @name         KeyJump
// @namespace    https://github.com/Megane0103/keyjump
// @version      1.0
// @description  Adds a keybinding menu in various websites.
// @author       Megane0103
// @match        *://*.youtube.com/*
// @match        *://*.last.fm/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function() {
    'use strict';

    const lastFmUsername = 'YourUsername';

    const style = document.createElement('style');
    style.textContent = `
        #keybindingMenu {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #1e1e2e;
            border: 1px solid #7f849c;
            padding: 15px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            z-index: 10000;
            color: #d9e0ee;
            width: 300px;
            border-radius: 10px;
        }
        #keybindingMenu ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        #keybindingMenu li {
            margin: 5px 0;
        }
        #keybindingMenu li span {
            font-weight: bold;
            margin-right: 10px;
        }
        #keybindingMenu .closeButton {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #f38ba8;
            color: #1e1e2e;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        }
        #keybindingMenu .closeButton:hover {
            background-color: #f2cdcd;
        }
    `;
    document.head.appendChild(style);

    const menu = document.createElement('div');
    menu.id = 'keybindingMenu';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'x';
    closeButton.className = 'closeButton';
    closeButton.addEventListener('click', function() {
        menu.style.display = 'none';
    });
    menu.appendChild(closeButton);

    let menuContent = '<div>Press a key to go:</div><ul>';

    if (window.location.hostname.includes('youtube.com')) {
        menuContent += `
            <li><span>H</span> → Home</li>
            <li><span>L</span> → Library</li>
            <li><span>S</span> → Subscriptions</li>
            <li><span>Y</span> → History</li>
            <li><span>W</span> → Watch Later</li>
            <li><span>T</span> → Trending</li>
            <li><span>P</span> → Playlist</li>
            <li><span>M</span> → Music</li>
            <li><span>A</span> → Channel Videos Page</li>
        `;
    } else if (window.location.hostname.includes('last.fm')) {
        menuContent += `
            <li><span>H</span> → Home</li>
            <li><span>F</span> → Profile</li>
            <li><span>L</span> → Library</li>
            <li><span>S</span> → Scrobbles</li>
            <li><span>A</span> → Artists</li>
            <li><span>T</span> → Tracks</li>
            <li><span>P</span> → Playlists</li>
            <li><span>J</span> → Journal</li>
        `;
    }

    menuContent += '</ul>';
    menu.insertAdjacentHTML('beforeend', menuContent);

    menu.style.display = 'none';
    document.body.appendChild(menu);

    function isTyping() {
        const activeElement = document.activeElement;
        return activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable;
    }

    document.addEventListener('keydown', function(event) {
        if (isTyping()) return;

        if (event.key === 'g') {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        } else if (event.key === 'Escape') {
            menu.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (isTyping()) return;

        if (menu.style.display === 'block') {
            if (window.location.hostname.includes('youtube.com')) {
                const currentVideoChannel = document.querySelector('a.yt-simple-endpoint.style-scope.yt-formatted-string[href^="/@"]');

                if (event.key === 'h') {
                    window.location.href = '/';
                } else if (event.key === 'l') {
                    window.location.href = '/feed/library';
                } else if (event.key === 's') {
                    window.location.href = '/feed/subscriptions';
                } else if (event.key === 'y') {
                    window.location.href = '/feed/history';
                } else if (event.key === 'w') {
                    window.location.href = '/playlist?list=WL';
                } else if (event.key === 't') {
                    window.location.href = '/feed/trending';
                } else if (event.key === 'p') {
                    window.location.href = '/feed/playlists';
                } else if (event.key === 'm') {
                    window.location.href = '/music';
                } else if (event.key === 'a' && currentVideoChannel) {
                    window.location.href = currentVideoChannel.href + '/videos';
                }
            } else if (window.location.hostname.includes('last.fm')) {
                if (event.key === 'h') {
                    window.location.href = '/home';
                } else if (event.key === 'f') {
                    window.location.href = `/user/${lastFmUsername}`;
                } else if (event.key === 'l') {
                    window.location.href = `/user/${lastFmUsername}/library`;
                } else if (event.key === 's') {
                    window.location.href = `/user/${lastFmUsername}/tracks`;
                } else if (event.key === 'a') {
                    window.location.href = `/user/${lastFmUsername}/artists`;
                } else if (event.key === 't') {
                    window.location.href = `/user/${lastFmUsername}/tracks`;
                } else if (event.key === 'p') {
                    window.location.href = `/user/${lastFmUsername}/playlists`;
                } else if (event.key === 'j') {
                    window.location.href = `/user/${lastFmUsername}/journal`;
                }
            }
        }
    });
})();

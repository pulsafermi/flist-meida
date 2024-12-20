// ==UserScript==
// @name         Replace Text with iFrame
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Replace specific text with an iframe from a custom tag
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==
// Instructions
/* 
This is a custom script that does a very simple thing: it replaces custom tags with an iframe.

The custom BBCode tag it's looking for is [spotify] - this isn't a tag that is normally parsed by BBCode.

Simply enter your Spotify playlist like; [spotify]https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M[/spotify] and it will be replaced with an iframe.
*/
/*
Profile Template:
[center]
[collapse=Spotify Playlist]
[spotify]URL[/spotify]
Hi! If you see this message, it means that you don't have the tampermonkey script installed.
Tampermonkey is a browser extension that allows you to install custom scripts to change the way a web page behaves.
You can install the plugin by clicking [url=https://www.tampermonkey.net/]here[/url] - please note, that this plugin can be used nefariously.
Don't install scripts from untrusted sources, and always read the code before installing.
You can find the scripts that I write [url=https://github.com/pulsafermi/flist-scripts]here[/url].
[/collapse]
[/center]
*/

(function() {
    'use strict';

    // Function to replace custom [spotify]URL[/spotify] tags with iframe
    function replaceSpotifyTags() {
        const bodyText = document.body.innerHTML;
        const spotifyTagRegex = /\[center\]\s*\[collapse=Spotify Playlist\]\s*\[spotify\](.*?)\[\/spotify\][\s\S]*?\[\/collapse\]\s*\[\/center\]/g;
        const newBodyText = bodyText.replace(spotifyTagRegex, (match, p1) => {
            if (p1.startsWith("https://open.spotify.com/")) {
                const iframe = `<iframe style="border-radius:12px" src="${p1}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
                return iframe;
            } else {
                return `[color=red]This Profile tried to load an invalid Spotify URL, or tried to inject a different URL into the iframe. The URL is ${p1}[/color]`;
            }
        });
        document.body.innerHTML = newBodyText;
    }

    // Run the function after the page loads
    window.addEventListener('load', replaceSpotifyTags);
})();
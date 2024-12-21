// ==UserScript==
// @name         Media Embedding
// @namespace    https://github.com/pulsafermi/flist-music/edit/main/flist-music.js
// @version      1.0
// @description  Opens a borderless popup for media playlists in F-List BBCode
// @match        *://*.f-list.net/c/*
// @grant        none
// ==/UserScript==

// Instructions
/* 
This is a custom script that does a very simple thing: it replaces custom tags with a popup.

The custom BBCode tag it's looking for is [spotify] - this isn't a tag that is normally parsed by BBCode.

Simply enter your Spotify playlist like; [spotify]https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M[/spotify] and it will be replaced with a popup.
*/
/*
Profile Template:
[spotify]URL[/spotify]
*/

(function() {
    'use strict';

    function replaceMediaTags() {
        const bodyText = document.body.innerHTML;
        const spotifyTagRegex = /\[spotify\](.*?)\[\/spotify\]/g;
        const youtubeTagRegex = /\[ytvid\](.*?)\[\/ytvid\]/g;
        const youtubePlaylistTagRegex = /\[ytplaylist\](.*?)\[\/ytplaylist\]/g;

        const newBodyText = bodyText
            .replace(spotifyTagRegex, (match, p1) => {
                const uniqueCodeMatch = p1.match(/https:\/\/open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/);
                if (uniqueCodeMatch) {
                    const uniqueCode = uniqueCodeMatch[1];
                    const iframe = `
                    <button onclick="openPopup('https://open.spotify.com/embed/playlist/${uniqueCode}?utm_source=generator&theme=0')" style="border:none; background:none; cursor:pointer; color:cyan; text-decoration:underline;">Open Spotify Playlist</button>`;
                    return iframe;
                } else {
                    return `<p style="color:red;">This Profile tried to load an invalid Spotify URL. The URL is ${p1}</p>`;
                }
            })
            .replace(youtubeTagRegex, (match, p1) => {
                const videoIdMatch = p1.match(/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
                if (videoIdMatch) {
                    const videoId = videoIdMatch[1];
                    const iframe = `
                    <button onclick="openPopup('https://www.youtube.com/embed/${videoId}')" style="border:none; background:none; cursor:pointer; color:cyan; text-decoration:underline;">Open Youtube Video</button>`;
                    return iframe;
                } else {
                    return `<p style="color:red;">This Profile tried to load an invalid YouTube Video URL. The URL is ${p1}</p>`;
                }
            })
            .replace(youtubePlaylistTagRegex, (match, p1) => {
                const playlistIDMatch = p1.match(/https:\/\/www\.youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)&?/);
                if (playlistIDMatch) {
                    const playlistId = playlistIDMatch[1];
                    const iframe = `
                    <button onclick="openPopup('https://www.youtube.com/embed/videoseries?si=lEeT0ovqHmUVmXh4&amp;list=${playlistId}')" style="border:none; background:none; cursor:pointer; color:cyan; text-decoration:underline;">Open Youtube Playlist</button>`;
                    return iframe;
                } else {
                    return `<p style="color:red;">This Profile tried to load an invalid YouTube Playlist URL. The URL is ${p1}</p>`;
                }
            });

        document.body.innerHTML = newBodyText;
    }

    // Function to open a new window with the Spotify URL
    window.openPopup = function(url) {
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const options = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`;
        window.open(url, '_blank', options);
    };

    // Run the function after the page loads
    window.addEventListener('load', replaceMediaTags);
})();



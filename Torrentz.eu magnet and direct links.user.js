// ==UserScript==
// @name            Torrentz2 (dot) eu magnet link
// @namespace       Torrentz2
// @description     Adds direct download links to the result pages of torrentz2.eu. It uses the so-called magnet URI scheme to provide a more user-friendly, faster way to access your favorite torrents.
// @match           https://torrentz2.eu/*
// @match           https://torrentz2.me/*
// @match           https://torrentzwealmisr.onion/*
// @include         https://torrentz.*
// @include         https://torrentz2.*
// @grant           GM_addStyle
// @updateURL       https://openuserjs.org/meta/Jeni4/Torrentz2_(dot)_eu_magnet_link.meta.js
// @downloadURL     https://openuserjs.org/src/scripts/Jeni4/Torrentz2_(dot)_eu_magnet_link.user.js
// @license         Creative Commons Attribution-Share Alike http://creativecommons.org/licenses/by-sa/3.0/
// @contributionURL https://github.com/netravnen/torrentz2-magnet-link
// @supportURL      https://github.com/netravnen/torrentz2-magnet-link
// @version         1.0.11
// ==/UserScript==
// -----------------------------------------------------
//
// Changelog:
//  * 1.0.11
//    - Do not use pow7 tracker anymore
//    - Removed http protocol mathcing of urls. Now only https url matching
//  * 1.0.10
//    - Fix: Changed class ".download" to ".downlinks"
//  * 1.0.9 (2017-04-20)
//    - New UserScript Attribute: contributionURL
//    - New UserScript Attribute: supportURL
//    - Changed the match and inlcude UserScript attributes to use http(s) instead of wildcards
//  * 1.0.8 (2017-04-18)
//    - Added 'p4p.arenabg.ch' to array() 'needleTrackers'-in-a-'haystackTrackers'
//    - Added 'tracker.pirateparty.gr' to array() 'needleTrackers'-in-a-'haystackTrackers'
//  * 1.0.7.1 (2017-01-15)
//    - Added 'tracker.pirateparty.gr' to array() 'needleTrackers'-in-a-'haystackTrackers'
//  * 1.0.7 (2017-01-15)
//    - Changed '@grant none' to '@grant GM_addStyle'.
//    - Changed style '#magnetlinkurlid' to load with function 'GM_addStyle()' instead of more native
//      javascript. Because of Chrome throwing errors related to style-src not set parameter.
//  * 1.0.6.3 (2016-09-22)
//    - Added mirror sites torrentz2.me and torrentzwealmisr.onion.
//  * 1.0.6.2 (2016-08-28)
//    - Modified url regex pattern matching to enable the script to run on proxy sites.
//    - Added the inlcude lines *://torrentz.* and *://torrentz*.* to script properties.
//  * 1.0.6.1 (2016-08-20)
//    - Added tracker explodie.org and moved 9.rarbg.com to comments section for non-used trackers
//  * 1.0.6 (2016-08-17)
//    - updated matching domains to the new player called torrentz2.eu.
//    - torrentz.eu and all affiliated domains and mirror sites removed to the site suffering a slash back.
//  * 1.0.5 (2012-11-15)
//    - update for new domain (torrentz.eu).
//    - and changing the default trackers (openbittorrent, publicbt, istole.it).
//  * 1.0.4 (2011-01-01)
//    - update for new domain (torrentz.eu).
//  * 1.0.3 (2009-12-30)
//    - fixed some more problems with 'www.torrentz.com'.
//    - adding three default trackers to any magnet link.
//  * 1.0.2 (2009-12-30)
//    - now both 'www.torrentz.com' and 'torrenz.com' are
//      correctly treated.
//  * 1.0.1 (2009-12-05)
//    - small bugfix (incompatibility with certain custom
//      css styles).
//  * 1.0.0 (2009-11-17)
//    - initial release.
// -----------------------------------------------------

var url;

url = null;

if ((url = location.href.match(/torrentz(2)?(\.([a-z0-9]+))?\.([a-z]{2,8})\/([a-f0-9]{40})/)))
{
    if (url !== null)
    {
        console.log
        
        var hash, trackers, needleTrackers, haystackTrackers, title, magnet, head, style, body;
        
        hash = url[5];

        // default trackers for every magnet link.
        trackers =
            /*
            NON-USED TRACKERS
            '&tr=udp%3A%2F%2F10.rarbg.me%3A80%2Fannounce'+
            '&tr=udp%3A%2F%2F12.rarbg.me%3A80%2Fannounce'+
            '&tr=udp%3A%2F%2Fbt.rghost.net%3A80%2Fannounce'+
            '&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce'+
            '&tr=udp%3A%2F%2Ffr33domtracker.h33t.com%3A3310%2Fannounce'+
            '&tr=udp%3A%2F%2Ftracker.istole.it%3A80%2Fannounce'+
            '&tr=udp%3A%2F%2Ftracker.prq.to%3A80%2Fannounce'+
            '&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce'+
            '&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce'+
            '&tr=http%3A%2F%2Fpow7.com%3A80%2Fannounce'+
            */
            /* USED TRACKERS */
            '&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce'+
            '&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce'+
            '&tr=udp%3A%2F%2Ftracker.sktorrent.net%3A6969%2Fannounce'+
            '&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce'+
            '&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce'+
            '&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce'+
            '&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce'+
            '&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce'+
            '&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce';



        // trackers to search for on the individual torrent page(s).
        needleTrackers = ["http://mgtracker.org:2710/announce",
                         "http://tracker.bittorrent.am/announce",
                         "udp://tracker.pirateparty.gr:6969/announce",
                         "udp://p4p.arenabg.ch:1337/announce",
                         "udp://tracker.pirateparty.gr:6969/announce"];

        // get all the listed trackers for the particular torrent.
        haystackTrackers = document.querySelectorAll( '.trackers > dl > dt > a' );

        // if one or more of the trackers listed for this torrent is included amongst the needleTrackers, append it to the default trackers.
        for (i=0; i<haystackTrackers.length; i++)
        {
            for (j=0; j<needleTrackers.length; j++)
            {
                if (haystackTrackers[i].innerHTML == needleTrackers[j])
                {
                    trackers += '&tr=' + encodeURIComponent(haystackTrackers[i].innerHTML);
                }
            }
        }

        // read title
        title = encodeURIComponent( document.querySelector( '.downlinks > h2 > span' ).innerHTML.replace('"','') ).replace('%26amp%3B','and');
        if (title.length == 40 && title.match(/[0-9a-z]+/i) && title == hash)
        {
            var tpb, bitsno;
            tpb = document.querySelector('.downlinks a[href^="https://thepiratebay.org"] .n');
            bitsno = document.querySelector('.downlinks a[href^="http://bitsnoop.com"] .n');
            if(tpb !== null)
            {
                //if the title is equal to the hash, go for the title from TPB.
                title = encodeURIComponent(tpb.innerHTML);
            }
            else if (bitsno !== null)
            {
                title = encodeURIComponent(bitsno.innerHTML);
            }
        }
        else if (title === ''||null||undefined)
        {
            //if the title is still not valied, go for the one from katproxy.com.
            title = encodeURIComponent(document.querySelector('.downlinks a[href^="http://katproxy.com"] .n').innerHTML);
        }
        else if (title === ''||null||undefined)
        {
            //if the title is (unlikely still) not valid, just resign and set the magnet title to 'unknown torrent'.
            title = 'unknown torrent';
        }
        // add key-definition to title-value
        title = '&dn=' + title;

        // generate the magnet link
        magnet = "magnet:?xt=urn:btih:"+hash+title+trackers;

        // add downloadlink
        head = document.getElementsByTagName('head')[0];
        if (!head)
        {
            return;
        }

        GM_addStyle("#magnetlinkurlid { border:1px #4995FF solid; z-index:10000; -moz-border-radius:3px; background:#AACDFF; padding:4px 10px; display:block; position:fixed; right:10px; top:10px; font-family:Verdana; font-size:18px;");

        body = document.getElementsByTagName('body')[0];
        if (!body)
        {
            return;
        }
        style = document.createElement('div');
        style.id = 'magnetlinkurlid';
        style.innerHTML = '<a href="'+magnet+'">Download</a>';
        body.appendChild(style);
    }
}

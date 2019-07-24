// ==UserScript==
// @name         TDG
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Au revoir Abo+
// @author       You
// @match        https://www.tdg.ch/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/pookiege/OCSIN/JS/master/tdg.js
// @downloadURL  https://raw.githubusercontent.com/pookiege/OCSIN/JS/master/tdg.js
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("overlay_wrap").remove();
    clearList(document.getElementsByClassName("pub_300x250"));
    clearList(document.getElementsByClassName("ad-content-ad"));
    clearList(document.getElementsByClassName("ad-outside-right"));
//    clearList(document.getElementsByClassName("pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links banner banner-top"));
    clearList(document.getElementsByTagName("iframe"));
    clearList(document.getElementsByTagName("style"));
    document.getElementById("mainColRightPublireportage").remove();
    document.getElementById("rufous-sandbox").remove();
    document.getElementById("overlay_wrap").remove();
    clearList(document.getElementsByClassName("publireportage"));

    // Your code here...
})();

function clearList(liste)
{
    if (liste == null) return ;
    for (var i = liste.length - 1; i >= 0; --i) {
        liste[i].remove();
    }
}

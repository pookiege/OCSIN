// ==UserScript==
// @name         TDG
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Au revoir Abo+
// @author       You
// @match        https://www.tdg.ch/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/pookiege/OCSIN/master/JS/tdg.js
// @downloadURL  https://raw.githubusercontent.com/pookiege/OCSIN/master/JS/tdg.js
// ==/UserScript==

(function() {
    'use strict';
    clearList(document.getElementsByClassName("pub_300x250"));
    clearList(document.getElementsByClassName("ad-content-ad"));
    clearList(document.getElementsByClassName("ad-outside-right"));
    clearList(document.getElementsByClassName("o-tamedia-wrapper"));
    clearList(document.getElementsByTagName("iframe"));
    clearList(document.getElementsByTagName("style"));
    clearList(document.getElementsByClassName("publireportage"));
    document.getElementById("overlay_wrap").remove();
    document.getElementById("mainColRightPublireportage").remove();
    document.getElementById("rufous-sandbox").remove();
    document.getElementById("overlay_wrap").remove();
})();

function clearList(liste)
{
    if (liste == null) return ;
    for (var i = liste.length - 1; i >= 0; --i) {
        liste[i].remove();
    }
}

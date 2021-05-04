// ==UserScript==
// @name         MPM Finances
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       NTH
// @match        https://prod.etat-ge.ch/projetdessimanager/*
// @grant        none
// @updateURL    https://github.com/pookiege/OCSIN/tampermonkey/MPM.js
// @downloadURL  https://github.com/pookiege/OCSIN/tampermonkey/MPM.js
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById('skin_content').style.width = "1500px";
    document.getElementById('skin_contenu').style.width = "1300px";
    //spécifique finances
    document.getElementsByName('daCmdFac')[0].checked = true;
    document.getElementsByName('da')[0].checked = true;
    document.getElementsByName('com')[0].checked = true;
    document.getElementsByName('fact')[0].checked = true;
    document.getElementsByName('rec')[0].checked = true;
})();

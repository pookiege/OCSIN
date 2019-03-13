// ==UserScript==
// @name         MPM Finances
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       NTH
// @match        https://prod.etat-ge.ch/projetdessimanager/prestation/financeGL.php*
// @grant        none
// @updateURL    https://github.com/pookiege/OCSIN/tampermonkey/MPM.js
// @downloadURL  https://github.com/pookiege/OCSIN/tampermonkey/MPM.js
// ==/UserScript==

(function() {
    'use strict';
document.getElementsByName('daCmdFac')[0].checked = true;
document.getElementsByName('da')[0].checked = true;
document.getElementsByName('com')[0].checked = true;
document.getElementsByName('fact')[0].checked = true;
document.getElementsByName('rec')[0].checked = true;

    // Your code here...
})();

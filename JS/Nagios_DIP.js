// ==UserScript==
// @name         Nagios : que le DIP
// @namespace    https://prod.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @version      1.15
// @description  Nagios version allégée
// @author       NTH
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://raw.githubusercontent.com/pookiege/OCSIN/master/purgeNagios.js
// @require      https://raw.githubusercontent.com/pookiege/OCSIN/master/JS/dip.js
// @match        https://*.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP.js
// @downloadURL  https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP.js
// ==/UserScript==

(function() {
    GM_addStyle('.statusOK       { font-size: 12pt; }');
    GM_addStyle('.statusWARNING  { font-size: 14pt; }');
    GM_addStyle('.statusCRITICAL { font-size: 14pt; background-color: #ff6666; font-weight: bold;}');
    GM_addStyle('.statusCRITICAL p { font-size: 8pt; background-color: #ff6666; }');
    GM_addStyle('.titre { font-size: 20pt; background-color: #0000CD; color : #ffffff; border: 1px solid #777777; text-align: center; padding: 0 5 0 5; }');
    GM_addStyle('.tableRes { margin:10px; width : 100%}');
    GM_addStyle('.preview { float:right; height: 15px}');
    purgeNagios(dip);
})
();

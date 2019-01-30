// ==UserScript==
// @name         Nagios : AFC / Erreurs
// @namespace    https://prod.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @version      1.0.0
// @description  Nagios version super allégée
// @author       NTH
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://raw.githubusercontent.com/pookiege/OCSIN/master/purgeNagios.js
// @match        https://*.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_AFC_erreurs.js
// @downloadURL  https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_AFC_erreurs.js
// ==/UserScript==

(function() {
    'use strict';
    var DF = [["DF",
	["7776","Percevoir impôts, taxes et droits","Giroud Patrick (DI)","10309","10484","10485","10486","10508","10519","10571","5014","5580","5647","5659","5660","6133","6133_0001","6133_0002","6133_0003","6133_0004","6133_0005","6133_0006","6133_0007","6133_0008","6133_0009","6133_0010","6133_0011","6133_0012","6133_0014","6133_0015","6133_0016","6133_0017","6133_0018","6133_0019","6133_0020","6133_0021","6133_0023","6290","6448","6559","6899","6901","9274","9342","9782"],
	["7840","Satisfaire à ses obligations fiscales","Giroud Patrick (DI)","5646","6712","6712_0101","6712_0102","6712_0301","6712_0302","6712_0501","6712_1001","6712_1002","6712_1003","6712_1004","6712_1005","6712_1006","6712_1007","6712_1008","6712_1009","6712_1010","6712_1011","6712_1012","6712_1013","6712_1014","6712_1016","6712_1017","6712_1018","6712_1019","6712_9901","6873","9077","9202","9325","10520"]]
              ];
    // Pour convertir une image en base64 : https://websemantics.uk/tools/image-to-data-uri-converter/
    var images = ['https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif',
                 'https://media.giphy.com/media/l6c2iEKAXwHYs/giphy.gif',
                 'https://media.giphy.com/media/s2qXK8wAvkHTO/giphy.gif',
                 'https://media.giphy.com/media/XdHbUa7eL3DTW/giphy.gif',
                 'https://media.giphy.com/media/GCvktC0KFy9l6/giphy.gif',
                 'https://media.giphy.com/media/l0MYDGA3Du1hBR4xG/giphy.gif'];
                  GM_addStyle('.statusOK       { font-size: 12pt; }');
                  GM_addStyle('.statusWARNING  { font-size: 14pt; }');
                  GM_addStyle('.statusCRITICAL { font-size: 14pt; background-color: #ff6666; font-weight: bold;}');
                  GM_addStyle('.statusCRITICAL p { font-size: 8pt; background-color: #ff6666; }');
                  GM_addStyle('.titre { font-size: 20pt; background-color: #0000CD; color : #ffffff; border: 1px solid #777777; text-align: center; padding: 0 5 0 5; }');
                  GM_addStyle('.tableRes { margin:10px; width : 100%}');
                  GM_addStyle('.preview { float:right; height: 15px}');
                  GM_addStyle('.info {text-align: center ; font-size: 80pt;font-weight: bold; display: block; margin-left: auto; margin-right: auto ; padding: 30 0 50 0; color: #4444FF;  }');
                  GM_addStyle('.infoimg { display: block; margin-left: auto; margin-right: auto ;text-align: center ;padding: 0 0 0 0; height:300; border: 2px solid #4444FF;border-radius: 6px; }');
                  purgeNagiosTous(DF,images," l'AFC");
                  })
                  ();
                  

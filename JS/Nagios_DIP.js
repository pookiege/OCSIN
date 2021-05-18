// ==UserScript==
// @name         Nagios : que le DIP
// @namespace    https://prod.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @version      1.15
// @description  Nagios version allégée
// @author       NTH
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://raw.githubusercontent.com/pookiege/OCSIN/master/purgeNagios.js
// @require      https://raw.githubusercontent.com/pookiege/OCSIN/JS/master/dip.js
// @match        https://*.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP.js
// @downloadURL  https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP.js
// ==/UserScript==

(function() {
    'use strict';
    var dip = [["7780-Santé consultations et institutions OMP","9455","10565","5224","9875","10530","10506","10532","10507","10531"],
["7781-Santé à l'école","10425","9597","6701","9068","6484","10758","9624","9626","9629","9630","9631"],
["7784-Orientation Formation Professionnelle et Continue","9733","6355","6406","6069","6885","6277","6279","6129","6283","9460","9000","5310","5143","9479","10605","10328","10343","9807","9817","9818","9503","10481","9619"],
["7787-Education formation","10467","10588","10536","10535","6415_0003","6415_0002","6354","6833","6353","5182","6853","6415","5441","6587","6260","5438","6116","5490","6281","6297","6296","9649","10604","10342","10686","10537","10633","10634","10761","9329"],
["7788-Logistique DIP","6374","6272","6789","6320","9175","9335"],
["7789-Documentation scolaire","9674","9600","9599","9602","9603","9604","6314","6480","10709","9434","9578","9762"],
["7790-Prestations d’Etat-major et de moyens du DIP","5176","6702","6381","6395","6098","6616","10540","10539","6143","6300","6789","9038","10575","9328","9617"],
["7815-Pédagogique","6828","5472","6756","10538","9365","10582","10583","10584","10372","10370","9481","10603","9464","9497","10407","10414","10396","10412","10408","10394","10406","10421","10402","10393","10404","10397","10399","10420","10398","10405","10401","10415","10418","10391","10395","10410","10422","10403","10400","10413","10419","10670","10668","10671","10669","10464","10502","10499","10500","10501","10504","10498","9727"],
["7844-Social jeunesse","10663","9838","5436","6449","5330","9837","9836","9618","9620","9622","9621","9623","9625","9627","9628"],
["7845-Recherches et Statistiques Instruction Publique","6356","6062","9009","9512","10545","9763","9765","9766","9767","9347","10559"]];

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

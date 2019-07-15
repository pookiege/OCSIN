// ==UserScript==
// @name         Nagios : DIP / Erreurs
// @namespace    https://prod.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @version      1.1.23
// @description  Nagios version super allégée
// @author       NTH
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://raw.githubusercontent.com/pookiege/OCSIN/master/JS/purgeNagios2.js
// @match        https://*.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP_erreurs.js
// @downloadURL  https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP_erreurs.js
// ==/UserScript==

(function() {
    'use strict';
    var dip = [["7780 - OMP","9455","9875","10506","10507","10530","10532","5224","10531"],
               ["7781 - Santé à l'école","10425","5436","6449","6484","6701","6775","9068","9266","9597","9618","9620","9621","9622","9623","9624","9625","9626","9627","9628","9629","9630","9631","9836","9837","9838"],
               ["7783 - Sport loisirs","10539","10540"],
               ["7784 - Orientation Formation Professionnelle et Continue","10328","10343","10481","5143","5310","6069","6129","6277","6279","6283","6355","6406","6885","9000","9460","9479","9503","9619","9733","9770","9817","9818"],
               ["7786 - Sites Internet du pédagogique","10370","10372","10391","10392","10393","10394","10395","10396","10397","10398","10399","10400","10401","10402","10403","10404","10405","10406","10407","10408","10409","10410","10411","10412","10413","10414","10415","10416","10417","10418","10419","10420","10421","10422","10497","10498","10499","10500","10500","10502","10504","5472","6458","6495","6756","6828","9102","9365","9464","9481","10464","10503","10538"],
               ["7787 - Education formation","10342","5182","5438","5441","5490","6116","6260","6281","6296","6297","6353","6354","6415","6415_0002","6415_0003","6587","6833","6853","9150","9329","9347","9649","10535","10536","10537"],
               ["7788 - Logistique DIP","6141","6272","6320","6374","6789","9175","9335","9465"],
               ["7789 - Documentation scolaire","6314","6480","9434","9578","9599","9600","9602","9603","9604","9674","9762"],
               ["7790 - Prestations d’Etat-major et de moyens du DIP","5176","6062","6143","6300","6356","9009","9328","9512","9617","9763","9765","9766","9767"],
               ["7815 - Pédagogique","9497","9727"]
              ];

    // Pour convertir une image en base64 : https://websemantics.uk/tools/image-to-data-uri-converter/
    // Pour convertir un webp en gif (giphy par exemple) : https://www.aconvert.com/image/webp-to-gif/
 var images = ['https://raw.githubusercontent.com/pookiege/OCSIN/master/images/minions.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/confettis.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/belair.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/barney.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/deadpool.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/boyle.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/terry.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/loop.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/cacatoes.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/thumb_up.gif',
               'https://raw.githubusercontent.com/pookiege/OCSIN/master/images/hathaway.gif'];
    GM_addStyle('.statusOK       { font-size: 12pt; }');
    GM_addStyle('.statusWARNING  { font-size: 14pt; }');
    GM_addStyle('.statusCRITICAL { font-size: 40pt; background-color: #ff6666; color : #000000; font-weight: bold;}');
    GM_addStyle('.statusCRITICAL p { font-size: 8pt; background-color: #ff6666; }');
    GM_addStyle('.titre { font-size: 20pt; background-color: #0000CD; color : #ffffff; border: 1px solid #777777; text-align: center; padding: 0 5 0 5; }');
    GM_addStyle('.tableRes { margin:10px; width : 100%}');
    GM_addStyle('.preview { float:right; height: 15px}');
    GM_addStyle('.info { font-size: 80pt;font-weight: bold; display: block; margin-left: auto; margin-right: auto ; padding: 30 0 50 50; color: #4444FF;  }');
    GM_addStyle('.infoimg { position:fixed; bottom:50; left: 50%; transform: translate(-50%, 0); height:500; border: 1px solid #4444FF;border-radius: 6px; }');
    GM_addStyle('.CDS { width:00%; height:133%; position:fixed; right:0; top:0; zoom: 0.75; -moz-transform: scale(0.75); -moz-transform-origin: top right;  }');
    GM_addStyle('.divSF {width:100%; height:100%; position:fixed; left:0; top:0} ');

    //GM_addStyle('preloader {    position: fixed;    top: 0;    left: 0;    width: 100%;    height: 100%; z-index:99999; background-color: #222;}');
    //GM_addStyle('loader {    display: block;    position: relative;    left: 50%;    top: 50%;    width: 150px;    height: 150px;    margin: -75px 0 0 -75px;    border-radius: 50%;    border: 3px solid transparent;    border-top-color: #9370DB;    -webkit-animation: spin 2s linear infinite;    animation: spin 2s linear infinite;}');
    //GM_addStyle('loader:before {    content: "";    position: absolute;    top: 5px;    left: 5px;    right: 5px;    bottom: 5px;    border-radius: 50%;    border: 3px solid transparent;    border-top-color: #BA55D3;    -webkit-animation: spin 3s linear infinite;    animation: spin 3s linear infinite;}');
    //GM_addStyle('loader:after {    content: "";    position: absolute;    top: 15px;   left: 15px;   right: 15px;   bottom: 15px;   border-radius: 50%;    border: 3px solid transparent;    border-top-color: #FF00FF;    -webkit-animation: spin 1.5s linear infinite;    animation: spin 1.5s linear infinite;}');
    //GM_addStyle('@-webkit-keyframes spin {    0%   {        -webkit-transform: rotate(0deg);        -ms-transform: rotate(0deg);        transform: rotate(0deg);    }    100% {        -webkit-transform: rotate(360deg);        -ms-transform: rotate(360deg);        transform: rotate(360deg);    }}');
    //GM_addStyle('@keyframes spin {    0%   {        -webkit-transform: rotate(0deg);        -ms-transform: rotate(0deg);        transform: rotate(0deg);    }    100% {        -webkit-transform: rotate(360deg);        -ms-transform: rotate(360deg);        transform: rotate(360deg);    }}');

    //Loader
    //var preloader = document.createElement('DIV');
    //preloader.id='preloader';
    //var loader = document.createElement('DIV');
    //loader.id='loader';
    //preloader.appendChild(loader);
    //document.body.appendChild(preloader);
    //Dès que Nagios a fini de se charger, lancer le script de purge
    $(document).ready(function(){
purgeNagios2(dip,images);
});
    })
();

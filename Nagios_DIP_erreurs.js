// ==UserScript==
// @name         Nagios : DIP / Erreurs
// @namespace    https://prod.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @version      1.1.28
// @description  Nagios version super allégée
// @author       NTH
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://raw.githubusercontent.com/pookiege/OCSIN/master/tampermonkey/purgeNagios.js
// @match        https://*.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP_erreurs.js
// @downloadURL  https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP_erreurs.js
// ==/UserScript==

(function() {
    'use strict';
    var dip = [["7780 - OMP","10530","10835","10565","5224","10532","10531","9455","10507","10506","9875","10838","10835"],
               ["7781 - Santé à l'école","9629","9597","6701","9068","9631","10836","10758","10425","9624","9630"],
               ["7783 - Sport loisirs","10539","10540"],
               ["7784 - Orientation Formation Professionnelle et Continue","6277","9503","9460","6279","6885","6283","5143","6129","6069","6355","9733","9619","9817","9818","10328","10343","9479","10481","10605","9807","5310","6406"],
               ["7786 - Sites Internet du pédagogique","10370","10372","10391","10392","10393","10394","10395","10396","10397","10398","10399","10400","10401","10402","10403","10404","10405","10406","10407","10408","10409","10410","10411","10412","10413","10414","10415","10416","10417","10418","10419","10420","10421","10422","10497","10498","10499","10500","10500","10502","10504","5472","6458","6495","6756","6828","9102","9365","9464","9481","10464","10503","10538"],
               ["7787 - Education Formation","5490","5182","9329","6415","6833","6116","5438","5441","6098","9649","6281","6354","6297","6587","6853","6296","10649","10761","10467","10686","10604","10634","10633","10588","10537","10536","10535","6260","10342","6353"],
               ["7788 - Logistique DIP","6320","6374","6272","6789","9335","9175"],
               ["7789 - Documentation scolaire","9604","10709","9434","9762","9600","6480","10819","9674","9599","9602","6314","9578","9603"],
               ["7790 - Prestations d’Etat-major et de moyens du DIP","5176","6062","6143","6300","6356","9009","9328","9512","9617","9763","9765","9766","9767"],
               ["7815 - Pédagogique","9497","9727","10670","10669","10668","10671","10464","6828","9481","9464","9365","6756","5472","10584","10583","10582","10504","10502","10501","10500","10499","10422","10421","10420","10419","10418","10415","10414","10413","10412","10410","10408","10407","10406","10405","10404","10403","10402","10401","10400","10399","10398","10397","10396","10395","10394","10393","10391","10372","10370","10603"],
               ["7844 - Social jeunesse","5436","10663","9618","9838","9627","9625","9837","9628","9836","9623","10837"]
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

    $(document).ready(function(){
purgeNagios(dip,images);
});
    })
();

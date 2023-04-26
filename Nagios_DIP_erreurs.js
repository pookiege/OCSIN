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
    var dip = [["10403 - Parcours et évaluations scolaires","10604","10605","10634","11140","11190","5441","6116","6260","6415","6587","6833","6853","9329"],
["10467 - Enseignement Obligatoire","10342","10535","10536","10537","11168","5438","6098","6296","6297"],
["7780 - Santé consultations et institutions OMP","10506","10507","10530","10532","10565","10835","10838","10915","11076","11185","9455","9875"],
["7781 - Santé à l'école","10425","10758","10836","10881","10906","11187","9068","9597","9624"],
["7784 - Orientation Formation Professionnelle et Continue","10328","10343","10974","11238","5143","5310","6069","6129","6279","6355","6406","6885","9460","9479","9503","9619","9733","9807","9817","9818"],
["7787 - Enseignement Secondaire II","10467","10588","10633","10686","10761","10825","10827","10935","10936","10980","10981","11010","9649"],
["7788 - Logistique DIP","11057","6320","6374","9175","9335"],
["7789 - Documentation scolaire","10709","10819","6480","9434","9578","9599","9600","9602","9603","9604","9674","9687","9762"],
["7790 - Prestations d'Etat-major et de moyens du DIP","10545","10649","10705","10706","10979","11001","11032","11033","6143","9328","9617"],
["7815 - Pédagogique","10370","10372","10391","10393","10394","10396","10400","10403","10418","10603","10668","10669","10670","10671","10892","10894","10895","11067","11068","11091","11143","5472","6458","6756","6828","9365","9464","9481","9497","9727"],
["7844 - Social jeunesse","10540","10663","10837","10956","11180","6701","9618","9627","9629","9836","9837","9838"],
["7845 - Recherches et Statistiques Instruction Publique","10531","10559","10575","10859","10955","11003","6062","6300","6314","6356","6789","9009","9512","9763","9765","9766","9767"]
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

// ==UserScript==
// @name         Nagios : que le DIP V2
// @namespace    https://prod.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @version      1.03
// @description  try to take over the world!
// @author       NTH
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @match        https://prod.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP.js
// @downloadURL  https://raw.githubusercontent.com/pookiege/OCSIN/master/Nagios_DIP.js
// ==/UserScript==

(function() {
    'use strict';
    var dip = [["7780 - OMP","9455","9875","10506","10507","10530","10532","5224","10531"],
               ["7781 - Santé à l'école","10425","5436","6449","6484","6701","6775","9068","9266","9597","9618","9620","9621","9622","9623","9624","9625","9626","9627","9628","9629","9630","9631","9836","9837","9838"],
               ["7783 - Sport loisirs","10480","10487","10539","10540","6066","6376","6487","9379"],
               ["7784 - Orientation Formation Professionnelle et Continue","10328","10343","10481","5143","5310","6069","6129","6277","6279","6283","6355","6406","6885","9000","9460","9479","9503","9619","9733","9770","9817","9818"],
               ["7786 - Sites Internet du pédagogique","10370","10372","10391","10392","10393","10394","10395","10396","10397","10398","10399","10400","10401","10402","10403","10404","10405","10406","10407","10408","10409","10410","10411","10412","10413","10414","10415","10416","10417","10418","10419","10420","10421","10422","10497","10498","10499","10500","10500","10502","10504","5472","6458","6495","6756","6828","9102","9365","9464","9481","10464","10503","10538"],
               ["7787 - Education formation","10342","5182","5438","5441","5490","6116","6260","6281","6296","6297","6353","6354","6415","6415_0002","6415_0003","6587","6828","6833","6853","9150","9329","9347","9649","10535","10536","10537"],
               ["7788 - Logistique DIP","6141","6272","6320","6374","6789","9175","9335","9465"],
               ["7789 - Documentation scolaire","5472","6314","6480","9434","9578","9599","9600","9602","9603","9604","9674","9762"],
               ["7790 - Prestations d’Etat-major et de moyens du DIP","5176","6062","6143","6300","6356","9009","9328","9512","9617","9763","9765","9766","9767"],
               ["7815 - Pédagogique","9497","9727"]
              ];
    var resultat =[];
    var nbColonnes = 6;
    //on vire le haut, superflu
    document.getElementsByClassName('headertable')[0].remove();
    document.getElementsByClassName('pageTitle')[0].remove();
    document.getElementById('pagelimit').remove();
    document.getElementsByClassName('itemTotalsTitle')[0].remove();
    GM_addStyle('.statusOK       { font-size: 10pt; }');
    GM_addStyle('.statusWARNING  { font-size: 12pt; }');
    GM_addStyle('.statusCRITICAL { font-size: 12pt; background-color: #ff6666; font-weight: bold;}');
    GM_addStyle('.statusCRITICAL p { font-size: 8pt; background-color: #ff6666; }');
    GM_addStyle('.titre { font-size: 16pt; background-color: #FFA07A; color : #ffffff; border: 1px solid #777777; text-align: center; padding: 0 5 0 5; }');
    GM_addStyle('.tableRes { margin:10px; width : 100%}');
    GM_addStyle('.preview { padding-left: 20px; height: 15px}');

    var compteur=0;
    var maTable = document.getElementsByTagName('table')[0];
    for (compteur=0;compteur<maTable.rows.length;compteur++) {
        //on parcourt les lignes du tableau
        //pour chaque ligne il y a plusieurs cellules

        if (maTable.rows[compteur].cells[1].getElementsByTagName('tr').length >0)
        {
            //on est bien sur le nom
            var libelle = maTable.rows[compteur].cells[1].getElementsByTagName('a')[0].innerHTML;

            var found=false;
            for (var x=0;x<dip.length;x++)
            {
                for (var y=1;y<dip[x].length;y++)
                {
                    if (!found && libelle.indexOf("_prd_")>=0 && libelle.indexOf(dip[x][y])>=0)
                    {
                        found = true;
                        var temp = libelle.split("_");
                        var lienImage = "";
                        var lienPopup = "";
                        if(maTable.rows[compteur].cells[1].getElementsByTagName('a').length>2){
                            lienImage=maTable.rows[compteur].cells[1].getElementsByTagName('a')[2].href;
                            lienPopup=maTable.rows[compteur].cells[1].getElementsByTagName('a')[2].rel;
                        }
                        var appli = {code : temp[2],
                                     sequence : temp[3],
                                     name : temp[4],
                                     lien :  maTable.rows[compteur].cells[1].getElementsByTagName('a')[0].href,
                                     image : lienImage,
                                     popup : lienPopup,
                                     status: maTable.rows[compteur].cells[2].className,
                                     information :  maTable.rows[compteur].cells[6].innerHTML.replace(/&nbsp;/gi,'')};
                        resultat.push(appli);
                    }
                }
            }
        }
    }
    maTable.remove();
    for (x=0;x<dip.length;x++)
    {
        //On parcourt les SF du tableau DIP
        var table = document.createElement('table');
        table.className='tableRes';
        var tableBody = document.createElement('tbody');
        var colonne = 0;
        var row = document.createElement('tr');
        //On rajoute l'entête
        var cell = document.createElement('td');
        cell.colSpan =nbColonnes;
        cell.innerHTML = dip[x][0];
        cell.className = 'titre';
        row.appendChild(cell);
        tableBody.appendChild(row);
        row = document.createElement('tr');
        for (y=1;y<dip[x].length;y++)
        {
            //Pour chaque appli du SF on cherche
            found=false;
            for (var a=0;a<resultat.length ;a++)
            {
                var sonde ;
                found=false;
                if ( resultat[a].code.indexOf(dip[x][y])>=0)
                {
                    sonde = resultat[a];
                    found=true;
                }
                if (found)
                {
                    cell = document.createElement('td');
                    var lien = document.createElement('a');
                    lien.innerHTML = sonde.code + " - <i>" +sonde.name + "</i>";
                    if (sonde.status != 'statusOK')
                    {
                        lien.innerHTML += '<p>' + sonde.information + '</p>';
                    }
                    lien.href=sonde.lien;
                    lien.title = sonde.information;
                    cell.className = sonde.status;
                    cell.appendChild(lien);
                    row.appendChild(cell);
                    if(sonde.image.length>0)
                    {
                        lien = document.createElement('a');
                        var pict = document.createElement('img');
                        pict.src = "https://prod.etat-ge.ch/ctipilotage-srv/images/action.gif";
                        lien.className = "tips";
                        lien.rel=sonde.popup;
                        pict.className = "preview";
                        lien.href=sonde.image;
                        lien.appendChild(pict);
                        cell.appendChild(lien);
                        row.appendChild(cell);
                    }
                    colonne+=1;
                    if (colonne==nbColonnes)
                    {
                        tableBody.appendChild(row);
                        row = document.createElement('tr');
                        colonne=0;
                    }
                }
            }
        }
        tableBody.appendChild(row);
        table.appendChild(tableBody);
        document.body.appendChild(table);
    }
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);jQuery(document).ready(function() { jQuery('a.tips').cluetip({ajaxCache: false, dropShadow: false,showTitle: false });});";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);

})
();

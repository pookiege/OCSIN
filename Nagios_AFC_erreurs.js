// ==UserScript==
// @name         Nagios : AFC / Erreurs
// @namespace    https://prod.etat-ge.ch/ctipilotage-srv/cgi-bin/status.cgi?host=monitoring_dispo&limit=0
// @version      1.0.1
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
	["7776","Percevoir impôts, taxes et droits","Giroud Patrick (DI)","10484","10485","10486","10508","10519","10571","5014","5580","5647","5659","5660","6133","6133_0001","6133_0002","6133_0003","6133_0004","6133_0005","6133_0006","6133_0007","6133_0008","6133_0009","6133_0010","6133_0011","6133_0012","6133_0014","6133_0015","6133_0016","6133_0017","6133_0018","6133_0019","6133_0020","6133_0021","6133_0023","6290","6448","6559","6899","6901","9274","9342","9782"],
	["7840","Satisfaire à ses obligations fiscales","Giroud Patrick (DI)","5646","6712","6712_0101","6712_0102","6712_0301","6712_0302","6712_0501","6712_1001","6712_1002","6712_1003","6712_1004","6712_1005","6712_1006","6712_1007","6712_1008","6712_1009","6712_1010","6712_1011","6712_1012","6712_1013","6712_1014","6712_1016","6712_1017","6712_1018","6712_1019","6712_9901","6873","9077","9202","9325","10520"]]
              ];
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
                  GM_addStyle('.titre2 { font-size: 16pt; background-color: #8B008B; color : #ffffff; border: 1px solid #777777; text-align: center; padding: 0 1 0 1; }');
                  GM_addStyle('.tableRes { margin:10px; width : 100%}');
                  GM_addStyle('.tableSF  { width: 100%}');
                  GM_addStyle('.preview { float:right; height: 15px}');
                  GM_addStyle('.info {text-align: center ; font-size: 80pt;font-weight: bold; display: block; margin-left: auto; margin-right: auto ; padding: 30 0 50 0; color: #4444FF;  }');
                  GM_addStyle('.infoimg { display: block; margin-left: auto; margin-right: auto ;text-align: center ;padding: 0 0 0 0; height:300; border: 2px solid #4444FF;border-radius: 6px; }');
                  purgeNagiosTous(DF,images," l'AFC");
                  })
                  ();
  function purgeNagiosTous(SCLI,images,infoService){
    var resultat =[];
    var nbColonnes = 6;
    //on vire le haut, superflu
    document.getElementsByClassName('headertable')[0].remove();
    document.getElementsByClassName('pageTitle')[0].remove();
    document.getElementById('pagelimit').remove();
    document.getElementsByClassName('itemTotalsTitle')[0].remove();
    var compteur=0;
    var maTable = document.getElementsByTagName('table')[0];
    var found=false;
    var toutBaigne = true;

    for (compteur=0;compteur<maTable.rows.length;compteur++) {
        //on parcourt les lignes du tableau
        //pour chaque ligne il y a plusieurs cellules

        if (maTable.rows[compteur].cells[1].getElementsByTagName('tr').length >0)
        {
            //on est bien sur le nom
            var libelle = maTable.rows[compteur].cells[1].getElementsByTagName('a')[0].innerHTML;

            found=false;
            for (var serv=0;serv<SCLI.length;serv++)
            {
                for (var x=1;x<SCLI[serv].length;x++)
                {
                    for (var sf=1;sf<SCLI[serv][x].length;sf++)
                    {
                        if (!found && libelle.indexOf("_prd_")>=0 && libelle.indexOf(SCLI[serv][x][sf])>=0)
                        {
                            found = true;
                            var temp = libelle.split("_");
                            var lienImage = "";
                            var lienPopup = "";
                            if(maTable.rows[compteur].cells[1].getElementsByTagName('a').length>2){
                                lienImage=maTable.rows[compteur].cells[1].getElementsByTagName('a')[2].href;
                                lienPopup=maTable.rows[compteur].cells[1].getElementsByTagName('a')[2].rel;
                            }
                            var appli = {serv : SCLI[serv][0],
                                         code : temp[2],
                                         sequence : temp[3],
                                         name : temp[4],
                                         lien :  maTable.rows[compteur].cells[1].getElementsByTagName('a')[0].href,
                                         image : lienImage,
                                         popup : lienPopup,
                                         status: maTable.rows[compteur].cells[2].className,
                                         information :  maTable.rows[compteur].cells[6].innerHTML.replace(/&nbsp;/gi,'')};
                            if (appli.status != 'statusOK')
                            {
                                resultat.push(appli);
                            }
                        }
                    }
                }
            }
        }
    }
    maTable.remove();
    var foundPourSF=false;
    var foundPourServ = false;
    //On attaque l'affichage customisé
    for (serv=0;serv<SCLI.length;serv++)
    {
        foundPourServ = false;
        var tableServ = document.createElement('table');
        tableServ.className='tableRes';
        var tableBodyServ = document.createElement('tbody');
        var colonne = 0;
        var rowServ = document.createElement('tr');
        //On rajoute l'entête
        var cell = document.createElement('td');
        cell.colSpan =nbColonnes;
        //Création du container
        cell.innerHTML = "<b>"+SCLI[serv][0] + "</b> ";
        cell.className = 'titre';
        rowServ.appendChild(cell);
        tableBodyServ.appendChild(rowServ);
        rowServ = document.createElement('tr');
        for (x=1;x<SCLI[serv].length;x++)
        {
            //On parcourt les SF du tableau DIP
            foundPourSF=false;
            var table = document.createElement('table');
            table.className='tableSF';
            colonne = 0;
            var tableBody = document.createElement('tbody');
            var rowTitre = document.createElement('tr');
            //On rajoute l'entête
            cell = document.createElement('td');
            cell.colSpan =nbColonnes;
            //Création du container
            cell.innerHTML = SCLI[serv][x][0] + "-" + SCLI[serv][x][1] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>" + SCLI[serv][x][2];
            cell.className = 'titre2';
            rowTitre.appendChild(cell);
            tableBody.appendChild(rowTitre);
            var row = document.createElement('tr');
            for (var y=1;y<SCLI[serv][x].length;y++)
            {
                //Pour chaque appli du SF on cherche
                found=false;
                for (var a=0;a<resultat.length ;a++)
                {
                    var sonde ;
                    found=false;
                    //alert("xxx - "+SCLI[serv][x][y]);
                    if ( resultat[a].code.indexOf(SCLI[serv][x][y])>=0)
                    {
                        sonde = resultat[a];
                        found=true;
                    }
                    if (found)
                    {
                        cell = document.createElement('td');
                        var lien = document.createElement('a');
                        lien.innerHTML = sonde.code + " - <i>" +sonde.name + "</i>";
                        if (sonde.status != 'statusOK') // a optimiser puisque toujours vrai
                        {
                            lien.innerHTML += '<p>' + sonde.information + '</p>';
                            foundPourSF = true;
                            toutBaigne = false;
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
            if (foundPourSF)
            {
                cell = document.createElement('td');
                cell.colSpan =nbColonnes;
                cell.appendChild(table);
                rowServ.appendChild(cell);
                tableBodyServ.appendChild(rowServ);
                rowServ = document.createElement('tr');
                foundPourServ=true;
            }
        }
        if (foundPourServ)
        {
            tableServ.appendChild(tableBodyServ);
            document.body.appendChild(tableServ);
        }
    }
    var info;
    if (toutBaigne)
    {
        info = document.createElement('DIV');
        info.className='info';
        info.innerHTML='Tout est OK pour '+infoService;
        document.body.appendChild(info);
        var minions = document.createElement('img');
        minions.src=images[Math.floor(Math.random()*images.length)];
        minions.className='infoimg';
        document.body.appendChild(minions);
    }
    else
    {
        info = document.createElement('DIV');
        info.className='info';
        document.body.appendChild(info);
        var gyro = document.createElement('img');
	gyro.src="https://media.giphy.com/media/3o6gbcjYiGrpaLXy7K/giphy.gif";
        gyro.src="https://media.giphy.com/media/CzlpZQRcd5Wjm/giphy.gif";
        gyro.className='infoimg';
        document.body.appendChild(gyro);
    }
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);jQuery(document).ready(function() { jQuery('a.tips').cluetip({ajaxCache: false, dropShadow: false,showTitle: false });});";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

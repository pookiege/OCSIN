function purgeNagios3(SCLI,images){
    var resultat =[];
    var nbColonnes = 2;
    //on vire le haut, superflu
    document.getElementsByClassName('headertable')[0].remove();
    document.getElementsByClassName('pageTitle')[0].remove();
    document.getElementById('pagelimit').remove();
    document.getElementsByClassName('itemTotalsTitle')[0].remove();
    document.getElementById('cluetip').remove();
    document.getElementById('cluetip-waitimage').remove();
    document.getElementsByTagName('br')[0].remove();
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
            for (var x=0;x<SCLI.length;x++)
            {
                for (var y=1;y<SCLI[x].length;y++)
                {
                    if (!found && libelle.indexOf("_prd_")>=0 && libelle.indexOf(SCLI[x][y])>=0)
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
                        if(appli.status != 'statusOK')
			{
				resultat.push(appli);
			}
                    }
                }
            }
        }
    }
    maTable.remove();
    var div = document.createElement('div');
    div.className='divSF';
    var foundPourSF=false;
    //On attaque l'affichage customisé
    for (x=0;x<SCLI.length;x++)
    {
        //On parcourt les SF du tableau DIP
        foundPourSF=false;
        var table = document.createElement('table');
        table.className='tableRes';
        var tableBody = document.createElement('tbody');
        var colonne = 0;
        var row = document.createElement('tr');
        //On rajoute l'entête
        var cell = document.createElement('td');
        cell.colSpan =nbColonnes;
        cell.innerHTML = SCLI[x][0];
        cell.className = 'titre';
        row.appendChild(cell);
        tableBody.appendChild(row);
        row = document.createElement('tr');
        for (y=1;y<SCLI[x].length;y++)
        {
            //Pour chaque appli du SF on cherche
            found=false;
            for (var a=0;a<resultat.length ;a++)
            {
                var sonde ;
                found=false;
                if ( resultat[a].code.indexOf(SCLI[x][y])>=0)
                {
                    sonde = resultat[a];
                    found=true;
                }
                if (found)
                {
                    cell = document.createElement('td');
                    var lien = document.createElement('a');
                    lien.innerHTML = sonde.code + " - <i>" +sonde.name + "</i>";
                    if (sonde.status != 'statusOK' && sonde.status != 'statusPENDING')
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
            div.appendChild(table);
        }
    }

    if (toutBaigne)
    {
      GM_addStyle('body,html {height: 98%}');
      GM_addStyle('.w3-display-container {position:relative; }');
      GM_addStyle('.w3-animate-opacity {}');
      GM_addStyle('.w3-text-white {color:#fff!important; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}');
      GM_addStyle('.w3-display-middle {position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)}');
      GM_addStyle('.w3-jumbo {font-size:64px!important; display:inline; }');
      GM_addStyle('.w3-animate-top {position:relative;animation:animatetop 0.8s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}');
      GM_addStyle('.w3-animate-right{position:relative;animation:animateright 0.8s}@keyframes animateright{from{right:-300px;opacity:0} to{right:0;opacity:1}}');
        var meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.content = 'width=device-width, initial-scale=1';
        document.getElementsByTagName('head')[0].appendChild(meta);
        var link2 = document.createElement('style');
        link2.setAttribute('id', 'bgimg');
        link2.innerHTML = ".bgimg {min-height: 100%;  background-position: center;  background-size: cover; background-image: url('" +images[Math.floor(Math.random()*images.length)] + "');}";
        document.getElementsByTagName('head')[0].appendChild(link2);
        var info = document.createElement('DIV');
        info.className='bgimg w3-display-container w3-animate-opacity w3-text-white';
        var info2 = document.createElement('DIV');
        info2.className='w3-display-middle';
        var h1 = document.createElement('h1');
        h1.className='w3-jumbo w3-animate-top';
        h1.innerHTML='Tout est OK pour le ';
        info2.appendChild(h1);
	var h2 = document.createElement('h1');
        h2.className='w3-jumbo w3-animate-right';
        h2.innerHTML='DIP';
        info2.appendChild(h2);
	
        info.appendChild(info2);
        document.body.appendChild(info);
    }
    else
    {
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
      var info3 = document.createElement('DIV');
      info3.className='info';
      document.body.appendChild(info3);
      var gyro = document.createElement('img');
      gyro.src="https://raw.githubusercontent.com/pookiege/OCSIN/master/images/gyro.gif"
      gyro.className='infoimg';
      div.appendChild(gyro);
     document.body.appendChild(div);
    }

    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);jQuery(document).ready(function() { jQuery('a.tips').cluetip({ajaxCache: false, dropShadow: false,showTitle: false });});";
        document.getElementsByTagName('head')[0].appendChild(script);
    }, false);
    document.getElementsByTagName('head')[0].appendChild(script);
}

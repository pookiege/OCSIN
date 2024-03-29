function purgeNagios2(SCLI,images){
    var resultat =[];
    var nbColonnes = 2;
    //on vire le haut, superflu
    if(document.getElementsByClassName('headertable') != null) document.getElementsByClassName('headertable')[0].remove();
    if(document.getElementsByClassName('serviceTotals') != null) {
        while (document.getElementsByClassName('serviceTotals').length>0){
        document.getElementsByClassName('serviceTotals')[0].remove();}}
    if(document.getElementsByClassName('pageTitle') != null) document.getElementsByClassName('pageTitle')[0].remove();
    //if(document.getElementsByClassName('statusTitle') != null) document.getElementsByClassName('statusTitle').remove();

    if(document.getElementById('pagelimit') != null) document.getElementById('pagelimit').remove();
    if(document.getElementById('result_limit') != null) document.getElementById('result_limit').remove();
    if(document.getElementsByClassName('itemTotalsTitle') != null) document.getElementsByClassName('itemTotalsTitle')[0].remove();
    //if (document.getElementsByTagName('br') != null) document.getElementsByTagName('br').remove();
    var compteur=0;
    var maTable = document.getElementsByTagName('table')[0];
    var found=false;
    var toutBaigne = true;
    for (compteur=1;compteur<maTable.rows.length;compteur++) {
        //on parcourt les lignes du tableau
        //pour chaque ligne il y a plusieurs cellules

        if (maTable.rows[compteur].cells != null && maTable.rows[compteur].cells.length>0 && maTable.rows[compteur].cells[1] != null && maTable.rows[compteur].cells[1].getElementsByTagName('tr').length >0)
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
        var info = document.createElement('DIV');
        info.className='info';
        info.innerHTML='Tout est OK pour le DIP';
        document.body.appendChild(info);
        var minions = document.createElement('img');
        minions.src=images[Math.floor(Math.random()*images.length)];
        minions.className='infoimg';
        div.appendChild(minions);
    }
    else
    {
      var info2 = document.createElement('DIV');
      info2.className='info';
      document.body.appendChild(info2);
      var gyro = document.createElement('img');
      gyro.src="https://raw.githubusercontent.com/pookiege/OCSIN/master/images/gyro.gif"
      gyro.className='infoimg';
      div.appendChild(gyro);
    }

    document.body.appendChild(div);

    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);jQuery(document).ready(function() { jQuery('a.tips').cluetip({ajaxCache: false, dropShadow: false,showTitle: false });});";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

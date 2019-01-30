function purgeNagios(scli){
    var resultat =[];
    var nbColonnes = 6;
    //on vire le haut, superflu
    document.getElementsByClassName('headertable')[0].remove();
    document.getElementsByClassName('pageTitle')[0].remove();
    document.getElementById('pagelimit').remove();
    document.getElementsByClassName('itemTotalsTitle')[0].remove();
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
            for (var x=0;x<scli.length;x++)
            {
                for (var y=1;y<scli[x].length;y++)
                {
                    if (!found && libelle.indexOf("_prd_")>=0 && libelle.indexOf(scli[x][y])>=0)
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
    for (x=0;x<scli.length;x++)
    {
        //On parcourt les SF du tableau scli
        var table = document.createElement('table');
        table.className='tableRes';
        var tableBody = document.createElement('tbody');
        var colonne = 0;
        var row = document.createElement('tr');
        //On rajoute l'entête
        var cell = document.createElement('td');
        cell.colSpan =nbColonnes;
        cell.innerHTML = scli[x][0];
        cell.className = 'titre';
        row.appendChild(cell);
        tableBody.appendChild(row);
        row = document.createElement('tr');
        for (y=1;y<scli[x].length;y++)
        {
            //Pour chaque appli du SF on cherche
            found=false;
            for (var a=0;a<resultat.length ;a++)
            {
                var sonde ;
                found=false;
                if ( resultat[a].code.indexOf(scli[x][y])>=0)
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
}

function purgeNagios2(SCLI,images){
    var resultat =[];
    var nbColonnes = 2;
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
                    if (sonde.status != 'statusOK')
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
            document.body.appendChild(table);
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
        document.body.appendChild(minions);
    }
    else
    {
      var info = document.createElement('DIV');
      info.className='info';
      document.body.appendChild(info);
      var gyro = document.createElement('img');
      gyro.src="https://media.giphy.com/media/3o6gbcjYiGrpaLXy7K/giphy.gif"
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

function purgeNagiosTous(SCLI,images,infoService){
                  var resultat =[];
    var nbColonnes = 2;
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
                //alert(serv + " - " + SCLI[serv][0]);
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
    //On attaque l'affichage customisé
    for (serv=0;serv<SCLI.length;serv++)
    {
        for (x=1;x<SCLI[serv].length;x++)
        {
            //alert("Service:"+serv+" - "+SCLI[serv][x]);
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
            cell.innerHTML = SCLI[serv][x][0];
            cell.className = 'titre';
            row.appendChild(cell);
            tableBody.appendChild(row);
            row = document.createElement('tr');
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
                        if (sonde.status != 'statusOK')
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
                document.body.appendChild(table);
            }
        }
    }
    var info;
    if (toutBaigne)
    {
        info = document.createElement('DIV');
        info.className='info';
        info.innerHTML=' \o/ Tout est OK pour ' + infoService;
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
        gyro.src="https://media.giphy.com/media/3o6gbcjYiGrpaLXy7K/giphy.gif"
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

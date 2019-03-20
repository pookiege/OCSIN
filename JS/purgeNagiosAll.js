function purgeNagiosTous(SCLI,images){
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
        var compteurSF =0;
        foundPourServ = false;
        var tableServ = document.createElement('table');
        tableServ.className='tableRes';
        var tableBodyServ = document.createElement('tbody');
        var colonne = 0;
        var rowServ = document.createElement('tr');
        //On rajoute l'entête
        var cell = document.createElement('td');
        cell.rowSpan =999;
        //Création du container
        cell.innerHTML = "<b>"+SCLI[serv][0] + "</b> ";
        cell.className = 'titre';
        rowServ.appendChild(cell);
        tableBodyServ.appendChild(rowServ);
        //rowServ = document.createElement('tr');
        for (x=1;x<SCLI[serv].length;x++)
        {
            //On parcourt les SF du tableau DIP
            foundPourSF=false;
            var tableSF = document.createElement('table');
            tableSF.className='tableSF';
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
                            //lien.innerHTML += '<p>' + sonde.information + '</p>';
                            foundPourSF = true;
                            toutBaigne = false;
                        }
                        lien.href=sonde.lien;
                        lien.title = sonde.information;
                        cell.className = sonde.status;
                        cell.appendChild(lien);
                        row.appendChild(cell);
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
            tableSF.appendChild(tableBody);
            if (foundPourSF)
            {
                cell = document.createElement('td');
                //cell.colSpan =nbColonnes;
                cell.appendChild(tableSF);
                rowServ.appendChild(cell);
                tableBodyServ.appendChild(rowServ);
                if(compteurSF % 2 == 1)
                {
                    rowServ = document.createElement('tr');
                }
                compteurSF = compteurSF+1;
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
        info.innerHTML='Tout est OK pour le SCLI';
        document.body.appendChild(info);
        var minions = document.createElement('img');
        minions.src=images[Math.floor(Math.random()*images.length)];
        minions.className='infoimg';
        document.body.appendChild(minions);
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

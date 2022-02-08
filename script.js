 //Hani Berchan, Paul Nguimeya, Lucky Khounvongsa

 //Cette fonction remplie un tableau html avec identificateur id avec 
 //contient une colonne par attribut dans donnees et les valeurs dans donnees 
 //rangees. Chaque colonne est nomme par l'attribut qu'il represente.
 function genereTableau(donnees, id) {
     var nb = donnees.length;
     if (nb > 0) {
         var nbattributs = donnees[0].length;
         var htmltable = "<tr>";
         for (var attr in donnees[0]) {
             htmltable = htmltable + "<th class=" + attr + ">" + attr + "</th>";
         };
         htmltable = htmltable + "</tr>";
         for (var x = 0; x < nb; x++) {
             htmltable = htmltable + "<tr>";
             for (var a in donnees[x]) {
                 htmltable = htmltable + "<td class=" + a + ">" + donnees[x][a] + "</td>";
             }
             htmltable = htmltable + "</tr>";
         }
         $("#" + id).html(htmltable);

     } else {
         alert("Le résultat retourné est vide.");
         $("#" + id).html("");
     }
 }

 // fonction poste pour les équipes de l'est 
 function poste(requete) {
     var postData = {};
     postData["db"] = "dift6800_baseball";
     postData["query"] = requete;

     //La requête AJAX suit, faisant appel au backend db.php qui se trouve dans le même répertoire
     $.post(
         "http://www-ens.iro.umontreal.ca/~dift6800/baseball/db.php",
         postData,
         function (reponse, status) {

             //Transforme le contenu de la reponse en objet JSON
             var obj = JSON.parse(reponse);
             if (obj.error == "") {
                 genereTableau(obj.data, "table");
             } else {
                 alert("Erreur:" + obj.error);
             }
         }
     );
 };

 // fonction poste pour les équipes de l'ouest
 function poste2(requete) {
     var postData = {};
     postData["db"] = "dift6800_baseball";
     postData["query"] = requete;

     //La requête AJAX suit, faisant appel au backend db.php qui se trouve dans le même répertoire
     $.post(
         "http://www-ens.iro.umontreal.ca/~dift6800/baseball/db.php",
         postData,
         function (reponse, status) {

             //Transforme le contenu de la reponse en objet JSON
             var obj = JSON.parse(reponse);
             if (obj.error == "") {
                 genereTableau(obj.data, "table2");
             } else {
                 alert("Erreur:" + obj.error);
             }
         }
     );
 };

 // fonction poste3 pour les équipes division centrale
 function poste3(requete) {
     var postData = {};
     postData["db"] = "dift6800_baseball";
     postData["query"] = requete;

     //La requête AJAX suit, faisant appel au backend db.php qui se trouve dans le même répertoire
     $.post(
         "http://www-ens.iro.umontreal.ca/~dift6800/baseball/db.php",
         postData,
         function (reponse, status) {

             //Transforme le contenu de la reponse en objet JSON
             var obj = JSON.parse(reponse);
             if (obj.error == "") {
                 genereTableau(obj.data, "table3");
             } else {
                 alert("Erreur:" + obj.error);
             }
         }
     );
 };


 // Tableau pour la division Est deux ligues
 var aa = "name AS equipe, W/(W+L) AS moyenne, W AS V, L AS D, maxW-W As Diff From Teams INNER JOIN (SELECT MAX(W) AS maxW From Teams WHERE yearID =";
 var bb = " AND divID='E') AS t2 WHERE yearID =";
 var cc = " AND divID = 'E' GROUP BY name ORDER BY W DESC";

 // Tableau pour la division ouest deux ligues
 var dd = "name AS equipe, W/(W+L) AS moyenne, W AS V, L AS D, maxW-W As Diff From Teams INNER JOIN (SELECT MAX(W) AS maxW From Teams WHERE yearID =";
 var ee = " AND divID= 'W') AS t2 WHERE yearID =";
 var ff = " AND divID = 'W' GROUP BY name ORDER BY W DESC";

 // Tableau pour la division centrale deux ligues
 var gg = "name AS equipe, W/(W+L) AS moyenne, W AS V, L AS D, maxW-W As Diff From Teams INNER JOIN (SELECT MAX(W) AS maxW From Teams WHERE yearID =";
 var hh = " AND divID='C') AS t2 WHERE yearID =";
 var ii = " AND divID = 'C' GROUP BY name ORDER BY W DESC";

 // Tableau pour la division EST ligue NL
 var oneE = "name AS equipe, W/(W+L) AS moyenne, W AS V, L AS D, maxW-W As Diff From Teams INNER JOIN (SELECT MAX(W) AS maxW From Teams WHERE yearID =";
 var twoE = " AND divID='E' AND lgID = 'NL') AS t2 WHERE yearID =";
 var threeE = " AND divID = 'E' AND lgID = 'NL' GROUP BY name ORDER BY W DESC";

 // Tableau pour la division ouest ligue NL
 var oneO = "name AS equipe, W/(W+L) AS moyenne, W AS V, L AS D, maxW-W As Diff From Teams INNER JOIN (SELECT MAX(W) AS maxW From Teams WHERE yearID =";
 var twoO = " AND divID='W' AND lgID = 'NL') AS t2 WHERE yearID =";
 var threeO = " AND divID = 'W' AND lgID = 'NL' GROUP BY name ORDER BY W DESC";

 // Tableau pour la division centrale ligue NL
 var oneC = "name AS equipe, W/(W+L) AS moyenne, W AS V, L AS D, maxW-W As Diff From Teams INNER JOIN (SELECT MAX(W) AS maxW From Teams WHERE yearID =";
 var twoC = " AND divID= 'C') AS t2 WHERE yearID =";
 var threeC = " AND divID = 'C' GROUP BY name ORDER BY W DESC";

 // Tableau avec le teamID, WS, NCLS le nombre de victoire, de défaites division E
 var w1 = "Teams.teamID, Teams.teamID=WSC.teamIDWinner AS WS, Teams.teamID=LC.teamIDWinner AS NLCS, Teams.W,Teams.L FROM Teams, (SELECT teamIDWinner FROM SeriesPost WHERE yearID=";
 var w2 = " AND round='NLCS') AS LC,(SELECT teamIDWinner FROM SeriesPost WHERE yearID=";
 var w3 = " AND round='WS') AS WSC WHERE Teams.yearID=";
 var w4 = " AND Teams.lgID='NL' AND Teams.divID='E'";


 $(document).ready(function () {
     $("#lancer").click(function (event) {

         var saison = $("#saison").val();
         var ligue = $("#ligue").val();
         var h = "Equipes EST";
         var g = "Equipes OUEST";
         var c = "Equipes CENTRALE";
         $("#titre1").text(h);
         $("#titre2").text(g);
         $("#titre3").text(c);

         if (ligue == 'LN') {
             var x = poste(oneE + saison + twoE + saison + threeE);
             var y = poste2(oneO + saison + twoO + saison + threeO);
             if (saison >= 1995) {
                 var z = poste3(oneC + saison + twoC + saison + threeC);
                 $("#table3").show();
                 $("#titre3").show();
             } else {
                 $("#table3").hide();
                 $("#titre3").hide();
             }
         } else {
             var x = poste(aa + saison + bb + saison + cc);
             var y = poste2(dd + saison + ee + saison + ff);
             if (saison >= 1995) {
                 var z = poste3(gg + saison + hh + saison + ii);
                 $("#table3").show();
                 $("#titre3").show();
             } else {
                 $("#table3").hide();
                 $("#titre3").hide();
             }
         }
     });
 });
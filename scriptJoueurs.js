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
            htmltable = htmltable + "<th>" + attr + "</th>";
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

// fonction poste 
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


// requete
var debut = "Master.nameFirst AS Prenoms, Master.nameLast AS Noms"
var BA = ",Batting.H/Batting.AB AS 'BA' "
var SL = ",(Batting.H-Batting.2B -Batting.3B-Batting.HR+(2*Batting.2B)+(3*Batting.3B)+(4*Batting.HR))/Batting.AB AS 'SL'"
var OB = " ,(Batting.H+Batting.BB+Batting.HBP)/(Batting.AB+Batting.BB+Batting.HBP+Batting.SF) AS 'OB'"
var SO = " ,Batting.SO/Batting.AB AS 'SO'"
var SB = ",Batting.SB/(Batting.CS+Batting.SB) AS 'SB'"
var AB = " ,Batting.AB"
var H = " ,Batting.H"
var deuxB = ",Batting.2B AS X2B"
var troisB = ",Batting.3B AS X3B"
var HR = " ,Batting.HR"
var BB = " ,Batting.BB"
var R = " ,Batting.R"
var SB = ",Batting.SB"
var CS = ",Batting.CS"
var FP = ",T3.FP AS 'FP'"
var A = " ,T3.A"
var E = " ,T3.E"
var POS = " ,T3.POSX AS 'POS'"
var salary = " ,Salaries.salary AS Salaires"
var from = " FROM Batting"
var salary1 = " INNER JOIN Salaries ON Salaries.playerID=Batting.playerID"
var reste = " INNER JOIN Master ON Master.playerID = Batting.playerID INNER JOIN (SELECT F3.playerID, SUM(A)/(SUM(A)+SUM(E)) AS FP,  SUM(A) AS A, SUM(E) AS E, POSX" +
    " FROM Fielding AS F3, ((SELECT playerID AS joueurId, MAX(GS) AS MaxGS" +
    " FROM Fielding as F1 WHERE (yearID="
var deux = " ) AND (teamID='MON') AND (POS <> 'P') AND (POS <> 'OF') GROUP BY playerID) AS T1 INNER JOIN" +
    " (SELECT playerID, POS AS POSX, GS FROM Fielding AS F2 WHERE (F2.yearID="
var trois = " ) AND (F2.teamID='MON') AND (F2.POS <> 'P') AND (F2.POS <> 'OF')) AS T2 ON (T1.joueurId=T2.playerID) AND (T1.MaxGS = GS))" +
    " WHERE (T1.joueurId=F3.playerID) AND (F3.yearID="
var quatre = " ) GROUP BY F3.playerID) as T3 ON (T3.playerID = Batting.playerID) WHERE Batting.yearID="
var cinq = " AND Salaries.yearID="
var six = " AND (Batting.teamID='MON')"
//filtre BA
var ascBA = "ORDER BY Batting.H/Batting.AB ASC"
var dscBA = "ORDER BY Batting.H/Batting.AB DESC"
//Filtre SL
var ascSL = "ORDER BY (Batting.H-Batting.2B -Batting.3B-Batting.HR+(2*Batting.2B)+(3*Batting.3B)+(4*Batting.HR))/Batting.AB ASC"
var dscSL = "ORDER BY (Batting.H-Batting.2B -Batting.3B-Batting.HR+(2*Batting.2B)+(3*Batting.3B)+(4*Batting.HR))/Batting.AB DESC"
//filtre OB
var ascOB = "ORDER BY (Batting.H+Batting.BB+Batting.HBP)/(Batting.AB+Batting.BB+Batting.HBP+Batting.SF) ASC"
var dscOB = "ORDER BY (Batting.H+Batting.BB+Batting.HBP)/(Batting.AB+Batting.BB+Batting.HBP+Batting.SF) DESC"
//filtre HR
var ascHR = "ORDER BY Batting.HR ASC"
var dscHR = "ORDER BY Batting.HR DESC"
//filtre FP
var ascFP = "ORDER BY T3.FP ASC"
var dscFP = "ORDER BY T3.FP DESC"
// filtre salaire
var ascSal = "ORDER BY Salaries.salary ASC"
var dscSal = "ORDER BY Salaries.salary DESC"

var fin = "";



$(document).ready(function () {
    $("#lancer").click(function (event) {
        var saison = $("#saison").val();
        var position = $("#Position").val();
        var h = "Les joueurs des Expos en " + saison;
        $("#titre1").text(h);
        var r = "";

        if ($('input[name="BA%"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += BA;
        }

        if ($('input[name="SL%"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += SL;
        }

        if ($('input[name="OB%"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += OB;
        }
        if ($('input[name="SO%"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += SO;
        }
        if ($('input[name="SB%"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += SB;
        }
        if ($('input[name="AB"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += AB;
        }
        if ($('input[name="H"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += H;
        }
        if ($('input[name="2B"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += deuxB;
        }
        if ($('input[name="3B"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += troisB;
        }
        if ($('input[name="HR"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += HR;
        }
        if ($('input[name="BB"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += BB;
        }
        if ($('input[name="R"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += R;
        }
        if ($('input[name="SB"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += SB;
        }
        if ($('input[name="CS"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r += CS;
        }
        if ($('input[name="FP%"]').prop('checked') == true && (position == 'OeD' || position == 'Deffensive')) {
            r += FP;
        }
        if ($('input[name="A"]').prop('checked') == true && (position == 'OeD' || position == 'Deffensive')) {
            r += A;
        }
        if ($('input[name="E"]').prop('checked') == true && (position == 'OeD' || position == 'Deffensive')) {
            r += E;
        }
        if ($('input[name="POS"]').prop('checked') == true && (position == 'OeD' || position == 'Deffensive')) {
            r += POS;
        }
        if (($('input[name="Salaire"]').prop('checked') == true && saison >= 1985)) {

            r += salary + from + salary1;
        } else if (($('input[name="Salaire"]').prop('checked') == false && saison >= 1985)) {
            r += from + salary1;
            $("#Autre").show();
            $("#Filtresal").show();
        } else {

            r += from;
            $("#Filtresal").hide();
            $("#Autre").hide();
        }


        if (position == 'OeD') {
            $("#Deffensive").show();
            $("#Offensive").show();
            $("#Filtredeff").show();
            $("#Filtreoff").show();
        } else if (position == 'Offensive') {
            $("#Deffensive").hide();
            $("#Offensive").show();
            $("#Filtredeff").hide();
            $("#Filtreoff").show();
        } else if (position == 'Deffensive') {
            $("#Offensive").hide();
            $("#Deffensive").show();
            $("#Filtreoff").hide();
            $("#Filtredeff").show();
        }
        if (saison >= 1985) {
            var r1 = debut + r + reste + saison + deux + saison + trois + saison + quatre + saison + cinq + saison + six;
        } else {
            alert("Pas de salaire dans la base de données pour les années inférieures à 1985");
            var r1 = debut + r + reste + saison + deux + saison + trois + saison + quatre + saison + six;
        }

        // Section Filtre

        // filtre pour BA
        if ($('input[id="ascBA"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r1 += ascBA;
        } else if ($('input[id="dscBA"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r1 += dscBA;
        }
        // filtre pour SL 
        if ($('input[id="ascSL"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r1 += ascSL;
        } else if ($('input[id="dscSL"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r1 += dscSL;
        }
        // filtre pour OB 
        if ($('input[id="ascOB"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r1 += ascOB;
        } else if ($('input[id="dscOB"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r1 += dscOB;
        }
        //filtre pour HR
        if ($('input[id="ascHR"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r1 += ascHR;
        } else if ($('input[id="dscHR"]').prop('checked') == true && (position == 'OeD' || position == 'Offensive')) {
            r1 += dscHR;
        }
        // filtre pour FP
        if ($('input[id="ascFP"]').prop('checked') == true && (position == 'OeD' || position == 'Deffensive')) {
            r1 += ascFP;
        } else if ($('input[id="dscFP"]').prop('checked') == true && (position == 'OeD' || position == 'Deffensive')) {
            r1 += dscFP;
        }
        // filtre pour salaire
        if ($('input[id="ascSal"]').prop('checked') == true && (position == 'OeD' || position == 'Deffensive')) {
            r1 += ascSal;
        } else if ($('input[id="dscSal"]').prop('checked') == true && (position == 'OeD' || position == 'Deffensive')) {
            r1 += dscSal;
        }

        var x = poste(r1 + fin);
    });
});
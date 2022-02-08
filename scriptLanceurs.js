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
                htmltable = htmltable + "<td>" + donnees[x][a] + "</td>";
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
var ERA = ", Pitching.ERA"
var BAOpp = ",Pitching.BAOpp"
var G = ",Pitching.G"
var GS = ", Pitching.GS"
var CG = ", Pitching.CG"
var W = ", Pitching.W"
var L = ", Pitching.L"
var SV = ",Pitching.SV"
var iPouts = ",Pitching.IPouts"
var SO = ", Pitching.SO"
var H = ", Pitching.H"
var BB = ", Pitching.BB"
var salaire = ", Salaries.salary AS Salaires"
var from = " FROM Pitching"
var salaire1 = " INNER JOIN Salaries ON Salaries.playerID=Pitching.playerID"
var un = " INNER JOIN Master ON Master.playerID = Pitching.playerID WHERE Pitching.yearID="
var deux = " AND Salaries.yearID="
var trois = " AND Pitching.teamID = 'MON'"
var partant = " AND GS>0 "

//filtre ERA
var ascERA = "ORDER BY Pitching.ERA ASC"
var dscERA = "ORDER BY Pitching.ERA DESC"
//filtre BAOpp
var ascBAOpp = "ORDER BY Pitching.BAOpp ASC"
var dscBAOpp = "ORDER BY Pitching.BAOpp DESC"
//filtre G
var ascG = "ORDER BY Pitching.G ASC"
var dscG = "ORDER BY Pitching.G DESC"
//filtre GS
var ascGS = "ORDER BY Pitching.GS ASC"
var dscGS = "ORDER BY Pitching.GS DESC"
//filtre W
var ascW = "ORDER BY Pitching.W ASC"
var dscW = "ORDER BY Pitching.W DESC"
//filtre SO
var ascSO = "ORDER BY Pitching.SO ASC"
var dscSO = "ORDER BY Pitching.SO DESC"
//filtre H
var ascH = "ORDER BY Pitching.H ASC"
var dscH = "ORDER BY Pitching.H DESC"
//filtre BB
var ascBB = "ORDER BY Pitching.BB ASC"
var dscBB = "ORDER BY Pitching.BB DESC"
// filtre salaire
var ascSal = "ORDER BY Salaries.salary ASC"
var dscSal = "ORDER BY Salaries.salary DESC"

var fin = "";


$(document).ready(function () {
    $("#lancer").click(function (event) {
        var saison = $("#saison").val();


        var h = "Les lanceurs des Expos en " + saison;
        $("#titre1").text(h);
        var r = "";

        if ($('input[name="ERA"]').prop('checked') == true) {
            r += ERA;
        }
        if ($('input[name="BAOpp"]').prop('checked') == true) {
            r += BAOpp;
        }
        if ($('input[name="G"]').prop('checked') == true) {
            r += G;
        }
        if ($('input[name="GS"]').prop('checked') == true) {
            r += GS;
        }
        if ($('input[name="CG"]').prop('checked') == true) {
            r += CG;
        }
        if ($('input[name="W"]').prop('checked') == true) {
            r += W;
        }
        if ($('input[name="L"]').prop('checked') == true) {
            r += L;
        }
        if ($('input[name="SV"]').prop('checked') == true) {
            r += SV;
        }
        if ($('input[name="iPouts"]').prop('checked') == true) {
            r += iPouts;
        }
        if ($('input[name="SO"]').prop('checked') == true) {
            r += SO;
        }
        if ($('input[name="H"]').prop('checked') == true) {
            r += H;
        }
        if ($('input[name="BB"]').prop('checked') == true) {
            r += BB;
        }

        if (($('input[name="salaire"]').prop('checked') == true && saison >= 1985)) {
            r += salaire + from + salaire1;
        } else if (($('input[name="salaire"]').prop('checked') == false && saison >= 1985)) {
            r += from + salaire1;
        } else {
            r += from;
        }

        if (saison >= 1985) {
            var r1 = debut + r + un + saison + deux + saison + trois;
        } else {
            alert("Pas de salaire dans la base de données pour les années inférieures à 1985");
            var r1 = debut + r + un + saison + trois;
        }

        // filtre pour les partants
        if ($('input[name="partant"]').prop('checked') == true) {
            r1 += partant;
        }

        // filtre pour ERA
        if ($('input[id="ascERA"]').prop('checked') == true) {
            r1 += ascERA;
        } else if ($('input[id="dscERA"]').prop('checked') == true) {
            r1 += dscERA;
        }
        // filtre pour BAOpp
        if ($('input[id="ascBAOpp"]').prop('checked') == true) {
            r1 += ascBAOpp;
        } else if ($('input[id="dscBAOpp"]').prop('checked') == true) {
            r1 += dscBAOpp;
        }
        // filtre pour G
        if ($('input[id="ascG"]').prop('checked') == true) {
            r1 += ascG;
        } else if ($('input[id="dscG"]').prop('checked') == true) {
            r1 += dscG;
        }
        // filtre pour GS
        if ($('input[id="ascGS"]').prop('checked') == true) {
            r1 += ascGS;
        } else if ($('input[id="dscGS"]').prop('checked') == true) {
            r1 += dscGS;
        }
        // filtre pour W
        if ($('input[id="ascW"]').prop('checked') == true) {
            r1 += ascW;
        } else if ($('input[id="dscW"]').prop('checked') == true) {
            r1 += dscW;
        }
        // filtre pour SO
        if ($('input[id="ascSO"]').prop('checked') == true) {
            r1 += ascSO;
        } else if ($('input[id="dscSO"]').prop('checked') == true) {
            r1 += dscSO;
        }
        // filtre pour H
        if ($('input[id="ascH"]').prop('checked') == true) {
            r1 += ascH;
        } else if ($('input[id="dscH"]').prop('checked') == true) {
            r1 += dscH;
        }
        // filtre pour BB
        if ($('input[id="ascBB"]').prop('checked') == true) {
            r1 += ascBB;
        } else if ($('input[id="dscBB"]').prop('checked') == true) {
            r1 += dscBB;
        }
        // filtre pour salaire
        if ($('input[id="ascSal"]').prop('checked') == true) {
            r1 += ascSal;
        } else if ($('input[id="dscSal"]').prop('checked') == true) {
            r1 += dscSal;
        }

        var x = poste(r1 + fin);
    });
});
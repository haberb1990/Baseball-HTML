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

// fonction posteManager 
function posteManager(requete) {
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
                genereTableau(obj.data, "table1");
            } else {
                alert("Erreur:" + obj.error);
            }
        }
    );
};

// fonction assistance
function posteAssistance(requete) {
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

// fonction masse salariale
function posteMasse(requete) {
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

// requete manager
var debut = "Master.nameFirst AS Prenoms, Master.nameLast AS Noms FROM Managers INNER JOIN Master ON Master.playerID = Managers.playerID WHERE yearID ="
var end = " AND teamID='MON'";

// requete assistance
var debutA = "attendance AS Assistance FROM Teams WHERE yearID ="
var endA = " AND teamID='MON'";

// requete masse salariale
var debutM = "SUM(salary) AS MS FROM Salaries WHERE yearID = "
var endM = " AND teamID='MON'";

$(document).ready(function () {
    $("#lancer").click(function (event) {
        var saison = $("#saison").val();
        var h = "Le(s) manager(s) des Expos en " + saison;
        $("#titre1").text(h);

        var manager = posteManager(debut + saison + end);

        var g = "L'assistance a domicile des Expos en " + saison;
        $("#titre2").text(g);
        var assistance = posteAssistance(debutA + saison + endA);

        if (saison >= 1985) {
            var ms = "La masse salariale des Expos en " + saison;
            $("#titre3").text(ms);
            var assistance = posteMasse(debutM + saison + endM);
            $("#titre3").show();
            $("#table3").show();
        } else {
            alert("Pas de masse salariale pour les années inférieures à 1985");
            $("#titre3").hide();
            $("#table3").hide();
        }

    });
});

/* global tasks, objects, game, levels, events, cats, catUps */

var output = {};

output = {
    load: function () {
        output.loadLevelSelect();
        output.updateMoney();
    },
    resetGrid: function () {
        $(".itemCat").hide();
    },
    loadLevel: function () {
        output.loadObjects();
        output.loadCats();
        events.itemClick();
        output.changeHeader("Level " + game.level.levelSet);
    },
    loadObjects: function () { //Lädt das Spielfeld
        var i = 0;
        var output = "";
        Object.entries(game.level.objects).forEach(([key, val]) => {
            if (i % 3 === 0) {
                output += '<div class="gridRow">';
            }
            output += '<div class="gridCol">' +
                    '<div class="gridItem">' +
                    '<div id="' + key + '" data-name="' + key + '" class="item">' +
                    '<img src="img/objects/' + key + '.png" class="itemImg" />' +
                    '<div class="itemBar">' +
                    '<div class="meter">' +
                    '<span style="width: 0%"></span>' +
                    '<p>0.0%</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="itemCat">\n\
                    <img src="img/cats/orange.png" class="cat" data-cat="orange" />\n\
                    <img src="img/cats/brown.png" class="cat" data-cat="brown" />\n\
                    <img src="img/cats/black.png" class="cat" data-cat="black" />\n\
                    </div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            if (i % 3 === 2)
                output += '</div>';

            i++;
        });

        //Generierte Objekte ausgeben.
        $("#gameGrid").html(output);

    },
    loadCats: function () {
        //Aktive Katze als Button setzen
        var activeCat = game.level.activeCat;

        //Ausgeben der Katzen in diesem Level
        var buttons = "";
        for (var key in cats) {
            if (cats.hasOwnProperty(key)) {

                let isActive = (key === activeCat);
                let isUnlocked = (game.level.cats.hasOwnProperty(key));
                buttons += output.getCatButton(key, isActive, isUnlocked);
            }
        }

        $("#catChooseBtn").html(buttons);
        events.clickCatBar();
    },
    getCatButton: function (cat, active, isUnlocked) {
        if (active)
            active = "active";
        else
            active = "";

        if (isUnlocked)
            isUnlocked = "";
        else
            isUnlocked = "disabled";

        return '<div data-cat="' + cat + '" class="cat_btn cat_' + cat + ' btn btn-pic btn-default ' + active + ' ' + isUnlocked + '">' +
                '<img src="img/cats/' + cat + '.png" width="30" />' +
                '</div>';
    },
    hideCatsBar: function () {
        $("#catChoose").addClass("hide");
    },
    starHTML: function () {
        return '<img src="img/star.png" />';
    },
    loadCatManager: function () {
        this.loadCatManagerBtns();
        this.loadCatUps();
    },
    loadCatManagerBtns: function () {
        var activeCat = game.data.cats[0]; //Wählt die orangene Katze zuerst aus

        var buttons = "";
        for (var key in cats) {
            if (cats.hasOwnProperty(key)) {

                let isActive = (key === activeCat);
                let isUnlocked = (game.data.cats.indexOf(key) > -1);
                buttons += output.getCatButton(key, isActive, isUnlocked);
            }
        }

        $("#manageCatBtn").html(buttons);
        events.clickCatsManager();
    },
    loadCatUps: function (cat) {
        //Lädt die Upgrades der Katzen aus.

        for (var kind in catUps) {
            if (catUps.hasOwnProperty(kind)) {
                //Jetzt auslesen der Upgrades einer Art
                var ups = catUps[kind];
                var upgrades = "";
                for (var upKey in ups) {
                    var up = ups[upKey];
                    upgrades += '<div class="upgrade" data-name="' + up.id + '">' +
                            '<div class="upTitle">' + up.label + '</div>' +
                            '<div class="upDesc">' + up.desc + '</div>' +
                            '<div class="upInfo">' +
                            '<div class="upProgress">BAAAAAAAAAAAR</div>' +
                            '<div class="upBuy">BUY! 1KT</div>' +
                            '</div>' +
                            '</div>';

                }

                //Hier html ausgabe
                $("#"+kind + "_up").html(upgrades);

            }
        }


    },
    loadLevelSelect: function () { //Lädt die Levelauswahl
        var i = 0;
        var output = "";
        var locked = "";
        var star = this.starHTML();

        for (var key in levels) {
            if (levels.hasOwnProperty(key)) {
                var stars = 0;

                if (!game.checkLevelUnlocked(key)) //Setzt auf locked
                    locked = "locked";
                else if (game.checkLevelHasStar(key))
                    stars = game.data.level[key].stars;

                if (i % 10 === 0) { //fängt eine neue Reihe an
                    output += '<div class="gridRowSmall">';
                }
                output += '<div class="gridColSmall">' +
                        '<div class="gridItemSmall">' +
                        '<div data-level="' + key + '" class="itemSmall ' + locked + '">' +
                        '<div class="itemContent">' + key + '</div>' +
                        '<div class="stars">' + star.repeat(stars) + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                if (i % 10 === 9)
                    output += '</div>';

                i++;

            }
        }

        //Generierte Objekte ausgeben.
        $("#levelSelect").html(output);
    },
    colorStorage: [], //Speichert die keys ab, um unnötige DOM Änderungen vorzubeugen, speichert orange ab
    loadProgress: function () {
        Object.entries(game.level.objects).forEach(([key, val]) => {
            var progress = game.level.objects[key]["progress"];
            var wp = game.level.objects[key]["wp"];
            var percent = ((progress / wp) * 100).toFixed(1);
            $("#" + key).find("span").width(percent + "%").parent().children("p").html(percent + "%");

            //Falls noch nicht zu orange gefadet, speichern im array und faden
            if (output.colorStorage.indexOf(key) < 0 && game.level.objects[key].auto) {
                output.colorStorage.push(key);
                $("#" + key).animate({backgroundColor: '#FFA500'}, 50);
            } else if (output.colorStorage.indexOf(key) > -1 && !game.level.objects[key].auto) {
                output.colorStorage.remove(key);
                $("#" + key).animate({backgroundColor: '#7f0000'}, 50);
        }

        });

    },
    show100: function (key) {
        $("#" + key).animate({
            color: 'white',
            backgroundColor: 'white'
        }, 200);
    },
    showLevelDone: function (time, oldTime, stars, newHi) {
        //$("#hints").html("YOU WON! You took " + formatDate(time) + " and got " + stars + " stars");

        $("#finStars").html(output.starHTML().repeat(stars));
        $("#levelFin").find(".finLevel").html("Level " + game.level.levelSet);
        $("#levelFin").find(".finBest").html(oldTime);
        $("#levelFin").find(".finNew").html(formatDate(time));

        if (!game.checkLevelUnlocked(game.level.levelSet + 1))
            $("#nextBtn").addClass("disabled");
        else
            $("#nextBtn").removeClass("disabled");

        if (newHi)
            $("#levelFin").find(".finNewHi").html("NEW HIGHSCORE!");

        events.showDialog("levelFin");


        //Bei klick auf play
        $("#retryBtn").click(function () {
            output.switchPage("gameGrid");
            game.newLevel(game.level.levelSet);
            events.hideDialogs();
        });

        $("#mainBtn").click(function () {
            events.hideDialogs();
            output.switchPage("mainmenu");
        });

        $("#nextBtn").click(function () {
            if (!game.checkLevelUnlocked(game.level.levelSet + 1))
                return;
            events.hideDialogs();
            game.newLevel(game.level.levelSet + 1);
            output.switchPage("gameGrid");
        });

    },
    switchPage: function (name) {
        if (output.tabs.indexOf(name) < 0)
            return;


        //Navbar Inhalt ändern
        if (name !== "gameGrid") {
            output.changeHeader("MEOW");
            output.hideCatsBar();
        }

        if (name === "manageCats") {
            output.loadCatManager();
        }



        //Wechseln zur Seite
        $(".tab").hide();
        $("#" + name).show();


        //Speichern der Seite für Backbutton
        this.preopen = this.pageopen;
        this.pageopen = name;

        //Ein und ausblenden der Menülogos
        $(".menuBarBtn").each(function () {
            var hide = $(this).data("hide").split(" ");
            var hideIt = false;
            for (var i = 0; i < hide.length; i++) {
                if (hide[i] === name) {
                    hideIt = true;
                    break;
                }
            }

            if (hideIt)
                $(this).hide();
            else {
                $(this).show();
            }
        });

        //Ein und ausblenden der Footer Angaben
        $("#footer").find(".switchFooter").each(function () {
            var show = $(this).data("show").split(" ");
            var showIt = false;
            for (var i = 0; i < show.length; i++) {
                if (show[i] === name) {
                    showIt = true;
                    break;
                }
            }

            if (showIt)
                $(this).show();
            else {
                $(this).hide();
            }

        });

    },
    changeHeader: function (input) {
        $("#navMiddle").html(input);
    },
    moveCat: function (object, newCat, show) {

        output.hideCats(newCat);
        //Einblenden der Katze
        if (show) //Wenn die Katze nicht vom Feld genommen wurde, bleibt sie ausgeblendet
            output.showCat(object, newCat);
    },
    hideCats: function (catz) {
        //$(".item").find("[data-cat='"+catz+"']").fadeOut(this.catDelay);
        var string = "*[data-cat='" + catz + "']";
        //console.log("hide: "+catz+" string: "+string);
        $("#gameGrid").find(string).fadeOut(this.catDelay);
    },
    showCat: function (object, cat) {
        $("#" + object).find("[data-cat='" + cat + "']").delay(this.catDelay).fadeIn(this.catDelay);
    },

    updateMoney: function () {
        var money = game.data.stats.money;
        $("#pawsCount").html(money);
    },
    ////****** vars
    tabs: [],
    pageopen: "",
    preopen: "",
    catDelay: 80

};

/* global tasks, objects, game, levels, events, cats, catUps, eco */

var output = {};

output = {
    load: function () {
        output.loadLevelSelect();
        output.updateMoney();
    },
    resetGrid: function () {
        $(".itemCat").hide();
        output.resetEnergy();
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
        $("#gameObjects").html(output);

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
        var activeCat = "orange"; //Wählt die orangene Katze zuerst aus

        var buttons = "";
        for (var key in cats) {
            if (cats.hasOwnProperty(key)) {

                let isActive = (key === activeCat);
                let isUnlocked = (game.data.cats.hasOwnProperty(key));
                buttons += output.getCatButton(key, isActive, isUnlocked);
            }
        }

        $("#catChooseBtn").html(buttons);
        events.clickCatBar();
    },
    loadCatUps: function (cat) {
        cat = typeof cat !== 'undefined' ? cat : "orange";
        var money = eco.getMoney();
        //erst berechnete Katzenstats auslesen

        $("#catStats").find(".catWPS").html(two(game.calcWPS(cat)))
                .parent().find(".catWPD").html(two(game.calcWPD(cat)))
                .parent().find(".catEXPO").html(two(game.calcEXPO(cat)))
                .parent().find(".catEXPOLIMIT").html(two(game.calcEXPOLimit(cat)));

                


        //Lädt die Upgrades der Katzen aus.
        for (var kind in catUps) { //WPS, WPD, etc
            
            if (catUps.hasOwnProperty(kind)) {
                //Jetzt auslesen der Upgrades einer Art
                var ups = catUps[kind];
                
                var upgrades = "";
                for (var id in ups) { //cat workout 1, cat workout 2, etc
                    var up = ups[id];
                    var maxNum = up.count;
                    var progNum = 0;
                    var disabled = "";

                    if (game.data.cats[cat].ups.hasOwnProperty(id)) {
                        progNum = game.data.cats[cat].ups[id];
                    }
                    var cost = eco.calcUpCost(up.cost, progNum);
                    var progressBar = output.getProgressSegments(maxNum, progNum);
                    if (cost > money || maxNum <= progNum)
                        disabled = "disabled";

                        
                    upgrades += '<div class="upgrade" data-name="' + id + '">' +
                            '<div class="upTitle">' + up.label + '</div>' +
                            '<div class="upDesc">' + up.desc + '</div>' +
                            '<div class="upInfo">' +
                            '<div class="upProgress">' + progressBar + '</div>' +
                            '<div class="upBuy"> ' + cost + ' <button data-buy="' + id + '" class="btn btn-success buy-up btn-sm ' + disabled + '">BUY</button></div>' +
                            '</div>' +
                            '</div>';

                }

                //Hier html ausgabe
                $("#" + kind + "_up").html(upgrades);
            }
        }
        events.clickCatUps();

    },
    getProgressSegments(count, done) {
        var out = "";
        for (var i = 1; i <= count; i++) {
            if (done >= i)
                out += "<div class='seg seg-done'></div>";
            else
                out += "<div class='seg'></div>";
        }
        return out;
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
        //Prozente berechnen und anzeigen
        Object.entries(game.level.objects).forEach(([key, val]) => {
            var progress = game.level.objects[key]["progress"];
            var wp = game.level.objects[key]["wp"];
            var percent = ((progress / wp) * 100).toFixed(1);
            $("#" + key).find("span").width(percent + "%").parent().children("p").html(percent + "%");

            //Falls noch nicht zu orange gefadet, speichern im array und faden
            if (game.level.objects[key].done) {
                //do nothing
            } else if (output.colorStorage.indexOf(key) < 0 && game.level.objects[key].auto) {
                output.colorStorage.push(key); //zu orange wechseln
                $("#" + key).animate({backgroundColor: '#FFA500'}, 50);
            } else if (output.colorStorage.indexOf(key) > -1 && !game.level.objects[key].auto) {
                output.colorStorage.remove(key);
                $("#" + key).animate({backgroundColor: '#7f0000'}, 50);
        }
        });

        //Energieleiste anzeigen
        var cat = game.level.activeCat;
        var wpd = game.level.cats[cat].wpd;
        var max_wpd = game.calcWPD(cat);
        var dec_percent = (wpd / max_wpd);
        var percent = two(dec_percent * 100);
        var startColor = [255, 0, 0];
        var endColor = [0, 128, 0];
        var hex = colorString(
                average(startColor[0], endColor[0], dec_percent),
                average(startColor[1], endColor[1], dec_percent),
                average(startColor[2], endColor[2], dec_percent)
                );
        
        $("#catEnergy > .bar").css('background-color', hex).width(percent+"%");

        //Energie in Zahlen anzeigen
        $("#current_wpd").html(`${wpd.toFixed(2)}/${max_wpd} WPD`);

        //WPS in Zahlen anzeigen
        let catwps = game.level.cats[cat].wps; //game.calcWPS(cat);     
        $("#current_wps").html(`${catwps.toFixed(2)} WPS`);

        //Show game timer
        var since = new Date().getTime() - game.level.start;
        $("#current_timer").html(formatDate(since));

    },
    resetEnergy: function() {
        $("#current_wps").html(`... WPS`);
        $("#current_wpd").html(`... WPD`);
        $("#catEnergy > .bar").css('background-color', "green").width("100%");
    },
    show100: function (key) {
        $("#" + key).animate({color: 'white'}, 130);
        $("#" + key).animate({backgroundColor: 'white'}, 130);
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
    switchManagePage: function (page) {
        $("#manageCats").find(".manage_tab").hide();
        $("#manageCats").find(".manage_" + page).show();
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
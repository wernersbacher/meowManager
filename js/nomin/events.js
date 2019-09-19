/* global game, output, levels, getUpById, upgrade, num, cat, eco */

var events = new Object();
events = {
    load: function () {
        events.tabLoading();
        events.mainMenuButtons();
        events.menuBarButtons();
        events.manageButtons();
        events.itemClick();
        events.levelSelectClick();
        events.scaleDialog();
        events.clickOutsideDialog();
        events.resetButton();

        events.doResize();
    },
    itemClick: function () {
        $(".item").click(function () {
            var show = true;
            var clickedObject = $(this).data("name"); //Angeklicktes Objekt
            var activeCat = game.level.activeCat; //Liest die aktive Katze aus (ausgewählt)
            var objectOwner = game.level.objects[clickedObject].owner; //Prüft, ob schon Besitzer vorhanden ist (Array)

            if (objectOwner.indexOf(activeCat) > -1) { //Entfernt die Katze vom Spielbrett, falls schon dort
                game.level.objects[clickedObject].owner.remove(activeCat);
                show = false;
            } else {//Setzt die aktive Katze rein und entfernt sie aus dem alten Objekt
                var delKey = ownerToObject(activeCat, game.level.objects); //Findet den alten Platz der aktiven Katze heraus

                if (delKey) //Falls die alte Katze ein Platz hatte..löschen
                    game.level.objects[delKey].owner.remove(activeCat);
                game.level.objects[clickedObject].owner.push(activeCat); //Neues Objekt setzen

                game.level.assignTimes[activeCat] = timestamp(); //sets the time the cat got assigned to the task.

            }

            output.moveCat(clickedObject, activeCat, show);

            if (!game.levelRunning) {
                game.startLevel();
            }
        });
    },
    levelSelectClick: function () {
        $(".itemSmall").click(function () {
            if (!$(this).hasClass('locked')) {
                var level = $(this).data("level");
                //Ist nur Startbar, wenn vorheriges Level freigespielt wurde
                if (!game.checkLevelUnlocked(level))
                    return;
                var best;
                if (game.checkLevelPlayed(level))
                    best = formatDate(game.data.level[level].time);
                else
                    best = "-";

                var data = levels[level];
                //dialog öffnen und vorher füllen
                $("#levelInfo").find(".oneStar").html(formatDate(data.stars[0] * 1000));
                $("#levelInfo").find(".twoStar").html(formatDate(data.stars[1] * 1000));
                $("#levelInfo").find(".threeStar").html(formatDate(data.stars[2] * 1000));
                $("#levelInfo").find(".best").html(best);
                $("#levelInfo").find(".title").html(data.title);

                events.showDialog("levelInfo");


                //Bei klick auf play
                $("#playBtn").click(function () {
                    output.switchPage("gameGrid");
                    game.newLevel(level);
                    events.hideDialogs();
                });

            }
        });
    },
    mainMenuButtons: function () {
        $(".mainMenuButton").click(function () {
            var target = $(this).data("target");
            output.switchPage(target);
        });
    },
    menuBarButtons: function () {
        $("#homeBtn").click(function () {
            game.stopLevel();
            output.switchPage("mainmenu");
        });

        $("#reloadBtn").click(function () {
            game.stopLevel();
            game.newLevel(game.level.levelSet);
        });

        $("#backBtn").click(function () {
            if ($("#" + output.pageopen).attr('data-parent')) { //Fals angegeben, wer elternelement ist..
                if (output.pageopen === "gameGrid") //stoppt das spiel, falls zurückgegangen wird
                    game.stopLevel();
                output.switchPage($("#" + output.pageopen).data("parent"));
            } else { //falls nicht, wird zu preopen zurückgekehrt
                output.switchPage(output.preopen);
            }
        });
    },
    manageButtons: function() {
        $("#manageMenu").children("li").click(function() {
            $("#manageMenu").children("li").removeClass("active");
            $(this).addClass("active"); //Menü anzeigen
            
            //Geklicktes item
            var page = $(this).data("pill");
            output.switchManagePage(page);
        });
    },
    clickCatBar: function () {
        $("#catChooseBtn").find(".cat_btn").click(function () {
            var newCat = $(this).data("cat");
            if (output.pageopen === "manageCats")
                events.clickManageCats(newCat);
            else
                events.clickGameCats(newCat);
        });
    },
    clickManageCats: function (newCat) {
        var chosenCat = game.session.manageCat;
        if (!game.hasCat(newCat))
            return;

        game.session.manageCat = newCat;
        output.loadCatUps(newCat); //Laden der Upgrades für die neu ausgewählte Katze

        $(".cat_" + chosenCat).removeClass("active"); //Entfernt altes
        chosenCat = newCat;
        $(".cat_" + newCat).addClass("active");

    },
    clickGameCats: function (newCat) {
        if (!game.hasCat(newCat))
            return; //Bricht ab, falls die Katze nicht besessen wird

        game.level.activeCat = newCat;

        $(".cat_" + game.level.activeCat).removeClass("active"); //Entfernt altes
        $(".cat_" + newCat).addClass("active");
    },
    clickCatUps: function () {

        $("#manageCats").find(".buy-up").click(function () {
            var id = $(this).data("buy");
            var up = getUpById(id);
            if (!up)
                return;

            //Falls das Objekt existiert...
            var num = 0; //Anzahl der Ups erstmal auf 0 setzen
            var cat = game.session.manageCat;

            if (game.data.cats[cat].ups.hasOwnProperty(id))
                num = game.data.cats[cat].ups[id]; //falls was gekauft wurde, das überschreiben

            var cost = eco.calcUpCost(up.cost, num); //Kosten ausrechnen für upgrade

            if (eco.getMoney() >= cost && up.count > num) {
                eco.buyUp(id, cost);
                output.loadCatUps();
            } else if (!(up.count > num)) {
                console.log("fertig.");
            } else {
                console.log("kein geld!");
            }

            /*
             * Bei upgrade muss die ausgabe verändert werden
             */


        });
    },
    footerButtons: function () {
        $("#catChooseBtn").click(function () {
            //open menu
            $("#catChoose").toggleClass("hide");
        });
    },
    tabLoading: function () {


        $('.tab').each(function () {
            output.tabs.push(this.id);
        });
    },
    clickOutsideDialog: function () {
        $('#dialogBG').on('click', function (e) {
            if (e.target !== this)
                return;
            if (output.pageopen === "gameGrid")
                output.switchPage("levelSelect");
            events.hideDialogs();

        });
    },
    resetButton: function() {
        $("#resetHard").click(function() {
            game.hardReset();
        });
    },
    scaleDialog: function () {

        $(window).resize(function () {

            events.doResize();

        });
    },
    doResize: function () {
        var info = $(".dialogScale");
        var scale;

        //Skalieren Der Dialoge
        info.each(function () {
            var elHeight = $(this).outerHeight();
            var elWidth = $(this).outerWidth();

            scale = Math.min(
                    ($(window).width() * 0.8) / elWidth,
                    ($(window).height() * 0.6) / elHeight
                    );

            $(this).css({
                transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
            });
        });

        //Skalieren der Grid items

        var lvl = $(".itemContent");
        lvl.each(function () {
            var elHeight = $(this).outerHeight();
            var elWidth = $(this).outerWidth();

            var pHeight = $(this).parent().outerHeight();
            var pWidth = $(this).parent().outerWidth();

            scale = Math.min(
                    (pHeight) / elWidth,
                    (pWidth) / elHeight
                    );

            $(this).css({
                transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
            });
        });

        //Skalieren des Footers
        var el = $("#scaleFooter");
        var elHeight = el.outerHeight();
        var elWidth = el.outerWidth();

        scale = Math.min(
                ($("#footer").outerHeight()) / elHeight,
                ($("#footer").outerWidth()) / elWidth
                );

        $("#scaleFooter").css({
            transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
        });


    },
    hideDialogs: function () {
        var fade = 80;
        $(".dialogScale").fadeOut(fade);
        $("#dialogBG").fadeOut(fade);
    },
    showDialog: function (dialog) {
        var fade = 80;
        $("#" + dialog).fadeIn(fade);
        $("#dialogBG").fadeIn(fade);
    }
};
    
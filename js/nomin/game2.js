/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global output, events, cats, tasks, objects, levels */

var game = {};

game = {

    fps: 5,
    prevRuntime: 0,
    latency: 0,
    workTimer: false,
    autoWps: 1,
    levelRunning: false,

    //++ Methods ++++
    init: function () {
        game.load();
    },
    load: function () {

        game.loadSavedGame();
        //game.newGame(); //Hier daten Laden und später nachem load von output noch hinzufügen

        output.load();
        events.load();
        output.switchPage("mainmenu");

        setInterval(function () {
            game.data.totalTime += 1;
        }, 1e3);

    },
    loadSavedGame: function () {
        game.loaded = game.getSaveGameLocal();
        if (game.loaded === null || game.loaded === '' || game.loaded === false) {
            game.newGame();
        } else {
            game.newGame();
            game.data = $.extend(true, game.data, game.loaded);
        }
    },
    saveGame: function () {
        localStorage.setItem("meow_save", JSON.stringify(game.data));
    },
    getSaveGameLocal: function () {

        try {
            var load = JSON.parse(localStorage.getItem("meow_save"));
            if (load !== null)
                return load;
        } catch (e) {
            return false;
        }
        return false;

    },
    newGame: function () {
        var data = new Object; //in game.data werden alle Daten fürs Savegame gespeichert
        data.stats = {
            clicks: 0,
            totalGold: 0
        };

        data.level = {
            //hier werden die Daten zu den einzelnen leveln gespeichert
        };

        data.cats = ["orange", "brown"]; //Katzen, die der Spieler besitzt
        data.totalTime = 0;
        data.version = "0.0.1";
        data.options = {
            enableFancyAnim: 1
        };
        data.char = {};

        game.data = data;
    },
    newLevel: function (lvlnr) { //Macht alles Bereit
        var level = new Object;
        level.cats = {}; //Katzen ins Level geladen, mit Werten wie wpd

        var catArr = game.data.cats; //Laden der Katzen vom Spieler
        for (var i = 0, l = catArr.length; i < l; i++) {
            let cat = catArr[i];
            level.cats[cat] = {wpd: cats[cat].wpd};
        }

        level.activeCat = game.data.cats[0]; //nimmt die erste Katze als aktiv

        level.objects = {};
        level.levelSet = lvlnr;
        //Geht das Level durch und lädt die Objekte
        Object.entries(levels[level.levelSet].objects).forEach(([key, val]) => {
            level.objects[key] = {wp: val.wp, wps: 0, owner: [], progress: 0, done: false, auto: false, lastAuto: false};
        }); //game.level.objects[key]

        game.level = level;

        output.colorStorage = [];
        output.resetGrid();
        output.loadLevel();
    },
    startLevel: function () {
        game.level.start = (new Date).getTime();

        game.levelRunning = true;
        game.startWorking();

    },
    startWorking: function () {
        if (game.prevRuntime === 0)
            game.prevRuntime = (new Date).getTime();


        var curTime = new Date().getTime();
        var latency = curTime - game.prevRuntime - (1000 / game.fps);

        latency = (latency < 0) ? 0 : latency;
        game.latency += latency;
        game.doWork();
        if (game.latency > 1000)
            game.latency = 1000;
        while (game.latency > 1000 / game.fps - 1) {
            game.doWork();
            game.latency -= 1000 / game.fps;
        }

        output.loadProgress();
        game.prevRuntime = (new Date).getTime();
        if (game.levelRunning)
            game.workTimer = setTimeout(game.startWorking, 1000 / game.fps);


    },
    doWork: function () {
        //Berechnen der Sta-tusse
        game.doProgress();
    },
    doProgress: function () {
        //Berechnung der einzelnen wps, die an einem Objekt durchgeführt werden
        Object.entries(game.level.objects).forEach(([key, val]) => { //Durchgehen der einzelnen Objekte im Level
            var progress = game.level.objects[key]["progress"];
            if (progress >= wp) //überspringt objekt, wenn es schon fertig ist
                return;
            var level = game.level.levelSet;
            var start = levels[level].objects[key].start;
            var end = levels[level].objects[key].end;
            var wps = 0;
            var wp = game.level.objects[key]["wp"];
            var auto = true;
            var owner = game.level.objects[key]["owner"];
            var i = 0;

            //Speichert den Auto Wert für den nächsten Durchgang
            game.level.objects[key].lastAuto = game.level.objects[key].auto;

            //Schaut, ob der Fortschritt im aktiven Bereich ist
            for (i = 0, l = start.length; i < l; i++) {
                if (progress >= calcWP(start[i], wp) && progress <= calcWP(end[i], wp)) {
                    auto = false;
                    game.level.objects[key].auto = false;
                    break;
                } else {
                    auto = true;
                    game.level.objects[key].auto = true;
                }
            }

            if (auto) { //Falls im Selbstmach Bereich, füge auto wps hinzu
                wps += game.autoWps; //calculateAutoWps()
            }

            if (!auto && owner.length) {
                //Falls nicht im auto bereich und katze, dann füge katzen wps hinzu
                for (var i = 0, l = owner.length; i < l; i++) {
                    //Hier werden alle Katzen durchgegangen, die auf einem Objekt sitzen und entsprechend die wps erhöht
                    wps += cats[owner[i]].wps; //owner[i] = katze
                    //Abziehen der wpd der katze.
                    //console.log(owner[i], game.level.cats, game.level.cats[owner[i]].wpd);
                    game.level.cats[owner[i]].wpd -= cats[owner[i]].wps / game.fps;
                    if (game.level.cats[owner[i]].wpd < 0) {
                        //Wenn die Katze keine Energie mehr hat
                        game.level.cats[owner[i]].wpd = 0;
                        game.level.objects[key].owner.remove(owner[i]); //Entfernen der Katze aus Array, wenn sie erschöpft ist
                    }
                }
            }
            //Hinzufügen der wps
            //game.level.objects[key]["wps"] = wps;

            //Berechnet des Progress
            if (game.level.objects[key]["progress"] + wps / game.fps > wp) {
                game.level.objects[key]["progress"] = wp;
                if (game.level.objects[key].done === false) { //beim erstmaligen überschreiten
                    game.level.objects[key].done = true;
                    game.checkLevel();
                    output.show100(key);

                }        //Sprung von Auto auf nicht-auto, muss an der auto grenze gedeckelt werden, gelöscht: !cats.hasOwnProperty(owner) && 
            } else if (game.level.objects[key]["owner"].length && game.level.objects[key]["lastAuto"] && !game.level.objects[key]["auto"] && game.level.objects[key]["progress"] + wps / game.fps > calcWP(start[i], wp)) {
                console.log(game.level.objects[key]["lastAuto"], game.level.objects[key]["auto"], game.level.objects[key]["progress"] + wps / game.fps, calcWP(start[i], wp));
                game.level.objects[key]["progress"] = calcWP(start[i], wp);
            } else
                game.level.objects[key]["progress"] += wps / game.fps;


        });
    },
    checkLevel: function () { //schaut, ob Level geschafft wurde
        var objects = game.level.objects;
        var won = true;
        for (var key in objects) {
            if (objects.hasOwnProperty(key)) {
                if (objects[key].progress < objects[key].wp) {
                    won = false;
                    break;
                }

            }
        }
        if (won) {
            game.levelRunning = false;
            game.level.stop = new Date().getTime();
            var time = game.level.stop - game.level.start;
            game.saveLevel(time);
            console.log(time);
        }
    },
    saveLevel: function (time) {
        var level = game.level.levelSet;
        var stars = game.getStars(time, level);
        var oldTime = "-";
        var newHi = false;
        if (game.data.level.hasOwnProperty(level) && game.data.level[level].hasOwnProperty("time"))
            oldTime = formatDate(game.data.level[level].time);

        if (!game.data.level.hasOwnProperty(level) || time < game.data.level[level].time) {
            //Neuer Rekord oder keine Daten vorhanden
            game.data.level[level] = {time: time, stars: stars};
            newHi = true;
        }
        game.saveGame();

        output.loadLevelSelect();
        events.levelSelectClick();
        output.hideCatsBar();
        output.showLevelDone(time, oldTime, stars, newHi);

    },
    getStars: function (time, level) {
        var starArr = levels[level].stars;
        for (var i = starArr.length - 1; i >= 0; i--) {
            if (time <= starArr[i] * 1000) {
                return i + 1; //Gibt die Position zurück; an Pos 2 ist der Wert für 3 Sterne gespeichert, i=2 +1 = 3 Sterne
            }
        }
        return 0;
    },
    stopLevel: function () {
        game.levelRunning = false;
    },
    checkLevelUnlocked: function (level) { //Erkennung für letzte Level hinzufügen #todo
        if (game.data.level.hasOwnProperty(level - 1) && game.data.level[level - 1].stars > 0 && levels.hasOwnProperty(level) || parseInt(level) === 1)
            return true;
        else
            return false;
    },
    checkLevelHasStar: function (level) {
        if (game.data.level.hasOwnProperty(level) && game.data.level[level].hasOwnProperty("stars"))
            return true;
        else
            return false;
    },
    checkLevelPlayed: function (level) {
        if (game.data.level.hasOwnProperty(level))
            return true;
        else
            return false;
    }

    //** Methods END ****

};
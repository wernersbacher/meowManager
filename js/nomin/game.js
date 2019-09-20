

/* global output, events, cats, tasks, objects, levels, money, eco, catUps */

var game = {};

game = {

    fps: 15,
    prevRuntime: 0,
    latency: 0,
    workTimer: false,
    totalTimer: false,
    autoWps: 1,
    restWps: 0.5,
    levelRunning: false,

    config: {
        max_expo_multi: 2,
        expo_default_power: 1.05
    },
    //++ Methods ++++
    init: function () {
        game.load();
    },
    load: function () {

        game.loadSavedGame();
        game.startSession();

        output.load();
        events.load();
        output.switchPage("mainmenu");
        output.switchManagePage("cats");

        if (!game.totalTimer)
            game.totalTimer = setInterval(function () {
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
    hardReset: function () {
        game.newGame();
        game.saveGame();
        location.reload(); 
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
    startSession: function () {
        var session = new Object;
        session.manageCat = "orange";
        session.catStats = {};
        game.session = session;
        game.updateAllCats();
    },
    newGame: function () {
        var data = new Object; //in game.data werden alle Daten fürs Savegame gespeichert
        data.stats = {
            money: 0,
            totalMoney: 0
        };

        data.level = {
            //hier werden die Daten zu den einzelnen leveln gespeichert
        };

        data.cats = {
            orange: {
                ups: {}
            }
        }; //Katzen, die der Spieler besitzt
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

        var catObj = game.data.cats; //Laden der Katzen vom Spieler
        for (var key in catObj) {
            if (catObj.hasOwnProperty(key)) {

                let cat = key;
                level.cats[cat] = {wpd: game.calcWPD(cat), wpd_max: game.calcWPD(cat), restorewps: game.calcRestoreWPS(cat)};
            }
        }

        level.activeCat = game.getFirstCat(); //nimmt die erste Katze als aktiv

        level.objects = {};
        level.assignTimes = {};
        level.levelSet = lvlnr;
        //Geht das Level durch und lädt die Objekte
        Object.entries(levels[level.levelSet].objects).forEach(([key, val]) => { //j ist der index des bereiches, der gemacht werden muss
            level.objects[key] = {wp: val.wp, wps: 0, owner: [], progress: 0, j: 0, done: false, auto: false, lastAuto: false};
        }); //game.level.objects[key]

        game.level = level;

        //Berechnet die Upgrades der Katzen neu
        game.updateAllCats();

        output.colorStorage = [];
        output.resetGrid();
        output.loadLevel();
    },
    getFirstCat: function () {
        return "orange";
    },
    startLevel: function () {
        game.level.start = (new Date).getTime();

        game.levelRunning = true;
        game.prevRuntime = 0;
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
            var start = levels[level].objects[key].start; //Start value for cats attention
            var end = levels[level].objects[key].end;
            var max_i = levels[level].objects[key].start.length;
            var wps = 0;
            var wp = game.level.objects[key]["wp"];
            var auto = true;
            var owner = game.level.objects[key]["owner"];
            var i = 0;
            var debug = "";

            function ende(k) {
                return calcWP(end[k], wp);
            }
            function anfang(k) {
                return calcWP(start[k], wp);
            }

            //Speichert den Auto Wert für den nächsten Durchgang
            game.level.objects[key].lastAuto = game.level.objects[key].auto;

            //Schaut, ob der Fortschritt im aktiven Bereich ist
            // checks if we are currently in an automatic area
            for (i = 0, l = start.length; i < l; i++) {
                if (progress >= anfang(i) && progress < calcWP(end[i], wp)) {
                    auto = false;
                    break;
                } else if (progress > ende(i) && XOR(progress >= ende(max_i) && progress < wp, progress < anfang(i+1) ) ) { //???? dont get it
                    //      ^^ progress bigger than end of i-iteration AND one of both: 
                    //  (position smaller than start from next it) xor (progress smaller as total AND progress is bigger as last cat-area)
                    auto = true;
                    break;
                }
            }
            game.level.objects[key].auto = auto;


            if (auto) { //if we are currently automatic..
                wps += game.autoWps; //calculateAutoWps()
            }

            if (owner.length) {
                
                //loop all the cats on an object
                for (var i = 0, l = owner.length; i < l; i++) {
                
                    if (auto) { //for the case that the object is automatic driven, show 0 wps and skippp
                        game.level.cats[owner[i]].wps = 0;
                        continue;   
                    }

                    
                    let catwps = game.calcWPSLive(owner[i]);
                    game.level.cats[owner[i]].wps = catwps;
                    
                    
                    
                    //Hier werden alle Katzen durchgegangen, die auf einem Objekt sitzen und entsprechend die wps erhöht
                    wps += catwps; //owner[i] = katze

                    //Abziehen der wpd der katze.
                    //console.log(owner[i], game.level.cats, game.level.cats[owner[i]].wpd);
                    game.level.cats[owner[i]].wpd -= catwps / game.fps;
                    if (game.level.cats[owner[i]].wpd < 0) {
                        //Wenn die Katze keine Energie mehr hat
                        game.level.cats[owner[i]].wpd = 0;
                        output.hideCats(owner[i]);
                        game.level.objects[key].owner.remove(owner[i]); //Entfernen der Katze aus Array, wenn sie erschöpft ist
                    }
                }
            }

            

            function checkProg() {
                if (game.level.objects[key]["progress"] >= wp) {
                    game.level.objects[key]["progress"] = wp;
                    if (game.level.objects[key].done === false) { //beim erstmaligen überschreiten
                        game.level.objects[key].done = true;
                        game.checkLevel();
                        output.show100(key);
                    }
                }
            }


            var progress = game.level.objects[key]["progress"],
                    wpsNow = wps / game.fps,
                    j = game.level.objects[key]["j"],
                    done = game.level.objects[key].done;
            if (key === debug)
                console.log(progress, wpsNow, progress, ende(i));

            if (key === debug)
                console.log(auto, game.level.objects[key].auto);
            //console.log(progress, wpsNow, owner.length, auto, done, anfang(j), j, calcWP(start[i], wp), calcWP(end[i], wp));

            if (done) {

            } else if (progress + wpsNow >= ende(j) && !auto) { //sollte es weiter springen als über den eigenen bereich als katze
                game.level.objects[key]["progress"] = ende(j);
                if (j < max_i) {//nur wenn es so viele bereiche gibt, darf es erhöhen
                    game.level.objects[key]["j"] += 1;
                }
                if (key === debug)
                    console.log("katze zu weit");
            } else if (progress + wpsNow > anfang(j) && auto) {
                if (key === debug)
                    console.log("auto zu weit");
                game.level.objects[key]["progress"] = anfang(j);
            } else {
                if (key === debug)
                    console.log("just go");
                game.level.objects[key]["progress"] += wpsNow;
            }

            checkProg();

        });

        //Aufladen der Katzenenergie
        var katzen = game.level.cats;
        for (var key in katzen)
            if (katzen.hasOwnProperty(key)) {
                var object = ownerToObject(key, game.level.objects);
                if (!object || game.level.objects[object].auto) {
                             
                    
                    var add = katzen[key].restorewps / game.fps,
                            max_wpd = katzen[key].wpd_max,
                            wpd = katzen[key].wpd;
                    
                    if (wpd + add > max_wpd)
                        game.level.cats[key].wpd = max_wpd;
                    else
                        game.level.cats[key].wpd += add;

                }
            }

    }, //Kalkuliert die Faktoren live anhand der gespeicherten upgrades
    calcWPS: function (cat) {
        var wps = cats[cat].wps; // base values
        var wps_multi = game.session.catStats[cat].wps;

        return wps * wps_multi;
    },
    calcWPD: function (cat) {
        var wpd = cats[cat].wpd;
        var multi = game.session.catStats[cat].wpd;
        return wpd * multi;
    },
    calcEXPO: function (cat) { //that value doesn't change over a level
        var expo = cats[cat].expo;
        var multi = game.session.catStats[cat].expo;
        return expo * multi;
    },

    calcRestoreWPS: function(cat) {
        var base = game.restWps;
        var cat_base = cats[cat].restore; 
        var multi = game.session.catStats[cat].restoring;
        return (cat_base+(multi-1))*base; //calc restore, has to be zero if no restore multi
    },

    calcWPSLive: function (cat) { 
        var base_wps = game.calcWPS(cat);
        
        var expo = game.calcEXPO(cat); //load expo from cat
        var now = timestamp(); //get now time

        var start_time = game.level.assignTimes[cat];
        var since = (now-start_time)/1000;

        var limit = game.calcEXPOLimit(cat);
        var expo_factor = game.calcEXPOFactor(since, expo, limit) //calculate boost from staying at same task

        return base_wps * expo_factor;
    },

    calcEXPOLimit: function(cat) {
        var limit = game.config.max_expo_multi;
        var multi = game.session.catStats[cat].expo_limit;
        return limit * multi;
    },

    calcEXPOFactor: function (time, expo_base, expo_limit) { //that value changes while playing
        // formula 
        return Math.min(1 + (expo_base-1)*Math.pow(time, game.config.expo_default_power), expo_limit)
    },

    updateAllCats: function () {
        //if user has cat, updateCatUps()
        var userCats = game.data.cats;
        for (var cat in userCats) {
            if (userCats.hasOwnProperty(cat)) {
                game.updateCatUps(cat);
            }
        }
    }, //upgrades are here, needs better idea for special upgrades
    updateCatUps: function (cat) {
        var ups = game.data.cats[cat].ups;
        var wps = 1,
                wpd = 1,
                expo = 1,
                expo_limit = 1,
                restoring = 1;
        /* TODO:
            dont check hardcoded for updates?
        */
        for (var up in ups) { //durchgehen der upgrades der katze
            if (ups.hasOwnProperty(up)) { //obligatorisch
                //wenn das upgrade bei wps zu finden ist..
                if (catUps.wps.hasOwnProperty(up)) {
                    wps *= Math.pow(catUps.wps[up].multi, ups[up]); //berechnet den multi des ups hoch anzahl des bessenenen
                
                } else if (catUps.wpd.hasOwnProperty(up)) {
                    wpd *= Math.pow(catUps.wpd[up].multi, ups[up]);
                
                } else if (catUps.expo.hasOwnProperty(up)) {
                    expo *= Math.pow(catUps.expo[up].multi, ups[up]);
                
                } else if (catUps.expo_limit.hasOwnProperty(up)) {
                    expo_limit *= Math.pow(catUps.expo_limit[up].multi, ups[up]);
                
                } else if (catUps.restoring.hasOwnProperty(up)) {
                    restoring *= Math.pow(catUps.restoring[up].multi, ups[up]);
                } 

                //restoring
            }
        }
        game.session.catStats[cat] = {wps: wps, wpd: wpd, expo: expo, expo_limit: expo_limit, restoring:restoring};
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
            var oStars = 0;
            if (game.data.level.hasOwnProperty(level))
                oStars = game.data.level[level].stars;
            game.data.level[level] = {time: time, stars: stars};
            newHi = true;
            if (stars > oStars) { //belohnung für sterne
                eco.addMoney(eco.calcMoneyWin(stars - oStars, level));
            }
        }

        //Belohnung für levelabschluss
        eco.addMoney(Math.ceil((level + 1) / 3));

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
    },
    hasCat: function (cat) {
        return game.data.cats.hasOwnProperty(cat);
    }

    //** Methods END ****

};
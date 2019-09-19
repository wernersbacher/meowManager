Array.prototype.sortNormal = function () {
    return this.sort(function (a, b) {
        return a - b;
    });
};

Array.prototype.hasVal = function (val) {
    return this.indexOf(val) > 1;
};

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function cl(x) {
    for (var i = 0; i < arguments.length; i++)
        console.log(arguments[i]);
}

function XOR(a, b) {
    return (a || b) && !(a && b);
}

function val2key(val, array) {
    for (var key in array) {
        this_val = array[key];
        if (this_val === val) {
            return key;
            break;
        }
    }
}

function ownerToObject(owner, obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            //obj[key] ist das Objekt mit wps, owner, ...
            //key ist gesucht für den richtigen owner

            if (obj[key].owner.indexOf(owner) > -1)
                return key;

        }
    }
    return false;
}

function precise_round(num, decimals) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function two(x) {
    return precise_round(x, 2);
}

function calcWP(range, wp) {
    return (range * wp) / 100;
}

function formatDate(msec) //Sekunden formatieren
{
    var sec = parseInt(msec / 1000);
    msec = (msec % 1000) / 1000; //Bleibt übrig, zb 800

    var minuten = parseInt(sec / 60);
    sec = sec % 60;
    var stunden = parseInt(minuten / 60);
    minuten = minuten % 60;
    var tage = parseInt(stunden / 24);
    stunden = stunden % 24;

    var ausgabe = "";
    if (tage > 0) {
        ausgabe += tage + "d, " + stunden + "h";
        if (minuten !== 0)
            ausgabe += ", " + minuten + "m";
    } else if (stunden > 0)
        ausgabe += stunden + "h, " + minuten + "m";
    else if (minuten > 0)
        ausgabe += minuten + "m";

    //hier noch die millisekunden addieren
    sec = precise_round(sec + msec, 3);

    if (ausgabe === "")
        ausgabe += sec + "s";
    else if (sec !== 0)
        ausgabe += ", " + sec + "s";

    return ausgabe;

}

/*
 * COLOR FADE HELPER
 * https://jsfiddle.net/fxftm4ub/1/
 */
function colorString(r, g, b) {
    r = Math.min(255, Math.max(0, Math.round(r)));
    g = Math.min(255, Math.max(0, Math.round(g)));
    b = Math.min(255, Math.max(0, Math.round(b)));
    return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2)
}

function average(a, b, percent) {
    var gamma = 4;
    var a_2 = Math.pow(a, gamma);
    var b_2 = Math.pow(b, gamma);
    var c_2 = a_2 + (b_2 - a_2) * percent
    return Math.pow(c_2, 1 / gamma);
}
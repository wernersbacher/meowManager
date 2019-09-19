/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getUpById(upID) { //Gibt das Objekt aus, wenn nicht, wird false gegegeben
    for (var kind in catUps) { //WPS, WPD, etc
        if (catUps.hasOwnProperty(kind)) {
            var ups = catUps[kind];
            for (var upKey in ups) { //cat workout 1, cat workout 2, etc
                var up = ups[upKey];
                if (up.id === upID)
                    return up;
            }
        }
    }
    return false;
}

/* global game, output, catUps */

//wirtschaft
var eco = {
    addMoney: function (x) {
        game.data.stats.money += x;
        game.data.stats.totalMoney += x;
        eco.moneyCallBack();
    },
    removeMoney: function (x) {
        game.data.stats.money -= x;
        eco.moneyCallBack();
    },
    moneyCallBack: function() {
        game.saveGame();
        output.updateMoney();
    },
    getMoney: function () {
        return game.data.stats.money;
    },
    calcMoneyWin: function (stars, lvl) {
        return stars * lvl;
    },
    calcUpCost: function (cost, num) {
        return cost * (num + 1);
    },
    buyUp: function (id, cost) {
        var cat = game.session.manageCat;
        if(game.data.cats[cat].ups.hasOwnProperty(id)) {
            game.data.cats[cat].ups[id] += 1;
        } else {
            game.data.cats[cat].ups[id] = 1;
        }
        game.updateAllCats(); //updatet alle Katzen infos.
        eco.removeMoney(cost);
        
    },
    getUpCost: function (upgrade) { //Gibt die Kosten eines Upgrades anhand der ausgewählten Katze wider
        var cat = game.session.manageCat;
        var num = 0;

        if (game.data.cats[cat].ups.hasOwnProperty(upgrade))
            num = game.data.cats[cat].ups[upgrade];

        return eco.calcUpCost(getUpById(upgrade).cost, num);
    }
};
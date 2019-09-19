/* global game */

window.onerror = error;

function error(Nachricht, Datei, Zeile) {
    var fehler = Nachricht + "\n" + Datei + "\n" + Zeile;
    //zeige fehlercode
    console.log(fehler);
    $("#onerror").append("<hr/>" + fehler).parent().show();
    return true;
}


$(document).ready(function () {

    game.init();

});

// TODO

/* 2019
 * commenting doProgress code, implement EXPO

*/

/* outoffocus: pause 
 * pause einbauen
 * achievements
 * 
 * katzen haben mehrere unterschiedliche eigenschaften: work per second, time to start, expo faktor
 * manche haben bonus-dinge wie zB: erhöht auch den fortschritt wenn etwas alleine läuft
 * katzen werden freigeschaltet mit exp, level können für exp wiederholt werden
 * später mit upgrade: 2 katzen auf einmal
 * random events verschafft einem zeit, oder 100% bringen
 * level deklarationen: - automatic wps
 * manche dinge laufen rückwärts, zB kochen, manche erst nach einer bestimmten zeit, je höher das level desto schwieriger
 * tutorial: dinge nacheinander einblenden, bei level 1 der hinweis mit den farben, etc
 * fortschritte gehen nach einiger zeit zurück, je höher das level,desto stärker, manche dinge gar nicht
 * obere leiste: restart level und zurück button
 * 
 * timer und energie anzeige
 * stats hinzufügen
 * katze kann milch trinken
 * katze hat energie: wird leer, muss man auffrischen lassen (nur bei einsatz), wird erst später eingeführt
 * ausruhen: wenn katze ausgeruht ist, wird sie kurz doppelt so gut
 * 
 * währung, um sachen zu upgraden, etcs
 * 
 * katzenenrgie: aufhören
 * obere linie im handy funzt noch nicht, usb debugging
 * 
 * nächster bug: farbe bleibt nicht weiß (2x änderung?)
 *              nach ende des spieles sollte nicht mehr geklickt werden können -> zurück zum levelselect
 *              springt zurück in der mitte
 * info button oben rechts, statt settings, der immer hilft
 * 
 * energie lädt auf, wenn nicht eingesetzt; energie balken anzeigen
 * upgrades für katzen und alles andere
 * katze wechseln möglich
 * reset knopf
 * sterne bekommen durch abschluss von level? immer mind 1. bzw paws *lvl
 * küchen upgrade, etc automatisch
 */

/*
 * objekt ideen:
 * rasenmähen
 * katzenklo säubern
 * fenster putzen
 * entsaften
 * ausruhen?
 * kaffestation?
 */
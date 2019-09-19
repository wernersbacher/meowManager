var levels = {
    1: {
        objects: {
            washmachine: {
                wp: 10,
                start: [0, 90], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [10, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 10,
                start: [0, 40, 95], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [20, 80, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            mop: {
                wp: 10, //Beschreibung
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [90] //Gibt Ende des Bereiches an
                         //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [28, 20, 17],
        title: "Beginner"
    },
    2: {
        objects: {
            washmachine: {
                wp: 17,
                start: [0, 90], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [10, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 20,
                start: [0, 40, 95], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [20, 80, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            mop: {
                wp: 15, //Beschreibung
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [90] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [50, 40, 30],
        title: "Beginner 2"
    },
    3: {
        objects: {
            washmachine: {
                wp: 15,
                start: [0, 70], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [30, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 20,
                start: [0, 40, 95], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [20, 80, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            mop: {
                wp: 10, //Beschreibung
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [45, 35, 27],
        title: "Beginner 3"
    },
    4: {
        objects: {
            washmachine: {
                wp: 25,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 20,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [50, 40, 25],
        title: "Beginner 4"
    },
    5: {
        objects: {
            washmachine: {
                wp: 20,
                start: [0, 90], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [10, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 20,
                start: [0, 40, 95], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [20, 80, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            mop: {
                wp: 25, //Beschreibung
                start: [0, 80], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [35, 90] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [40, 30, 20],
        title: "Beginner 5"
    },
    6: {
        objects: {
            washmachine: {
                wp: 80,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [60, 50, 40],
        title: "Tank 1"
    },
    7: {
        objects: {
            washmachine: {
                wp: 70,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [5] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 30,
                start: [0, 40, 95], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [20, 80, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            mop: {
                wp: 54, //Beschreibung
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [95] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [95, 75, 60],
        title: "Tank 2"
    },
    8: {
        objects: {
            washmachine: {
                wp: 10,
                start: [0, 90], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [10, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 10,
                start: [0, 40, 95], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [20, 80, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            mop: {
                wp: 10, //Beschreibung
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [90] //Gibt Ende des Bereiches an
                         //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [17, 12, 8],
        title: "Retro"
    },
    9: {
        objects: {
            washmachine: {
                wp: 17,
                start: [0, 90], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [10, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 20,
                start: [0, 40, 95], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [20, 80, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            mop: {
                wp: 15, //Beschreibung
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [90] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [33, 20, 15],
        title: "Retro 2"
    }
};
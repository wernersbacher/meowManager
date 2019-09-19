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
        stars: [25, 17, 12],
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
        stars: [35, 24, 18],
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
                wp: 15,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 10,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [35, 20, 15],
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
        stars: [40, 30, 22],
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
                wp: 50,
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
                wp: 34, //Beschreibung
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [95] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [75, 65, 40],
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
        stars: [17, 11, 6],
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
    },
    10: {
        objects: {
            washmachine: {
                wp: 20,
                start: [0, 30, 60, 70, 80, 92], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [10, 40, 65,71,90, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            kitchen: {
                wp: 20,
                start: [10, 34, 80, 95], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [20, 37, 90, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            mop: {
                wp: 20, //Beschreibung
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [90] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [33, 20, 15],
        title: "Retro 2"
    },
    11: {
        objects: {
            washmachine: {
                wp: 200,
                start: [0, 60], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [40, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [150, 110, 70],
        title: "Just laundry"
    },
    12: {
        objects: {
            chimney: {
                wp: 200,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [200, 180, 100],
        title: "Lean back"
    },
    13: {
        objects: {
            washmachine: {
                wp: 20,
                start: [0, 30, 60, 70, 80, 92], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [10, 40, 65,71,90, 100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            chimney: {
                wp: 50,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            },
            fire: {
                wp: 10,
                start: [0], //Gibt die Startwerte in Prozent an, bei der der Spieler aktiv sein muss
                end: [100] //Gibt Ende des Bereiches an
                        //Sortieren nach Zahl aufsteigend, for(i) start[i] - end[i] ist der bereich.
            }
        },
        stars: [40, 30, 25],
        title: "Fire fun"
    }
};
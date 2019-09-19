var cats = {
    orange: {
        wps: 1.5,
        delay: 0,
        expo: 1.05,
        wpd: 100,
        bonus: ["washmachine"],
        desc: "Orange cat"
    },
    brown: {
        wps: 2.5,
        delay: 1,
        expo: 1.02,
        wpd: 150,
        bonus: ["washmachine"],
        desc: "brown"
    },
    black: {
        wps: 7,
        delay: 3,
        expo: 1.05,
        wpd: 500,
        bonus: ["washmachine"],
        desc: "NIIIINJA"
    }

};

//var upKind = {wps: multi, wpd: multi, xy: add}

var catUps = {
    wps: {
        workout: {
            id: "workout",
            label: "Cat Workout",
            desc: "[Beginner Training] Get 5% more WPS",
            cost: 5,
            multi: 1.05,
            count: 5
        },
        workout2: {
            id: "workout2",
            label: "Cat Workout #2",
            desc: "Get 15% more WPS",
            cost: 15,
            multi: 1.15,
            count: 5
        },
        workout3: {
            id: "workout3",
            label: "Cat Workout #3",
            desc: "Double your WPS!!!!",
            cost: 50,
            multi: 2,
            count: 5
        }
    },
    wpd: {
        massage: {
            id: "massage",
            label: "Cat Massage",
            desc: "Get 5% more WPD",
            cost: 5,
            multi: 1.05,
            count: 5
        },
        treat: {
            id: "treat",
            label: "Cat Treat",
            desc: "Get 15% more WPD",
            cost: 15,
            multi: 1.15,
            count: 5
        },
        milk: {
            id: "milk",
            label: "Cat Milk",
            desc: "Get 30% more WPD",
            cost: 50,
            multi: 1.3,
            count: 5
        }
    },
    expo: {
        cheez: {
            id: "cheez",
            label: "Can I Haz Cheezburger?",
            desc: "The longer your cat works, the faster it will work.",
            cost: 5,
            multi: 1.1,
            count: 5
        },
        yes: {
            id: "yes",
            label: "Yes",
            desc: "Almost...",
            cost: 15,
            multi: 1.3,
            count: 5
        },
        canhas: {
            id: "canhas",
            label: "You can has",
            desc: "Hyper Motivation!",
            cost: 50,
            multi: 1.75,
            count: 5
        }
    }
};

var gameUps = {
    
};
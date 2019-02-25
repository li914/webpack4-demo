function log() {
    console.log("log function");
}
log();

let n = 6;

class name {
    constructor() {
        this.name = "lis";
    }

    call() {
        console.log(this.name);
    }
}

let a = new name();
a.call();



var b = (msg) => () => msg;

var bobo = {
    _name: "BoBo",
    _friends: [],
    printFriends() {
        this._friends.forEach(f =>
            console.log(this._name + " knows " + f));
    }
};

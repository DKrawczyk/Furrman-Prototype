console.log("hello");
console.log("hehe");

var Coin = require("./coin.js");
var Furry = require("./furry.js");

function Game() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    
    this.index = function(x,y) {
        return x + (y*10);
    }

    this.showFurry = function () {

        if (document.querySelector(".furry") != null) {
            this.hideVisibleFurry();
        }

        var position = this.board[this.index(this.furry.x, this.furry.y)];

        if (position !== undefined) {
            position.classList.add('furry');
        }
    };
    
    this.showCoin = function () {
        this.board[this.index(this.coin.x,this.coin.y)].classList.add("coin");
    }

    var self = this;
    this.startGame =  function () {

        this.idSetInterval = setInterval(function(){
            self.moveFurry();
        }, 250);
    }

    this.moveFurry = function () {
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
    }
        else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === "bottom") {
            this.furry.y = this.furry.y +1;
        }
        else if (this.furry.direction === "top") {
            this.furry.y = this.furry.y -1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    }

    this.hideVisibleFurry = function () {
        var div = document.querySelector(".furry");
        div.classList.remove("furry");
    }

    this.moveDirection = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "top";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "bottom";
                break;
        }
    }

    document.addEventListener("keydown", function(event){
        self.moveDirection(event);
    });


    this.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {

            var coinPointsy = document.querySelector(".coin");
            coinPointsy.classList.remove("coin"); 
            this.score++;
            var scorePointsy = document.getElementById("scoreNumber");
            scorePointsy.innerHTML = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(1);
        }
    }
}


var start = new Game();
start.showFurry();
start.showCoin();
start.startGame();



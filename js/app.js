console.log("hello");

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

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

    this.board [this.index(this.furry.x,this.furry.y) ].classList.add("furry");
    }
    
    this.showCoin = function () {
        this.board [this.index(this.coin.x,this.coin.y) ].classList.add("coin");
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
        this.showFurry();
        this.checkCoinCollision();
        this.gameOver();
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

            // tu jest blad
            var coinPointsy = document.querySelector(".coin") // <--
            coinPointsy.classList.remove("coin"); // <--
            this.score++;
            var scorePointsy = document.getElementById("scoreNumber")
            scorePointsy.innerHTML = this.score;
            this.Coin = new Coin();
            this.showCoin();
        }
    }

    // nie dziala wzgledem gory i dolu
    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(1);
            this.hideVisibleFurry();
        }
    }
}


var start = new Game();
start.showFurry();
start.showCoin();
start.startGame();
// start.checkCoinCollision(); <-- na dwa sposoby probowalem


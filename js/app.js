/*----------------------------------------------------------------------------*/
/*-----------------------------Enemy------------------------------------------*/

// Enemies our player must avoid
var Enemy = function(x, y, startSpeed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = startSpeed;

    console.log('enemy created');

};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {


    this.x += dt * this.speed;
    if (this.x > 700) {
        this.x = -100;
        this.randomSpeed();
    }



};

//random speed generator
Enemy.prototype.randomSpeed = function() {
    this.speed = speedMultiplier * getRandomInt(1, 5);

};

// Draw the enemy on the screen, score and life
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "bold 24px serif";
    ctx.fillText("Score: " + player.score, 40, 70);
    ctx.fillText("Life: " + player.life, 175, 70);

};



// Enemies object that spawned ramdomly will be massively spawned on the screen to block the road way(fun) , has the constant speed(slow) 
var RandomSpawned = function(x, y, startSpeed) {
    Enemy.call(this, x, y, startSpeed);

    this.sprite = 'images/enemy-bug.png';

    console.log('RandomSpawned created');

};

// Draw the enemy on the screen
RandomSpawned.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
// Update the enemy's position, required method for game and check player collision
// Parameter: dt, a time delta between ticks
RandomSpawned.prototype.update = function(dt) {


    this.x += dt * this.speed;
    //random enemy reachs the goal will be stoped and deleted to reserve computer memory
    if (this.x > 700) {
        this.x = -200;
        this.speed = 0;
        console.log("lucky spawn has stopped");
    }
    //deleted used enemy
    if (this.speed == 0) {
        allRandomSpawned.shift();
    }
    //check player collision
    if (player.x < this.x + 50 && this.x < player.x + 50 && player.y == this.y) {
        player.backToStart();
        player.life -= 1;
        gameSound.playDeath();
    }

};




// Spawning random enemy
var Spawner = function() {
    //this attribute got randomed repeatly
    this.luckySpawn = 0;
    console.log('Spawner created');

};
//keep the number run until the condition met then spawn the enemy
Spawner.prototype.update = function(dt) {
    //keep calling 
    this.randomSpawn();

};

Spawner.prototype.randomSpawn = function() {
    //1 in 400 chances that extra enemy will be spawned
    this.luckySpawn = getRandomInt(1, 300);
    //if the number is 90 spawn the enemy
    if (this.luckySpawn == 90) {
        // enemy spawned with startspeed (slow speed)
        allRandomSpawned.push(new RandomSpawned(-100, 219 - (83 * getRandomInt(1, 3)), startSpeed));



        console.log("initiated lucky spawn");
    }

};




// player class
class Hero {
    constructor() {
        this.x = 303;
        this.y = 385;
        this.sprite = 'images/char-boy.png';
        this.score = 0;
        this.life = 4;


    }
    //draw a player
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //player crashed into enemy bringed back to start point 
    backToStart() {
        
        //start point
        this.x = 303;
        this.y = 385;
    }
    // Move the player according to keys pressed
    handleInput(input) {
        //stepping sound
        gameSound.playStep();
        switch (input) {
            case 'left':

                // set a boundary on the leftside and move the player to the left
                if (this.x < 90) {
                    break;
                }
                this.x -= 101;
                break;
            case 'up':
                //move the player up and check if the player reach the goal
                if (this.y - 83 < -73) {
                    //player reach top and score winning sound played
                    this.win();
                }
                this.y -= 83;
                break;
            case 'right':
                //  set a boundary on the rightside and move the player to the right
                if (this.x > 500) {
                    break;
                }
                this.x += 101;
                break;
            case 'down':
                //zoning the bottom of the map and move the player down
                if (this.y > 350) {
                    break;
                }
                this.y += 83;
                break;
        }
    }
    //looping to check enemy collision (but not the random spawned one which will be checked in its own)
    update() {
        for (let enemy of allEnemies) {
            if (this.x < enemy.x + 50 && enemy.x < this.x + 50 && this.y == enemy.y) {
                this.backToStart();
                this.life -= 1;
                //death sound
                gameSound.playDeath();

            }
        }
        // check if the player has 0 life then gameover
        if (this.life == 0) {
            console.log("game Over");
            gameOver();
        }

    }
    //reset the game to the start
    heroAndGameReset() {
        this.x = 202;
        this.y = 385;
        this.life = 4;
        this.score = 0;
        speedMultiplier = 20;
    }
    // the player reach the goal and get the score and the game become harder by faster enemies each time player reach the goal
    win() {
        console.log("score!!");
        this.backToStart();
        this.score += 20;
        //speed up enemies
        speedMultiplier += 2;
        gameSound.playWin();
    }



}

/*----------------------------------------------------------------------------*/
/*-----------------------------Item------------------------------------------*/

class Item {
    constructor(x, y, sprite, name) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.name = name;
    }
    // reappear the item with time constraint
    itemReset() {
        this.x = (0 + 101 * Math.floor(Math.random() * 6));
        this.y = (219 - 83 * Math.floor(Math.random() * 2));

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update(dt) {
        this.checkCollision();

    }
    //check if player collide with item and collect it
    checkCollision() {
        if (player.x == this.x && player.y == this.y) {
            console.log('item Collected')

            this.itemCollected();
        }
    }
    // item has collected will be move beyond the frame and wait to be spawn randomly
    itemCollected() {
        this.x = 1000;
        this.y = 1000;
        if (this.name == "gem") {
            gameSound.playGem();
            player.score += 50;
            setTimeout(() => {
                this.itemReset();
            }, 15000);
        } else {
            gameSound.playLife();
            player.life += 1;
            setTimeout(() => {
                this.itemReset();
            }, 30000);
        }



    }
}

//gem class subclasses from item
class Gem extends Item {
    constructor(x, y, sprite, name) {
        super(x, y, sprite, name);
    }
}
//heart class subclasses from item
class Heart extends Item {
    constructor(x, y, sprite, name) {
        super(x, y, sprite, name);
    }
}



//Sound effect to make game more lively
class SoundEffect {
    constructor() {
        this.jumpAudio = new Audio;
        this.gemAudio = new Audio;
        this.chocoboAudio = new Audio;
        this.finalfantasyAudio = new Audio;
        this.lifeAudio = new Audio;
        this.deathAudio = new Audio;
    }

    playStep() {
        this.jumpAudio.src = 'sounds/jump.wav';
        this.play(this.jumpAudio);
    }
    playGem() {
        this.gemAudio.src = 'sounds/gem.mp3';
        this.play(this.gemAudio);
    }
    playLife() {
        this.lifeAudio.src = 'sounds/life.wav';
        this.play(this.lifeAudio);
    }
    playWin() {
        this.finalfantasyAudio.src = 'sounds/win.mp3';
        this.play(this.finalfantasyAudio);
    }
    playDeath() {
        this.deathAudio.src = 'sounds/death.wav';
        this.play(this.deathAudio);
    }
    play(audio) {
        audio.play();
    }

}


var input = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', input);


// helper function to get random number for spawning enemy
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


/*----------------------------------------------------------------------------*/
/*-------------------------Instantiate Objects--------------------------------*/
const player = new Hero();
const theWomb = new Spawner();
const allRandomSpawned = [];
const allEnemies = [];
const gameSound = new SoundEffect();
const testGem = new Gem((0 + 101 * Math.floor(Math.random() * 6)), (219 - 83 * Math.floor(Math.random() * 2)), 'images/Gem_Green.png', 'gem');
const testHeart = new Heart((0 + 101 * Math.floor(Math.random() * 6)), (219 - 83 * Math.floor(Math.random() * 2)), 'images/Heart.png', 'heart');
//speed of the enemy ( not the random spawned one)
let speedMultiplier = 20;
//create enemies
for (var i = 0; i < 3; i++) {
    //startSpeed is a random number from 1-10 times speedMultiplier
    var startSpeed = speedMultiplier * getRandomInt(1, 5);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 219 - (83 * i), startSpeed));
}



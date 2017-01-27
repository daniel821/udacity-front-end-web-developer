var score = 0;
var possibleX = [0, 100, 200, 300, 400];
var possibleY = [55, 140, 225, 310];

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = Math.floor((Math.random() * 400) + 200);
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x += (this.speed * dt);
    } else {
        this.x = -100;
    }

    // Handle collision
    if (this.x < player.x + 30 &&
        this.x + 60 > player.x &&
        this.y + 30 > player.y &&
        this.y < player.y + 60) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    // Handle player go over water
    if (this.y < 20) {
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction == 'left' && this.x > 0) {
        this.x -= 100;
    } else if (direction == 'right' && this.x < 400) {
        this.x += 100;
    } else if (direction == 'up' && this.y > 3) {
        this.y -= 100;
    } else if (direction == 'down' && this.y < 400) {
        this.y += 100;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 310;
};

var Heart = function() {
    this.sprite = 'images/Heart.png';
    this.x = 200;
    this.y = 55;
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Heart.prototype.update = function() {
    // Handle when player collects heart
    if (this.x < player.x + 30 &&
        this.x + 60 > player.x &&
        this.y + 30 > player.y &&
        this.y < player.y + 60) {
        score += 1;
        $('#score').text(score);
        this.x = possibleX[Math.floor(Math.random() * possibleX.length)];
        this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
        player.reset();
    }
};

var player = new Player();
var heart = new Heart();
var allEnemies = [
    new Enemy(-100, 55),
    new Enemy(-100, 140),
    new Enemy(-100, 225)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

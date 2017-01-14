console.log(Phaser);

//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at 0.
var score = 0;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){

//These four things sets the assets for the game. If you want to add music or images, there is where you would preload it.
  game.load.image('background', 'assets/background.png');
  game.load.image('player', 'assets/player.png');
  game.load.image('ground', 'assets/wallHorizontal.png');
  game.load.image('obstacle', 'assets/wallVertical.png');
  game.load.image('coin', 'assets/coin.png');
  game.load.image('enemy', 'assets/enemy.png');
  game.load.image('special', 'assets/special.png');

  //If you'd like to load music files, the format would look like  game.load.audio('[name of music]', ['[location for music file]']);
}

function create() {
  //This sets the game physics to Arcade style.
  	game.physics.startSystem(Phaser.Physics.ARCADE);

  	game.stage.backgroundColor = '#0061ff';

  //This sets up a group call platfroms. For future functionality we can set all horizontal surfaces to this group.
  	platfroms = game.add.group();
  	platfroms.enableBody = true;

  //This creates the groud, and makes it solid object the player will not pass through.
  	ground = platfroms.create(0, GAME_HEIGHT, 'ground');
  	ground.anchor.setTo(0,1);
  	ground.scale.setTo(4, 1);
	game.physics.arcade.enable(ground);
  	ground.body.immovable = true;

  //This creates the player character at the bottom left side of the screen.
  	player = game.add.sprite(game.width/2, game.world.height*(7/8), 'player'); 
  	game.physics.arcade.enable(player);

  //This creates the first obstacle on the right side of the screen.
  obstacle = game.add.sprite(1000,game.world.height, 'obstacle');
  obstacle.scale.setTo(1,0.2);
  obstacle.anchor.setTo(0,1);
  game.physics.arcade.enable(obstacle);
   obstacle.body.immovable = true;

  //This sets the spacebar key as the input for this game.
  	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  	console.log(spaceKey);

  //This sets the physics on the player in terms of the gravity and the bounce.
  	player.body.bounce.y = 0.2;
  	player.body.gravity.y = 600;

  //This adds the scoreboard on the top left side of the screen.
  	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  //Coin
    coin = game.add.sprite(500, 520, 'coin');
    game.physics.arcade.enable(coin);

  //Enemy
    enemy = game.add.sprite(650, 545, 'enemy');
    game.physics.arcade.enable(enemy);

  //Special
    special = game.add.sprite(630, 800, 'special');
    game.physics.arcade.enable(special);
};

function update(){
  //This is where the game engine recognizes collision betwen the player and the ground or the obstacle.
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, obstacle);
  game.physics.arcade.overlap(player, coin, colllectCoin, null, this);
  game.physics.arcade.overlap(player, enemy, enemyIsBad, null, this);
  game.physics.arcade.overlap(player, special, specialFun, null, this);

  //This allows the player to jump only if you press the space key and the player is touching the something at the bottom.
  	if (spaceKey.isDown && player.body.touching.down) {
  		console.log('erorior');
  		player.body.velocity.y = -300;
  	}

  //This creates a plave to add sound when the obstacle reaches the player.
  	if (obstacle.x > 600) {
  		obstacle.x -= 0.05;
  	}

  //Coin
    if (coin.x > 1) {
      coin.x -= 0.05;
    }

  //Enemy
    if (enemy.x > 1) {
      enemy.x -= 0.05;
    }

  //Special
    if (special.x > 1) {
      special.x -= 0.07;
    }

  //This will create a new wall if the old wall goes off the screen
  	if (obstacle.x < 0) {
  		obstacle.kill();
  		obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
  		obstacle.scale.setTo(1,0.2);
  		obstacle.anchor.setTo(0,1);
  		game.physics.arcade.enable(obstacle);
  		obstacle.body.immovable = true;
  	}
  //Coin
    function colllectCoin(){
      console.log("eawiuefwuwaefiuwuiw")
      coin.kill();
      makeCoin();
    }

    function makeCoin(){
      console.log('coin')
        coin.kill();
        score+=1;
        scoreText.text = 'score: ' + score;
        coin = game.add.sprite(800, 520, 'coin');
        game.physics.arcade.enable(coin);  
    }

    if (coin.x < 0) {
     makeCoin();
    }

  //Enemy
    function enemyIsBad(){
      console.log("eawiuefwuwaefiuwuiw")
      enemy.kill();
      score--;
      scoreText.text = 'score: ' + score;
      makeEnemy();
    }

    function makeEnemy(){
      console.log('enemy')
        enemy.kill();
        enemy = game.add.sprite(800, 545, 'enemy');
        game.physics.arcade.enable(enemy);  
    }

    if (enemy.x < 0) {
     makeEnemy();
    }

  //Special
    function iIsSpecial(){
      special.kill();
      specialFun();
    }

    function specialFun(){
      console.log('special')
        special.kill();
        score+=5;
        scoreText.text = 'score: ' + score;
        special = game.add.sprite(800, 545, 'special');
        game.physics.arcade.enable(special);  
    }

    if (special.x < 0) {
     specialFun();
    }

  //This will update the score if the player has not been pushed off the screen, and the wall has gone off the left side.
  	if (obstacle.x < 5 && player.x > 5) {
  		score++;
  		scoreText.text = 'score: ' + score;
  	}
  //This will tell you "YOU LOSE!!!!!!😝" if the player is pushed off the left side of the screen!
  	if (player.x < 0) {
  		scoreText = game.add.text(350,200, 'YOU LOSE!!!!!!😝', {fill: '#e24848'});
  		obstacle.kill();
  		player.kill();
      coin.kill();
      enemy.kill();
      special.kill();
  	}
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();

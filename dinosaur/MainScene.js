class MainScene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        this.load.image('player', 'player.png');
        this.load.image('enemy', 'enemy.png');
        this.load.image('ground', 'ground.png');
    }
    
    create() {
        this.frame = 0;
        this.score = 0;
        this.scoreText;
        this.isGameOver = false;
        this.isJumping = false;
        this.enemySpeed = 6;
        this.speedFlag = true;

        this.ground = this.physics.add.staticSprite(700, 400, 'ground');

        this.player = this.physics.add.sprite(180, 300, 'player');
        this.playerWidth = this.player.width;
        this.playerHeight = this.player.height;
        this.player.body.setSize(this.playerWidth * 0.8, this.playerHeight * 0.8);


        this.enemies = this.physics.add.group();
        for (let i = 0; i < 3; i++){
            this.enemy = this.physics.add.sprite(600 + i * 400, 300, 'enemy');
            this.enemy.body.setSize(this.enemy.width * 0.7, this.enemy.height);
            this.enemies.add(this.enemy);
        }
        
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.player, this.ground, () => { this.isJumping = false;}, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.gameOver, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.scoreText = this.add.text(16, 16, 'score: 0', { font: '32px Arial', fill: '#000' });
    }

    moveEnemy(enemy, speed) {
        enemy.x -= speed;
        if (enemy.x < 0) {
            this.resetEnemy(enemy);
        }
    }

    resetEnemy(enemy) {
        enemy.x = Phaser.Math.Between(1200, 1400);
        enemy.y = 300;
        if (Phaser.Math.Between(0, 1) == 1) {
            enemy.flipX = true;
        }
        else {
            enemy.flipX = false;
        }
    }

    gameOver() {
        this.physics.pause();
        this.isGameOver = true;
<<<<<<< Updated upstream
        this.scene.launch('score');
=======
        this.gameOverText.visible = true;
        localStorage.setItem("dinoScore", JSON.stringify(this.bestScore));
    }

    replay() {
        location.reload();
    }

    toMain() {
        location.href = 'https://ksy1220.github.io/OSSProject/';
>>>>>>> Stashed changes
    }

    update() {
        if (this.isGameOver) return;

        this.frame++;
        this.enemies.getChildren().forEach(enemy => {
            this.moveEnemy(enemy, this.enemySpeed);
        });

        if (this.cursors.down.isDown) {
            this.player.setDisplaySize(this.playerWidth, this.playerHeight / 2);
        }
        else {
            this.player.setDisplaySize(this.playerWidth, this.playerHeight);
        }

        if (!this.isJumping && this.cursors.up.isDown) {
            this.player.setVelocityY(-600);
            this.isJumping = true;
        }

        if (this.frame % 60 == 0) {
            this.frame = 0;
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
        }

        if (this.speedFlag == false && this.score % 30 == 0) {
            this.enemySpeed += 2;
            this.speedFlag = true;
        }

        if (this.score % 30 == 29) this.speedFlag = false;
    }
}
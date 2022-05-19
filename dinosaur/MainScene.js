class MainScene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        this.load.image('player1', 'player1.png');
        this.load.image('player2', 'player2.png');
        this.load.image('enemy', 'enemy.png');
        this.load.image('ground', 'ground.png');
    }
    
    create() {
        this.frame = 0;
        this.score = 0;
        this.scoreText;
        this.bestScore = 0;
        this.bestScoreText;
        this.isGameOver = false;
        this.isJumping = false;
        this.enemySpeed = 6;
        this.speedFlag = true;

        let temp = localStorage.getItem("dinoScore");
        if (temp) {
            this.bestScore = JSON.parse(temp);
        }

        this.anims.create({
            key: 'playerRun',
            frames: [
                { key: 'player1' },
                { key: 'player2' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.ground = this.physics.add.staticSprite(700, 400, 'ground');

        this.player = this.physics.add.sprite(180, 300, 'player1').play('playerRun');
        this.playerWidth = this.player.width;
        this.playerHeight = this.player.height;
        this.player.body.setSize(this.playerWidth * 0.7, this.playerHeight * 0.8);


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
        this.scoreText = this.add.text(16, 16, 'Score: 0', { font: '24px Times New Roman', fill: '#000' });
        this.bestScoreText = this.add.text(140, 16, `Best Score: ${this.bestScore}`, { font: '24px Times New Roman', fill: '#000' });

        this.gameOverText = this.add.text(350, 120, 'Game Over!',
            {
                font: '32px Times New Roman',
                fill: '#000',
                backgroundColor: '#ffffff',
                padding: 50,
            });
        
        this.tipText = this.add.text(800, 20, '점프: 스페이스바', { font: '20px Times New Roman', fill: '#000' });

        document.getElementById("btnReplay").onclick = this.replay;
        document.getElementById("btnToMain").onclick = this.toMain;

        this.gameOverText.visible = false;
    }

    moveEnemy(enemy, speed) {
        enemy.x -= speed;
        if (enemy.x < 0) {
            this.resetEnemy(enemy);
        }
    }

    resetEnemy(enemy) {
        enemy.x = Phaser.Math.Between(1250, 1400);
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
        this.player.anims.stop();
        this.isGameOver = true;
        this.gameOverText.visible = true;
        localStorage.setItem("dinoScore", JSON.stringify(this.bestScore));
    }

    replay() {
        location.reload();
    }

    toMain() {
        location.href = '/index.html';
    }

    update() {
        if (this.isGameOver) return;

        if (this.isJumping) {
            this.player.anims.stop();
        }
        else {
            this.player.anims.play('playerRun', true);
        }

        this.frame++;
        this.enemies.getChildren().forEach(enemy => {
            this.moveEnemy(enemy, this.enemySpeed);
        });

        if (!this.isJumping && this.cursors.space.isDown) {
            this.player.setVelocityY(-600);
            this.isJumping = true;
        }

        if (this.frame % 60 == 0) {
            this.frame = 0;
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
            if (this.score >= this.bestScore)
                this.bestScore = this.score;
                this.bestScoreText.setText('Best Score: ' + this.bestScore);
        }

        if (this.speedFlag == false && this.score % 30 == 0) {
            this.enemySpeed += 2;
            this.speedFlag = true;
        }

        if (this.score % 30 == 29) this.speedFlag = false;
    }
}
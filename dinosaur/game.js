let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: true
        }
    },
    backgroundColor: 0xeeeeee,
    scene: [MainScene, ScoreScene]
};

let game = new Phaser.Game(config);



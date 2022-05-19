let config = {
    type: Phaser.AUTO,
    parent: 'game',
    autoCenter: true,
    width: 1000,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false,
        }
    },
    backgroundColor: 0xeeeeee,
    scene: [MainScene]
};

let game = new Phaser.Game(config);



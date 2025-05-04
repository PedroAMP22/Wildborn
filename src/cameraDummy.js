import Phaser from 'phaser';

export default class CameraDummy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player) {
        super(scene,x,y);

        this.scene = scene;
        this.player = player;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.cameras.main.startFollow(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.speed = 200;
    }

    preUpdate() {

        const playerX = this.player.x;
        const playerY = this.player.y;

        const distance = Phaser.Math.Distance.Between(
            this.x,
            this.y,
            playerX,
            playerY
        );

        if (distance > 5) {
            this.scene.physics.moveTo(this, playerX, playerY, this.speed);
        } else {
            this.scene.cameras.main.startFollow(this.player,true, 0.1, 0.25);
            this.destroy();
        }
}
}
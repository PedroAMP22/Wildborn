import { Scene } from 'phaser';

export class Air extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene,x,y) {
        super(scene,x,y,null)
        this.speed = 10;
        this.scene.airGroup.add(this);
        this.scene.physics.add.existing(this);

        this.body.setSize(50,3);
        this.body.setOffset(20,15)
     
        this.setVisible(false);
    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
    }

}

import { Scene } from 'phaser';

export class Air extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene,x,y,right) {
        super(scene,x,y,null)
        this.speed = 10;
        this.scene.airGroup.add(this);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);

        this.body.setSize(50,5);
        if(right)
            this.body.setOffset(-40,15)
        else
            this.body.setOffset(20,15)
     
        this.setVisible(false);
        this.timer = 0;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if(this.timer > 65*dt)
            this.destroy();
        this.timer += dt;
    }

}

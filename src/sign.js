import { Scene } from 'phaser';

export class Sign extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene,x,y) {
        super(scene,x,y)
        

        this.setDepth(2);
        this.scene.add.existing(this);
        this.setVisible(false);

    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
        

    }

    interact(){
        this.scene.infoImage.setVisible(true); 
        this.scene.infoImage.setPosition(this.x,this.y); 

        this.scene.time.delayedCall(2000, () => {
            this.scene.infoImage.setVisible(false); 
        });
    }
}

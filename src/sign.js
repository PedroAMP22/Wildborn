import { Scene } from 'phaser';

export class Sign extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene,x,y) {
        super(scene,x,y,"rune")
        

        this.setDepth(2);
        this.scene.add.existing(this);


    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
        

    }

    interact(){
        this.scene.runeImage.setVisible(true); 
        this.scene.runeImage.setPosition(this.x,this.y);
        this.scene.time.delayedCall(2000, () => {
            this.scene.runeImage.setVisible(false); 
        });
    }
}

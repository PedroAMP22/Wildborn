import { Scene } from 'phaser';

export class Rune extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene,x,y) {
        super(scene,x,y)

        this.setDepth(2);
        this.scene.add.existing(this);
        this.anims.play("rune", true);

    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
        

    }

    interact(){
        this.scene.runeImage.setVisible(true); 
        this.scene.runeImage.setPosition(this.x,this.y);
        this.scene.time.delayedCall(2000, () => {
            this.scene.runeImage.setVisible(false);
            this.scene.player.setRune(null);
            this.scene.eKeyText.setVisible(false); 
            this.destroy();

        });
       
    }
}

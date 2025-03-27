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
        this.visible = false;
        this.player = null;
    }


    preUpdate(t, d) {
        super.preUpdate(t, d)
        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        if(distance > 20){
            this.visible = false;
            this.scene.infoImage.setVisible(this.visible); 
        }
    }
    setPlayer(player){
        this.player = player;
    }
    interact(){
        this.visible = !this.visible
        this.scene.infoImage.setVisible(this.visible); 
        this.scene.infoImage.setPosition(this.x,this.y); 
    }
}



export class Cross extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {Number} speed 
     */
    constructor(scene,x1,y1,vertical) {
        super(scene,x1,y1)        
        
        this.vertical = vertical;
        this.setDepth(100);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.scene.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);        
        this.setVisible(false);
        this.body.setOffset(0,0);
        this.body.setSize(0.1,0.1);
        this.scene.time.addEvent({
            delay: 1000, 
            callback: this.explode,
            callbackScope: this,
            loop: false
          });
    }

    preUpdate(t, d) {
        
    }

    explode(){
        this.scene.physics.add.overlap(this.scene.player, this, () => {
            
            this.scene.respawn()
        });
        if(this.vertical){
            this.body.setSize(100000,10);
        }
        else{
            this.body.setSize(10,100000);
        }
        this.scene.time.addEvent({
            delay: 1000, 
            callback: this.remove,
            callbackScope: this,
            loop: false
          });
        

    }
    remove(){
        this.destroy();
    }


}

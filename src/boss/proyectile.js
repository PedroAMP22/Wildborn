

export class Proyectile extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {Number} speed 
     */
    constructor(scene, speed,x1,y1,x2,y2) {
        super(scene,x1,y1)
        this.speed = speed;
        
        

        this.setDepth(100);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.scene.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);        
        this.setVisible(false);
        this.body.setSize(5,5);
        this.body.setOffset(0,0);
        const angle = Phaser.Math.Angle.Between(x1, y1, x2, y2);
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;
        this.body.setVelocity(velocityX, velocityY);
        this.scene.physics.add.overlap(this.scene.player, this, () => {
            
            this.scene.respawn()
        });
    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
        if (this.x < 0 || this.x > this.scene.physics.world.bounds.width ||
            this.y < 0 || this.y > this.scene.physics.world.bounds.height) {
            this.destroy();
        }

       
    }

}

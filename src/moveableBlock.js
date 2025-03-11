import { Scene } from 'phaser';

export class MoveableBlock extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {Number} speed - Speed (default: 100)
     */
    constructor(scene, speed,pointA,pointB,pointC,x,y,falling, model) {
        super(scene,pointA.x,pointA.y, model)
        this.speed = speed;
        
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;

        this.point = pointA;
        this.setDepth(2);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
       
        this.body.setSize(x,y);
        this.body.setOffset(0,0);

    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
    }

    collisionWithAir(air,block){
        if(block.pointC){
            if(block.point === block.pointA){
                block.point = block.pointB;
            }
            if(block.point === block.pointB){
                block.point = block.pointC;
            }
            if(block.point === block.pointC){
                block.point = block.pointB;
            }
        }
        console.log("golpeo");
        air.destroy();
    }

}

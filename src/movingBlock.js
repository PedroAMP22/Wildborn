import { Scene } from 'phaser';
import Level from './level';

export class MovingBlock extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {String} objName - Name of the object in the level.json
     * @param {Number} speed - Speed (default: 100)
     */
    constructor(scene, speed,pointA,pointB) {
        super(scene,pointA.x,pointA.y)
        this.speed = speed;
        

        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
       
        this.body.setSize(40,30);
        this.body.setOffset(0,0);
        this.pointA = pointA;
        this.pointB = pointB;
        if(this.pointA.x === this.pointB.x){
            this.body.setVelocityY(this.speed);
        }
        else{
            this.body.setVelocityX(this.speed);
        }

    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
        if(this.pointA.x === this.pointB.x){
            if(this.y < this.pointB.y ||this.y > this.pointA.y){
                this.body.setVelocityY(-this.body.velocity.y);
                console.log("aaaaadioooooooooo")
            }
        }
        else{
            if(this.x > this.pointB.x ||this.x < this.pointA.x){
                this.body.setVelocityX(-this.body.velocity.x)
                console.log("aaaaadioooooooooo")
            }
        }
        

    }

    setPoint(pointA, pointB){
        this.pointA = pointA;
        this.pointB = pointB;
    }

    /**
     * @returns {Phaser.Physics.Arcade.Group}
     */
    getGroup() {

        return this.movingBlocks;
    }
}

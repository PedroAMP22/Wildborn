import { Scene } from 'phaser';

export class MovingBlock extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {String} objName - Name of the object in the level.json
     * @param {Number} speed - Speed (default: 100)
     */
    constructor(scene, speed,pointA,pointB) {
        super(scene,pointA.x,pointA.y, 'movingBlock')
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
        this.direction = 1;
        if(this.pointA.x === this.pointB.x){
            this.body.setVelocityY(this.speed * this.direction);
        }
        else{
            this.body.setVelocityX(this.speed * this.direction);
        }

    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
        if(this.pointA.x === this.pointB.x){
            if(this.y < this.pointB.y ||this.y > this.pointA.y){
                this.direction = -this.direction;
            }
            this.body.setVelocityY(this.speed * this.direction);
        }
        else{
            if(this.x > this.pointB.x ||this.x < this.pointA.x){
                this.direction = -this.direction;
            }
            this.body.setVelocityX(this.speed * this.direction)
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

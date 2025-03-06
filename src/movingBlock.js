import { Scene } from 'phaser';

export class MovingBlock extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {Number} speed - Speed (default: 100)
     */
    constructor(scene, speed,pointA,pointB,x,y,vertical) {
        super(scene,pointA.x,pointA.y, 'movingBlock')
        this.speed = speed;
        

        this.setDepth(-1);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
       
        this.body.setSize(x,y);
        this.body.setOffset(0,0);
        this.pointA = pointA;
        this.pointB = pointB;
        this.direction = 1;
        this.vertical = vertical;

    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
        if(this.vertical){
            if(this.pointA.y < this.pointB.y){
                if(this.y > this.pointB.y ||this.y < this.pointA.y){
                    this.direction = -this.direction;
                }
            }
            else{
                
                if(this.y < this.pointB.y ||this.y > this.pointA.y){
                    this.direction = -this.direction;
                }
            }
           
            this.body.setVelocityY(this.speed * this.direction * d);
        }
        else{
            if(this.pointA.x < this.pointB.x){
                if(this.x > this.pointB.x ||this.x < this.pointA.x){
                    this.direction = -this.direction;
                }
            }
            else{
               
                if(this.x < this.pointB.x ||this.x > this.pointA.x){
                    this.direction = -this.direction;
                }
            }
            
            this.body.setVelocityX(this.speed * this.direction * d)
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

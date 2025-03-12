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
        this.pointObj = null;
        this.setDepth(2);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(falling);
        this.falling = falling;
        this.body.setSize(x,y);
        this.body.setOffset(0,0);
        this.moving = false;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
       
        if(this.moving){
            if(this.pointA.x > this.pointB.x){
                if(this.point === this.pointA){
                    if(this.x > this.pointB.x){
                        this.body.setVelocity(-this.speed*dt,0);
                    }
                    else{
                        this.moving = false;
                        this.point = this.pointB;
                    }
                       
                }
                else if(this.point === this.pointB){
                    if(this.pointObj === this.pointA){
                        if(this.x < this.pointA.x){
                            this.body.setVelocity(this.speed*dt,0);
                        }
                        else{
                            this.moving = false;
                            this.point = this.pointA;
                        }
                    }
                    else{
                        if(this.x > this.pointC.x){
                            this.body.setVelocity(-this.speed*dt,0);
                        }
                        else{
                            this.moving = false;
                            this.point = this.pointC;
                        }
                    }
                }
                else{
                    if(this.x < this.pointB.x){
                        this.body.setVelocity(this.speed*dt,0);
                    }
                    else{
                        this.moving = false;
                        this.point = this.pointB;
                    }
                }
            }
            else{
                if(this.point === this.pointA){
                    if(this.x < this.pointB.x){
                        this.body.setVelocity(this.speed*dt,0);
                    }
                    else{
                        this.moving = false;
                        this.point = this.pointB;
                    }
                       
                }
                else if(this.point === this.pointB){
                    if(this.pointObj === this.pointA){
                        if(this.x > this.pointA.x){
                            this.body.setVelocity(-this.speed*dt,0);
                        }
                        else{
                            this.moving = false;
                            this.point = this.pointA;
                        }
                    }
                    else{
                        if(this.x < this.pointC.x){
                            this.body.setVelocity(this.speed*dt,0);
                        }
                        else{
                            this.moving = false;
                            this.point = this.pointC;
                        }
                    }
                }
                else{
                    if(this.x > this.pointB.x){
                        this.body.setVelocity(-this.speed*dt,0);
                    }
                    else{
                        this.moving = false;
                        this.point = this.pointB;
                    }
                }
            }
        }   
        else{
            this.body.setVelocity(0);
        }
        
    }

    collisionWithAir(block,air){

        if(block.pointA.x > block.pointB.x){
            if(block.point === block.pointA){
                if(air.x > block.x){
                    block.pointObj = block.pointB;
                    block.moving = true;
                }
            }
            if(block.point === block.pointB){
                if(air.x > block.x)
                    block.pointObj = block.pointC;
                else
                    block.pointObj = block.pointA;
                block.moving = true;
            }
            if(block.point === block.pointC){
                if(air.x < block.x){
                    block.pointObj = block.pointB;
                    block.moving = true;
                }
            }
        }
        else{
            if(block.point === block.pointA){
                if(air.x < block.x){
                    block.pointObj = block.pointB;
                    block.moving = true;
                }
            }
            if(block.point === block.pointB){
                if(air.x < block.x)
                    block.pointObj = block.pointC;
                else
                    block.pointObj = block.pointA;
                block.moving = true;
            }
            if(block.point === block.pointC){
                if(air.x > block.x){
                    block.pointObj = block.pointB;
                    block.moving = true;
                }
            }
        }
        console.log("aaaaaaaaaaaaaaaaaaa")
        
        air.destroy();
    }

}

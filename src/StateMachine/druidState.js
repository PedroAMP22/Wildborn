import {State} from './state'

export class DruidState extends State {
    static NAME = "druid";
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene){
        super()
        this.scene = scene;
        
        this.player = scene.player;

        this.player.body.setCircle(5.5);
        this.player.body.setOffset(10.5,14.5)
        
        this.jumpSpeed = -400;
        this.topSpeed = 150;
        this.initialSpeed = 50;
        this.walkAcceleration = 0.5;
        this.topFallingSpeed = 100;
        this.maxCoyoteTime = 5;
        this.coyoteTime = 0;
        
        this.lastSpeed = 0;
        this.wasGrounded = this.player.body.onFloor();
        this.maxInputBuffer = 6;
        this.inputBuffer = 0;
        this.player.body.setAllowGravity(true);
        this.player.setAngle(0);
    }

    transform(){

    }

    update(t,dt){


        if (this.player.body.velocity.x !== 0) {
            this.player.anims.play("druidRun", true);
        }
        if(this.lastSpeed > 0 && this.player.body.velocity.y === 0){
            this.player.anims.play("druidLand", true);
        }
        this.lastSpeed = this.player.body.velocity.y;

        let canPlayIdle = true;

        if(this.player.anims.currentAnim !== null && this.player.anims.currentAnim.key === "druidLand" && this.player.anims.isPlaying){
           canPlayIdle = false;
        }
    
        if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0 && canPlayIdle){
            this.player.anims.play("druidIdle", true);
        }
        if(this.player.body.velocity.y !== 0){
            this.player.anims.play("druidFall", true);
        }

        if(this.wasGrounded && !this.player.body.onFloor() && !this.justJumped){
            this.coyoteTime = 1;
        }
        if(this.coyoteTime > 0)
            this.coyoteTime += 1
        
        this.justJumped = Phaser.Input.Keyboard.JustDown(this.player.cursors.space);
        //Salto 
        if(this.justJumped){
            this.inputBuffer = 1;
        }
        if(this.inputBuffer > 0){
            this.inputBuffer += 1
        }
        if ((this.justJumped && this.player.body.onFloor())) {
            this.coyoteTime = 0;
            this.inputBuffer = 0;
            this.player.body.setVelocityY(this.jumpSpeed);
            console.log("tumadre"); //BUENA PABLO
            this.player.anims.play("druidJump",true);
        }
        if(this.justJumped && this.coyoteTime < this.maxCoyoteTime && this.coyoteTime !== 0){
            this.coyoteTime = 0;
            this.inputBuffer = 0;
            this.player.body.setVelocityY(this.jumpSpeed);
            this.player.anims.play("druidJump",true);
        }

        if(this.player.body.onFloor() && this.inputBuffer < this.maxInputBuffer && this.inputBuffer !== 0){
            this.coyoteTime = 0;
            this.inputBuffer = 0;
            this.player.body.setVelocityY(this.jumpSpeed);
            this.player.anims.play("druidJump",true);
        }

        //Caer mas rapido
        if(this.player.body.velocity.y > 0 && this.player.body.velocity.y < this.topFallingSpeed){
            this.player.body.setVelocityY(this.player.body.velocity.y + 0.01 * dt)
            if(this.player.body.velocity.y > this.topFallingSpeed){
                this.player.body.setVelocityY(this.topFallingSpeed);
            }
        }

        //Saltar menos segun cuanto pulses
        else if(this.player.body.velocity.y < -0 && !this.player.cursors.space.isDown){
            this.player.body.setVelocityY(this.player.body.velocity.y + 4 * dt)
        }

        //Izquierda
        if (Phaser.Input.Keyboard.JustDown(this.player.cursors.left) && !this.player.cursors.right.isDown){
            this.player.body.setVelocityX(-this.initialSpeed)
            this.player.setFlipX(true)
        }
        else if (this.player.cursors.left.isDown && this.player.body.velocity.x > -this.topSpeed && !this.player.cursors.right.isDown) {
            this.player.setFlipX(true)
            if(this.player.body.velocity.x > -this.initialSpeed){
                this.player.body.setVelocityX(-this.initialSpeed);
            }
            this.player.body.setVelocityX(this.player.body.velocity.x - this.walkAcceleration * dt);
            if(this.player.body.velocity.x < -this.topSpeed){
                this.player.body.setVelocityX(-this.topSpeed);
            }
        }
        //Derecha
        else if (Phaser.Input.Keyboard.JustDown(this.player.cursors.right) && !this.player.cursors.left.isDown){
            this.player.body.setVelocityX(this.initialSpeed)
            this.player.setFlipX(false)
        }
        else if (this.player.cursors.right.isDown && this.player.body.velocity.x < this.topSpeed && !this.player.cursors.left.isDown) {
            this.player.setFlipX(false)
            if(this.player.body.velocity.x < this.initialSpeed){
                this.player.body.setVelocityX(this.initialSpeed);
            }
            this.player.body.setVelocityX(this.player.body.velocity.x + this.walkAcceleration * dt);
            if(this.player.body.velocity.x > this.topSpeed){
                this.player.body.setVelocityX(this.topSpeed);
            }
        }
        //Pararse
        if(!this.player.cursors.left.isDown && !this.player.cursors.right.isDown ){
            this.player.body.setVelocityX(0);
        }
        this.wasGrounded = this.player.body.onFloor();
        
    }   
}
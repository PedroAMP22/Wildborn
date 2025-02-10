import {State} from './state'

export class SquirrelState extends State {
    static NAME = "squirrel";
    
    constructor(scene) {
        super();

        this.scene = scene;
        this.player = scene.player;

        this.player.body.setCircle(5.5);
        this.player.body.setOffset(10.5,14.5);

        this.jumpSpeed = -400;
        this.topSpeed = 150;
        this.initialSpeed = 50;
        this.walkAcceleration = 0.5;
        this.topFallingSpeed = 100;
        this.maxCoyoteTime = 5;
        this.coyoteTime = 0;
        this.player.body.setAllowGravity(true);
        this.player.setAngle(0);

        this.lastSpeed = 0;
        this.wasGrounded = this.player.body.onFloor();
        this.maxInputBuffer = 6;
        this.inputBuffer = 0;
        this.player.body.setAllowGravity(true);
        this.player.setAngle(0);

    }

    transform(){
        this.player.anims.play("squirrelTrans", true);
    }

    update(t,dt){
        if (this.player.body.velocity.x !== 0 && !this.isGliding) {
            this.player.anims.play("squirrelRun", true);
        }

        let canPlayIdle = true;
        if(this.player.anims.currentAnim !== null && this.player.anims.currentAnim.key === "squirrelTrans" && this.player.anims.isPlaying){
            canPlayIdle = false;
        }

        if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0 && canPlayIdle){
            this.player.anims.play("squirrelIdle", true);
        }


        if(this.player.anims.currentAnim !== null && this.player.anims.currentAnim.key === "squirrelJump" && this.player.anims.isPlaying){
            canPlayIdle = false;
        }

        if(this.player.body.velocity.y !== 0 && canPlayIdle && !this.isGliding){
            this.player.anims.play("squirrelAir", true);
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
            this.player.anims.play("squirrelJump",true);
        }
        if(this.justJumped && this.coyoteTime < this.maxCoyoteTime && this.coyoteTime !== 0){
            this.coyoteTime = 0;
            this.inputBuffer = 0;
            this.player.body.setVelocityY(this.jumpSpeed);
            this.player.anims.play("squirrelJump",true);
        }
        if(this.player.body.onFloor() && this.inputBuffer < this.maxInputBuffer && this.inputBuffer !== 0){
            this.coyoteTime = 0;
            this.inputBuffer = 0;
            this.player.body.setVelocityY(this.jumpSpeed);
            this.player.anims.play("squirrelJump",true);
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

        if(!this.player.body.onFloor() && this.justJumped && !this.isGliding){
            this.isGliding = true;
            this.glideDirection = this.player.body.velocity.x > 0 ? 1: -1;
            this.player.anims.play("squirrelFly", true);
        }

        

        //Está planeando
        if(this.isGliding){
            this.player.body.setAllowGravity(false);
            this.player.body.setVelocityY(50);
            this.player.body.setVelocityX(this.glideDirection * this.topSpeed);
            if(!this.player.cursors.space.isDown || this.player.body.onFloor()){
                this.isGliding = false;
                this.player.body.setAllowGravity(true);
            }
        }

        this.player.moveHorizontal(this.initialSpeed, this.topSpeed, this.walkAcceleration, t, dt);

    }

    checkSate(stateString){
        return stateString === SquirrelState.NAME;
    }

}
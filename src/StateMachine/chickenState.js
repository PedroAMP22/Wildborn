import {State} from './state'

export class ChickenState extends State {
    static NAME = "chicken";

    constructor(scene) {
        super();

        this.scene = scene;
        this.player = scene.player;

        this.player.body.setCircle(5.5);
        this.player.body.setOffset(10.5,14.5);

        this.jumpSpeed = -300;
        this.topSpeed = 150;
        this.initialSpeed = 50;
        this.walkAcceleration = 0.5;
        this.topFallingSpeed = 200;
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
        this.player.setFlipY(false);

        this.hasGlided = false;
    }

    transform(){
        this.player.anims.play("chickenTrans", true);
    }

    update(t,dt){

        let canPlayIdle = true;
        this.justJumped = Phaser.Input.Keyboard.JustDown(this.player.cursors.space);

        if(this.player.checkPlaying("squirrelTrans")) canPlayIdle = false;
        if(this.player.checkPlaying("squirrelJump")) canPlayIdle = false;

        if(this.player.body.onFloor()){
            this.hasGlided = false;
        }

        if (this.player.body.velocity.x !== 0 && !this.isGliding && this.player.body.onFloor()) {
            this.player.anims.play("squirrelRun", true);
        }
        
        this.player.playIdleIfPossible(canPlayIdle, "squirrelIdle");

        if(this.player.body.velocity.y !== 0 && canPlayIdle && !this.isGliding){
            this.player.anims.play("squirrelAir", true);
        }
        

        //Salto 
        if(this.wasGrounded && !this.player.body.onFloor() && !this.justJumped) this.coyoteTime = 1;
        if(this.coyoteTime > 0) this.coyoteTime += 1;

        if(this.justJumped)this.inputBuffer = 1;
        if(this.inputBuffer > 0)this.inputBuffer += 1;
       
        if (this.player.jump(this.justJumped, "squirrelJump", this.jumpSpeed, this.coyoteTime, this.inputBuffer)){
            this.coyoteTime = 0;
            this.inputBuffer = 0;
        }

        

        
        if(!this.player.body.onFloor() && this.justJumped && !this.isGliding && !this.hasGlided){
            this.isGliding = true;
            this.hasGlided = true;
            if(this.player.keys.left.isDown)
                this.glideDirection = -1;
            else if(this.player.keys.right.isDown)
                this.glideDirection = 1;
            else{
                if(!this.player.flipX)
                    this.glideDirection = 1;
                else
                    this.glideDirection = -1;
            }
            this.player.anims.play("squirrelFly", true);
        }

        

        //Está planeando
        if(this.isGliding){
            this.player.body.setAllowGravity(false);
            this.player.body.setVelocityY(50);
           
            if(this.glideDirection === -1){
                this.player.setFlipX(true);
            }
            else{
                this.player.setFlipX(false);
            }
            this.player.body.setVelocityX(this.glideDirection * this.topSpeed);
            if(!this.player.cursors.space.isDown || this.player.body.onFloor()){
                this.isGliding = false;
                this.player.body.setAllowGravity(true);
            }
        }
        else{
            this.player.fall(this.topFallingSpeed);
            this.player.moveHorizontal(this.initialSpeed, this.topSpeed, this.walkAcceleration, t, dt);
            this.wasGrounded = this.player.body.onFloor();
        }
        
        

    }

    checkState(stateString){
        return stateString === ChickenState.NAME;
    }
}
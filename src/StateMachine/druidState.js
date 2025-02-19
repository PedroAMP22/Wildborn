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
        this.player.body.setOffset(10.5,14.5);
        
        this.jumpSpeed = -400;
        this.topSpeed = 150;
        this.initialSpeed = 50;
        this.walkAcceleration = 0.5;
        this.topFallingSpeed = 200;
        this.coyoteTime = 0;
        
        this.lastSpeed = 0;
        this.wasGrounded = this.player.body.onFloor();
        this.inputBuffer = 0;
        this.player.body.setAllowGravity(true);
        this.player.setAngle(0);
        this.player.setFlipY(false);
        this.transKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.isJumping = false;
    }

    transform(){
        this.player.anims.play("druidTrans", true);
    }

    update(t,dt){

        let canPlayIdle = true;
        if(this.player.body.onFloor())
            this.isJumping = false;
        
        this.justJumped = Phaser.Input.Keyboard.JustDown(this.player.cursors.space);

        if(this.player.checkPlaying("druidLand")) canPlayIdle = false;
        if(this.player.checkPlaying("druidTrans")) canPlayIdle = false;

        if (this.player.body.velocity.x !== 0) {
            this.player.anims.play("druidRun", true);
        }
        if(this.lastSpeed > 0 && this.player.body.velocity.y === 0){
            this.player.anims.play("druidLand", true);
        }
    
        this.player.playIdleIfPossible(canPlayIdle, "druidIdle");
        
        if(this.player.body.velocity.y !== 0){
            this.player.anims.play("druidFall", true);
        }


         //Salto 
        if(this.wasGrounded && !this.player.body.onFloor() && !this.justJumped) this.coyoteTime = 1;
        if(this.coyoteTime > 0) this.coyoteTime += 1;

        if(this.justJumped)this.inputBuffer = 1;
        if(this.inputBuffer > 0)this.inputBuffer += 1;
       
        if (this.player.jump(this.justJumped, "druidJump", this.jumpSpeed, this.coyoteTime, this.inputBuffer)){
            this.coyoteTime = 0;
            this.inputBuffer = 0;
            this.isJumping = true;
        }

        this.player.fall(this.topFallingSpeed);

        //Saltar menos segun cuanto pulses
        if(this.player.body.velocity.y < -0 && !this.player.cursors.space.isDown && this.isJumping){
            this.player.body.setVelocityY(this.player.body.velocity.y + 4 * dt)
        }

        this.player.moveHorizontal(this.initialSpeed,this.topSpeed,this.walkAcceleration,t,dt);
        
        this.wasGrounded = this.player.body.onFloor();
        
        this.lastSpeed = this.player.body.velocity.y;

        
       
    }   
    checkState(stateString){
        return stateString === DruidState.NAME;
    }
}
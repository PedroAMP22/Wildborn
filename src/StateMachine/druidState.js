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
        this.topFallingSpeed = 100;
        this.maxCoyoteTime = 5;
        this.coyoteTime = 0;
        
        this.lastSpeed = 0;
        this.wasGrounded = this.player.body.onFloor();
        this.maxInputBuffer = 6;
        this.inputBuffer = 0;
        this.player.body.setAllowGravity(true);
        this.player.setAngle(0);

        this.iKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    transform(){
        this.player.anims.play("playerTrans", true);
    }

    update(t,dt){

        if (Phaser.Input.Keyboard.JustDown(this.iKey)) {
            this.transform();
        }

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
        if(this.player.anims.currentAnim !== null && this.player.anims.currentAnim.key === "playerTrans" && this.player.anims.isPlaying){
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

        this.player.moveHorizontal(this.initialSpeed,this.topSpeed,this.walkAcceleration,t,dt);
        
        this.wasGrounded = this.player.body.onFloor();
        
    }   
    checkSate(stateString){
        return stateString === DruidState.NAME;
    }
}
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

        if(this.player.checkPlaying("chickenTrans")) canPlayIdle = false;
        //if(this.player.checkPlaying("chickenJump")) canPlayIdle = false;

        if (this.player.cursors.space.isDown) {
            this.player.anims.play("chickenFlap", true);
            canPlayIdle = false; // No permitir que entre en idle mientras se presiona espacio
        }
        else if (this.player.body.velocity.x !== 0 && this.player.body.onFloor()) {
            this.player.anims.play("chickenRun", true);
        }
        
        this.player.playIdleIfPossible(canPlayIdle, "chickenIdle");
      
        this.player.moverseturuleca(this.initialSpeed, this.topSpeed, this.walkAcceleration, t, dt);
        

    }

    checkState(stateString){
        return stateString === ChickenState.NAME;
    }

    
    
}
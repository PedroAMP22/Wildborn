import {State} from './state'

export class ChickenState extends State {
    static NAME = "chicken";

    constructor(scene) {
        super();

        this.scene = scene;
        this.player = scene.player;

        this.player.body.setSize(7,13);
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
        this.player.setAngle(0);
        this.player.setFlipY(false);

        this.isFlapping = false; //está en chickenflap
        this.flapUsedInAir = false; //cont
        this.flapDirection = null; 
        this.flapTimer= 0;  //tiempo cont
        this.maxFlapTime = 1000; //seg
    }

    transform(){
        this.player.anims.play("chickenTrans", true);
    }

    update(t,dt){

        let canPlayIdle = true;
        let isOnFloor = this.player.body.onFloor();
        let isFalling = this.player.body.velocity.y > 0;

        if (isOnFloor) {
            this.flapUsedInAir = false;
        }

        
        if (Phaser.Input.Keyboard.JustDown(this.player.cursors.space)) {
            if (this.isFlapping) {
                //si ya está flapping, cancelarlo y dejarlo caer
                this.stopFlap();
            } else {
                this.isFlapping = true;
                this.flapDirection = this.player.flipX; //dir
                this.flapTimer = 0; //reset the timer

                this.player.anims.play("chickenFlap", true);

                if (isFalling && !this.flapUsedInAir) {
                    //freeze
                    this.player.body.setVelocity(0, 0);
                    this.player.body.setAllowGravity(false); 
                    this.flapUsedInAir = true;
                }
            }
        }
        

        if (this.isFlapping) {
            canPlayIdle = false;
            this.player.body.setVelocityX(0); 
            //conserve the direction
            if (this.flapDirection !== null) {
                this.player.setFlipX(this.flapDirection);
            }

            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== "chickenFlap") {
                this.player.anims.play("chickenFlap", true);
            }

            this.flapTimer += dt;
            if (this.flapTimer >= this.maxFlapTime) {
                this.stopFlap();
            }
        } else {
            this.player.body.setAllowGravity(true);

            this.player.moveChicken(this.initialSpeed, this.topSpeed, this.walkAcceleration, t, dt);
        }

        if (!this.isFlapping) {
            if (this.player.body.velocity.x !== 0 && isOnFloor) {
                this.player.anims.play("chickenRun", true);
            }
            this.player.playIdleIfPossible(canPlayIdle, "chickenIdle");
        }
    }

    stopFlap() {
        this.isFlapping = false;
        this.flapDirection = null; 
        this.player.anims.stop(); 
        this.player.body.setAllowGravity(true);
    }

    checkState(stateString){
        return stateString === ChickenState.NAME;
    }
    toString(){
        return ChickenState.NAME;
    }
}
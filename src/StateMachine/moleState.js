import {State} from './state'

export class MoleState extends State {
    static NAME = "mole";

    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super();
        this.scene = scene;
        this.player = scene.player;
        this.topSpeed = 100;
        this.initialSpeed = 50;
        this.walkAcceleration = 0.5;
        this.player.body.setSize(13,5);
        this.player.body.setOffset(8,19);
        this.player.body.setAllowGravity(true);
        this.player.setAngle(0);
        this.propulsionSpeed = -1000;
        this.hidden = false;
        this.canJump = false;
        this.topFallingSpeed = 200;
    }

    transform(){
        this.player.anims.play("moleTrans", true);
    }

    update(t,dt){

        let canPlayIdle = true;
       

        if(this.player.checkPlaying("moleTrans")) canPlayIdle = false;
        if(this.player.checkPlaying("moleHide")) canPlayIdle = false;
        if(this.player.checkPlaying("moleHiddenIdle")) canPlayIdle = false;
        if(this.player.checkPlaying("moleJump")) canPlayIdle = false;
       


        if (this.player.body.velocity.x !== 0) {
            this.player.anims.play("moleRun", true);
        }
           
        if(this.player.playIdleIfPossible(canPlayIdle, "moleIdle")){
           
        }

        if (Phaser.Input.Keyboard.JustDown(this.player.keys.down) && this.player.body.onFloor() && !this.hidden) {
            this.player.anims.play("moleHide",true);
            this.hidden = true;
            this.player.body.setSize(10,0.1);
            this.player.body.setOffset(10,23);
        }


        if(!this.player.checkPlaying("moleHide") && this.hidden){
            this.player.anims.play("moleHiddenIdle",true);
            if(Phaser.Input.Keyboard.JustDown(this.player.cursors.space)){
                this.player.anims.play("moleJump",true);
                this.hidden = false;
                this.canJump = true;
            }   
        }
        

        if(!this.player.checkPlaying("moleJump") && this.canJump){
            this.player.anims.play("moleFly",true);
            this.player.body.setVelocityY(this.propulsionSpeed);
            this.player.body.setSize(5,18);
            this.player.body.setOffset(13,7);
            this.canJump = false
        }

        this.player.fall(this.topFallingSpeed);
        if(this.player.body.velocity.y > 0 && !this.player.checkPlaying("moleHide") && !this.player.body.onFloor()){
            this.player.anims.play("moleFall", true);
            this.player.body.setSize(13,5);
            this.player.body.setOffset(8,19);
        }
       

        if(!this.hidden){
            this.player.moveHorizontal(this.initialSpeed,this.topSpeed,this.walkAcceleration,t,dt);
        }
    }
    checkSate(stateString){
        return stateString === MoleState.NAME;
    }
}
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
        this.left = false;
        this.right = false;
        this.top = false;
        this.topFallingSpeed = 200;
        this.lastSpeed = 0;
    }

    transform(){
        this.player.anims.play("moleTrans", true);
    }

    update(t,dt){

        let canPlayIdle = true;
       

        if(this.player.checkPlaying("moleTrans")) canPlayIdle = false;
        if(this.player.checkPlaying("moleHide")) canPlayIdle = false;
        if(this.player.checkPlaying("moleHide2")) canPlayIdle = false;
        if(this.player.checkPlaying("moleHiddenIdle")) canPlayIdle = false;
        if(this.player.checkPlaying("moleJump")) canPlayIdle = false;
           
        this.player.playIdleIfPossible(canPlayIdle, "moleIdle")
    

         //HIDE IN WALL OR FLOOR AND START PROPULSION

        if (Phaser.Input.Keyboard.JustDown(this.player.keys.down) && this.player.body.onFloor() && !this.hidden) {
            this.player.anims.play("moleHide",true);
            this.hidden = true;
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.player.body.setSize(10,0.1);
            this.player.body.setOffset(10,23);
        }
        console.log(this.lastSpeed)
        if (this.player.body.blocked.down && !this.hidden && this.lastSpeed > 0) {
            this.player.anims.play("moleHide",true);
            this.hidden = true;
            this.player.body.setAllowGravity(false);
            this.player.setAngle(0);
            this.player.setFlipY(false);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        }
        if (this.player.body.blocked.left && !this.hidden) {
            this.player.anims.play("moleHide",true);
            this.hidden = true;
            this.player.body.setAllowGravity(false);
            this.player.setAngle(90);
            this.player.setFlipY(false);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.left = true;
        }
        if (this.player.body.blocked.right && !this.hidden) {
            this.player.anims.play("moleHide",true);
            this.hidden = true;
            this.player.body.setAllowGravity(false);
            this.player.setAngle(90);
            this.player.setFlipY(true);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.right = true;
        } 
        if (this.player.body.blocked.up && !this.hidden) {
            this.player.anims.play("moleHide",true);
            this.hidden = true;
            this.player.body.setAllowGravity(false);
            this.player.setFlipY(true);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.top = true;
        } 
        if(!this.player.checkPlaying("moleHide") && this.hidden){
            this.player.anims.play("moleHiddenIdle",true);
            if(Phaser.Input.Keyboard.JustDown(this.player.cursors.space)){
                this.player.anims.play("moleJump",true);
                this.hidden = false;
                this.canJump = true;
            }   
        }
        
        //PROPULSION
        if(!this.player.checkPlaying("moleJump") && this.canJump){
            this.player.anims.play("moleFly",true);
            //WALL
            if(this.left || this.right){
                this.player.body.setSize(18,5);
                this.player.body.setOffset(13,7);
                this.left ?  this.player.body.setVelocityX(-this.propulsionSpeed) : this.player.body.setVelocityX(this.propulsionSpeed);
                this.left = false;
                this.right = false;
            }
            else{//FLOOR OR ROOF
                this.top ?  this.player.body.setVelocityY(-this.propulsionSpeed) : this.player.body.setVelocityY(this.propulsionSpeed);
                this.player.body.setSize(5,18);
                this.player.body.setOffset(13,7);
                this.top = false;
            }
            
            this.canJump = false
            this.lastSpeed = this.player.body.velocity.y
        }

        //CHECK COLLISON WITH WALLS



        //FALL
        
        if(this.player.body.velocity.y > 0 && !this.player.checkPlaying("moleHide") && !this.player.checkPlaying("moleJump") && !this.player.checkPlaying("moleFly") && !this.player.body.onFloor()){
            this.player.fall(this.topFallingSpeed);
            this.player.anims.play("moleFall", true);
            this.player.body.setSize(13,5);
            this.player.body.setOffset(8,19);
        }
       
        //MOVEMENT HORIZONTAL
        console.log(this.player.anims.currentAnim.key);
        if(!this.hidden && !this.player.checkPlaying("moleFly") && !this.player.checkPlaying("moleJump") && !this.player.checkPlaying("moleHide")){
            this.player.moveHorizontal(this.initialSpeed,this.topSpeed,this.walkAcceleration,t,dt);
        }
        //RUN ANIMATION
        if (this.player.body.velocity.x !== 0 && this.player.body.onFloor()) {
            this.player.anims.play("moleRun", true);
            this.lastSpeed = this.player.body.velocity.y;
        }

       
    }
    checkSate(stateString){
        return stateString === MoleState.NAME;
    }
}
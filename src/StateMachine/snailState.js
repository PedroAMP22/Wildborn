import {State} from './state'

export class SnailState extends State{
    static NAME = "snail";
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super();
        this.scene = scene;
        this.player = scene.player;
        this.player.body.setSize(8,8);
        this.player.body.setOffset(11.5,14.5);
        this.left = false;
        this.right = false;
        this.top = false;
        this.down = false;
        this.topFallingSpeed = 250;
        this.player.setFlipY(false);
        this.isStuck = false;
        this.player.body.setAllowGravity(true);
        this.canStuck = false;
        this.blockStucked = null;

    }

    stickToSurface() {

        this.isStuck = true;
        this.player.body.setOffset(11.5,14.5);

        if (this.left) {
            //izquierda
            this.player.setPosition(this.player.x + 1, this.player.y);
            this.player.body.setOffset(9,12);
            this.player.setFlipX(false);
            this.player.body.setAllowGravity(false);
            this.player.setAngle(90);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        } else if (this.right) {
            //derecha
            this.player.setPosition(this.player.x - 2, this.player.y);
            this.player.body.setOffset(15,12);
            this.player.setFlipX(true);
            this.player.body.setAllowGravity(false);
            this.player.setAngle(-90);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        } else if (this.top){
            //techo
            this.player.setPosition(this.player.x, this.player.y + 6);
            this.player.body.setOffset(11.5,8);
            this.player.body.setGravityY(0);
            this.player.body.setAllowGravity(false);
            this.player.setAngle(180);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        }
        else{
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.player.body.setAllowGravity(false);
        }
       
        
    }

    transform() {
        this.player.anims.play("snailTrans", true);
    }

    update(t, dt) {
        let canPlayIdle = true;
        
        if(this.player.checkPlaying("snailTrans")) canPlayIdle = false;
        this.left = this.left || this.player.body.blocked.left;
        this.right = this.right || this.player.body.blocked.right;
        this.top = this.top || this.player.body.blocked.up;

        if((this.left || this.right || this.top || this.player.body.onFloor()) && !this.isStuck && this.canStuck)
            this.stickToSurface();
        else{
            this.player.fall(this.topFallingSpeed);
        }
        
        this.player.playIdleIfPossible(canPlayIdle, "snailIdle");
        if(this.blockStucked != null){
            this.player.body.setVelocityX(this.blockStucked.body.velocity.x);
            this.player.anims.play("snailIdle", true);
        }
        this.canStuck = true;
    }
    checkState(stateString){
        return stateString === SnailState.NAME;
    }
    onCollision(block){
        this.blockStucked = block;
    }
}
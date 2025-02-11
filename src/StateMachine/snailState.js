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
        this.player.body.setCircle(4);
        this.player.body.setOffset(11.5,14.5);
        this.left = false;
        this.right = false;
        this.top = false;
        this.down = false;
        this.topFallingSpeed = 200;
        this.player.body.setAccelerationY(0)

        this.isStuck = false;
        this.shouldFall = true;

    }

    stickToSurface() {

        console.log(this.left, this.right, this.top);
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
        this.shouldFall = !(this.left || this.right || this.top || this.player.body.onFloor());

        if((this.left || this.right || this.top || this.player.body.onFloor()) && !this.isStuck)
            this.stickToSurface();
        else if (this.topFallingSpeed > this.player.body.velocity.y && this.shouldFall){
            this.player.body.setVelocityY(this.player.body.velocity.y + 1 * dt);
            if (this.topFallingSpeed < this.player.body.velocity.y)
                this.player.body.setVelocityY(this.topFallingSpeed);
        }
        
        this.player.playIdleIfPossible(canPlayIdle, "snailIdle");
    }
    checkSate(stateString){
        return stateString === SnailState.NAME;
    }
}
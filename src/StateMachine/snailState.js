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

    }

    stickToSurface() {

        console.log(this.left, this.right, this.top);

        if (this.left) {
            //izquierda
            this.player.setFlipX(false);
            this.player.body.setAllowGravity(false);
            console.log("IZQUIERDAAA");
            this.player.setAngle(90);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        } else if (this.right) {
            //derecha
            this.player.setFlipX(true);
            this.player.body.setAllowGravity(false);
            console.log("DERECHAAAA");
            this.player.setAngle(-90);
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        } else if (this.top){
            //techo
            this.player.body.setGravityY(0);
            this.player.body.setAllowGravity(false);
            console.log("TECHOOO");
            this.player.setAngle(180);
            //this.player.body.setOffset(this.player.body.offset.x, this.player.height - this.player.body. height);
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


        this.left = this.left || this.player.body.blocked.left;
        this.right = this.right || this.player.body.blocked.right;
        this.top = this.top || this.player.body.blocked.up;

        if(this.left || this.right || this.top || this.player.body.onFloor())
            this.stickToSurface();
        else if (this.topFallingSpeed > this.player.body.velocity.y){
            this.player.body.setVelocityY(this.player.body.velocity.y + 1 * dt);
            if (this.topFallingSpeed < this.player.body.velocity.y)
                this.player.body.setVelocityY(this.topFallingSpeed);
        }
            
            

        
        //meter rotacion con booleanos

        if (!this.player.anims.isPlaying) {
            this.player.anims.play("snailIdle", true);
        }
    }
    checkSate(stateString){
        return stateString === SnailState.NAME;
    }
}
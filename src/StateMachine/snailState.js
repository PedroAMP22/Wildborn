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

        this.keyU = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);

    }

    stickToSurface() {

        this.left = false;
        this.right = false;
        this.top = false;

        this.left = this.left || this.player.body.blocked.left;
        this.right = this.right || this.player.body.blocked.right;
        this.top = this.top || this.player.body.blocked.up;

        console.log(this.left, this.right, this.top);

        if (this.left) {
            //izquierda
            this.player.setFlipX(false);
            this.player.body.setAllowGravity(false);
            console.log("IZQUIERDAAA");
            this.player.setAngle(90);
        } else if (this.right) {
            //derecha
            this.player.setFlipX(true);
            this.player.body.setAllowGravity(false);
            console.log("DERECHAAAA");
            this.player.setAngle(-90);
        } else if (this.top){
            //techo
            this.player.body.setGravityY(0);
            this.player.body.setAllowGravity(false);
            console.log("TECHOOO");
            this.player.setAngle(180);
            //this.player.body.setOffset(this.player.body.offset.x, this.player.height - this.player.body. height);
        }
       
        this.player.body.setVelocityX(0);
        this.player.body.setVelocityY(0);
    }

    transform() {
        this.player.anims.play("snailTrans", true);
    }

    update(t, dt) {
        this.stickToSurface();
        
        //meter rotacion con booleanos

        if (Phaser.Input.Keyboard.JustDown(this.keyU)) {
            this.transform();
        }

        if (this.player.anims.getName() !== "snailTrans" && !this.player.anims.isPlaying) {
            this.player.anims.play("snailIdle", true);
        }
    }
}
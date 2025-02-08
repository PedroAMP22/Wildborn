import {State} from './state'

export class snailState extends State{
    static NAME = "snail";
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super();
        this.scene = scene;
        this.player = scene.player;

        //dimension caracol
        this.player.body.setSize(12, 12);
        this.player.body.setOffset(10, 18);

        this.player.body.setVelocity(0, 0);
        this.player.body.setAllowGravity(false);

        //fija a la superficie
        this.stickToSurface();
        
        this.player.anims.play("snailIdle", true);
    }

    stickToSurface() {
        if (this.player.body.onFloor()) {
            //suelo
            this.player.body.setVelocity(0, 0);
        } else if (this.player.body.touching.left) {
            //izquierda
            this.player.setFlipX(false);
        } else if (this.player.body.touching.right) {
            //derecha
            this.player.setFlipX(true);
        } else if (this.player.body.touching.up) {
            //techo
            this.player.body.setGravityY(0);
        }
    }

    transform() {
        
    }

    update(t, dt) {
        this.stickToSurface();
    }
}
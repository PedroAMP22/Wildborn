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
        this.propulsionSpeed = -1800;
    }

    transform(){
        this.player.anims.play("moleTrans", true);
    }

    update(t,dt){
        if (this.player.body.velocity.x !== 0) {
            this.player.anims.play("moleRun", true);
        }
        if(this.player.body.velocity.y === 0 && this.player.body.velocity.x === 0)
            this.player.anims.play("moleIdle",true);
        this.player.moveHorizontal(this.initialSpeed,this.topSpeed,this.walkAcceleration,t,dt);

        if (Phaser.Input.Keyboard.JustDown(this.player.keys.down) && this.player.body.onFloor()) {
            this.player.body.setVelocityY(this.propulsionSpeed);

        }
       
    }
    checkSate(stateString){
        return stateString === MoleState.name;
    }
}
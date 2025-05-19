import { State } from './state';

export class PufferFishState extends State {
    static NAME = "pufferFish";

    constructor(scene) {
        super();

        this.scene = scene;
        this.player = scene.player;

        this.floatSpeed = -50; 
        this.fallSpeed = 60;
        this.moveSpeed = 150; 
        this.isFloating = false;

        this.player.body.setSize(8,8);
        this.player.body.setOffset(13, 13);
        this.player.body.setAllowGravity(true);
        this.player.setAngle(0);
    }

    transform() {
        this.player.anims.play("fishTrans", true);  
    }

    transformToSmall() {
        this.player.anims.play("fishSmall", true);
        this.player.body.setSize(8,8);
        this.player.body.setAllowGravity(false); 
        this.player.body.setVelocityY(this.fallSpeed);
        this.isFloating = false;
    }

    transformToBig() {
        this.player.anims.play("fishBig", true);
        this.player.body.setSize(12,12);
        this.player.body.setAllowGravity(false);
        this.player.body.setVelocityY(this.floatSpeed);
        this.isFloating = true;
    }

    update(t, dt) {

        const cursors = this.player.cursors;
        const justPressedSpace = Phaser.Input.Keyboard.JustDown(cursors.space);
        if (justPressedSpace) {
            if (this.isFloating) {
                this.transformToSmall();
            } else {
                this.transformToBig();
            }
        }

        
        this.player.moveHorizontal(0, this.moveSpeed, 1, t, dt);

        
        if (this.isFloating && !this.player.checkPlaying("fishTrans")) {
            this.player.anims.play("fishBig", true);
        } else if (!this.player.checkPlaying("fishTrans")){
            this.player.anims.play("fishSmall", true);
        }

        if (this.isFloating) {
            this.player.body.setVelocityY(this.floatSpeed);
        }
        else{
            this.player.body.setVelocityY(this.fallSpeed);
        }
    }

    checkState(stateString) {
        return stateString === PufferFishState.NAME;
    }
    toString(){
        return PufferFishState.NAME;
    }
}

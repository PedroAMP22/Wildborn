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

        this.left = null;
        this.right = null;
        this.up = null;
        this.down = null;

        this.leftBlock = false;
        this.upBlock = false;
        this.downBlock = false;
        this.rightBlock = false;

        this.topFallingSpeed = 250;
        this.player.setFlipY(false);
        this.player.body.setAllowGravity(true);
        this.isStuck = false;
        this.blockStuck = null;       
    }

    update(t, dt) {

        let canPlayIdle = true;
        
        if(this.player.checkPlaying("snailTrans")) canPlayIdle = false;
        
        this.left = this.scene.platformLayer.getTileAtWorldXY(this.player.x - 6, this.player.y);
        this.right = this.scene.platformLayer.getTileAtWorldXY(this.player.x + 6, this.player.y);
        this.up = this.scene.platformLayer.getTileAtWorldXY(this.player.x, this.player.y - 6);
        this.down = this.scene.platformLayer.getTileAtWorldXY(this.player.x, this.player.y + 8);
        
        this.player.playIdleIfPossible(canPlayIdle, "snailIdle");

        this.leftBlock = this.leftBlock || this.player.body.blocked.left;
        this.upBlock = this.upBlock || this.player.body.blocked.up;
        this.downBlock = this.downBlock || this.player.body.blocked.down;
        this.rightBlock = this.rightBlock || this.player.body.blocked.right;

        if(this.blockStuck != null ){

            const distanciaMax = 5;

            const gone = (
                (this.player.y + this.player.height + distanciaMax < this.blockStuck.y) ||
                (this.player.y - distanciaMax > this.blockStuck.y + this.blockStuck.height) ||
                (this.player.x + this.player.width + distanciaMax < this.blockStuck.x) ||
                (this.player.x - distanciaMax > this.blockStuck.x + this.blockStuck.width)
    
            );
            //console.log(gone);
            
            if((this.leftBlock || this.upBlock || this.downBlock || this.rightBlock)){
                this.left = this.leftBlock ? true : null;
                this.right = this.rightBlock ? true : null;
                this.up = this.upBlock ? true : null;
                this.stickToSurface();
            }
            if(this.blockStuck != null){
                if(this.blockStuck.body.velocity.x !== 0){
                    this.player.body.setVelocityX(this.blockStuck.body.velocity.x);
                    console.log(this.player.body.velocity.x);
                }
                   
                if(this.blockStuck.body.velocity.y !== 0)
                    this.player.body.setVelocityY(this.blockStuck.body.velocity.y);
                this.player.anims.play("snailIdle", true);
            }

            if(gone)
                this.blockStuck = null;
        }
        else{
            if((this.left || this.right || this.up || this.down)){
                this.stickToSurface();
                this.blockStuck = null;
            }
            else if(!this.isStuck){
                this.player.fall(this.topFallingSpeed);
            }
        }

        
        
    }

    stickToSurface() {

        this.isStuck = true;

        this.player.body.setVelocityX(0);
        this.player.body.setVelocityY(0);
        this.player.body.setAllowGravity(false);

        if (this.left) {
            this.player.setAngle(90);
            this.player.body.setOffset(9,12);

        } else if (this.right) {
            this.player.setAngle(-90);
            this.player.body.setOffset(15,12);
        } else if (this.up){
            this.player.setAngle(180);
            this.player.body.setOffset(11.5,8);

        }
        else{
            this.player.setAngle(0);
            this.player.body.setOffset(11.5,14.5);
        }
    }

    transform() {
        this.player.anims.play("snailTrans", true);
    }

    checkState(stateString){
        return stateString === SnailState.NAME;
    }

    onCollision(block){
        this.blockStuck = block;
    }
    toString(){
        return SnailState.NAME;
    }
}
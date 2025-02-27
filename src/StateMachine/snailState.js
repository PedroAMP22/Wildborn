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
        this.isStuck = false;
        this.player.body.setAllowGravity(true);
        this.blockStucked = null;
        
    }

    stickToSurface() {

        this.isStuck = true;
        this.player.body.setOffset(11.5,14.5);
        this.player.body.setVelocityX(0);
        this.player.body.setVelocityY(0);
        this.player.body.setAllowGravity(false);
        if (this.left) {
            //izquierda
            this.player.setPosition(this.player.x + 1, this.player.y);
            this.player.body.setOffset(9,12);
            this.player.setFlipX(false);
            this.player.setAngle(90);
        } else if (this.right) {
            //derecha
            this.player.setPosition(this.player.x - 2, this.player.y);
            this.player.body.setOffset(15,12);
            this.player.setFlipX(true);
            this.player.setAngle(-90);
        } else if (this.up){
            //techo
            this.player.setPosition(this.player.x, this.player.y + 6);
            this.player.body.setOffset(11.5,8);
            this.player.body.setGravityY(0);
            this.player.setAngle(180);
        }
       
        
    }

    transform() {
        this.player.anims.play("snailTrans", true);
    }

    update(t, dt) {
        let canPlayIdle = true;
        
        if(this.player.checkPlaying("snailTrans")) canPlayIdle = false;
        //CHECK STUCK PLATFORM LAYER
        this.left = this.scene.platformLayer.getTileAtWorldXY(this.player.x - 6, this.player.y);
        this.right = this.scene.platformLayer.getTileAtWorldXY(this.player.x + 6, this.player.y);
        this.up = this.scene.platformLayer.getTileAtWorldXY(this.player.x, this.player.y - 6);
        this.down = this.scene.platformLayer.getTileAtWorldXY(this.player.x, this.player.y + 8);
        if((this.left || this.right || this.up || this.down) && !this.isStuck){
            this.stickToSurface();
            console.log("aaaaaa")
        }
        else if(!this.isStuck){
            this.player.fall(this.topFallingSpeed);
        }
        this.player.playIdleIfPossible(canPlayIdle, "snailIdle");
        this.leftBlock = this.leftBlock || this.player.body.blocked.left;
        this.upBlock = this.leftBlock || this.player.body.blocked.up;
        this.downBlock = this.leftBlock || this.player.body.blocked.down;
        this.rightBlock = this.leftBlock || this.player.body.blocked.right;
        if(this.blockStucked != null){
            
            //CHECK STUCK MOVING BLOCK
            if((this.leftBlock || this.upBlock || this.downBlock || this.rightBlock) && !this.isStuck){
                this.left = this.leftBlock ? true : null;
                this.right = this.rightBlock ? true : null;
                this.up = this.upBlock ? true : null;
                this.stickToSurface();
            }
            if(this.blockStucked != null){
                if(this.blockStucked.body.velocity.x !== 0)
                    this.player.body.setVelocityX(this.blockStucked.body.velocity.x);
                if(this.blockStucked.body.velocity.y !== 0)
                    this.player.body.setVelocityY(this.blockStucked.body.velocity.y);
                this.player.anims.play("snailIdle", true);
            }
        }
        
        
    }
    checkState(stateString){
        return stateString === SnailState.NAME;
    }
    onCollision(block){
        this.blockStucked = block;
    }
}

import Phaser from 'phaser';
import ScreenBase from './screenBase.js';
import { MoveableBlock } from '../moveableBlock.js';
import { MovingBlock } from './../movingBlock';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Screen3_2 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        
        super('screen3_2',"screen3_2" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

        this.objectsLayer.objects.forEach(({ name, x, y }) => {
            if (name === "posA1") {
                this.posA1 = { x, y };
            } else if (name === "posB1") {
                this.posB1 = { x, y };
            } else if (name === "posC1") {
                this.posC1 = { x, y };
            } else if (name === "posA2"){
                this.posA2 = { x, y };
            } else if (name === "posB2"){
                this.posB2 = { x, y };
            } else if (name === "posC2"){
                this.posC2 = { x, y };
            } else if (name === "pointA1"){
                this.pointA1 = { x, y };
            } else if (name === "pointA2"){
                this.pointA2 = { x, y };
            } else if (name === "pointB1"){
                this.pointB1 = { x, y };
            } else if (name === "pointB2"){
                this.pointB2 = { x, y };
            } else if (name === "pointC1"){
                this.pointC1 = { x, y };
            } else if (name === "pointC2"){
                this.pointC2 = { x, y };
            }



        });

        this.moveableBlockA = new MoveableBlock(this, 5, this.posA1, this.posA2, null, 32, 32, true, "mossyBlock1x4", this.posA1)
        this.moveableBlockB = new MoveableBlock(this, 5, this.posB1, this.posB2, null, 32, 32, true, "icyBlock3x2", this.posB1)
        this.moveableBlockC = new MoveableBlock(this, 5, this.posC1, this.posC2, null, 32, 32, true, "icyBlock3x2", this.posC1)


        this.physics.add.collider(this.player, this.moveableBlockA, this.player.collisionWithMovingBlock);
        this.physics.add.overlap(this.airGroup, this.moveableBlockA, this.moveableBlockA.collisionWithAir.bind(this.moveableBlockA));
        this.physics.add.collider(this.moveableBlockA, this.platformLayer);
        
        this.physics.add.collider(this.player, this.moveableBlockB, this.player.collisionWithMovingBlock);
        this.physics.add.overlap(this.airGroup, this.moveableBlockB, this.moveableBlockA.collisionWithAir.bind(this.moveableBlockB));
        this.physics.add.collider(this.moveableBlockB, this.platformLayer);

        this.physics.add.collider(this.player, this.moveableBlockC, this.player.collisionWithMovingBlock);
        this.physics.add.overlap(this.airGroup, this.moveableBlockC, this.moveableBlockA.collisionWithAir.bind(this.moveableBlockC));
        this.physics.add.collider(this.moveableBlockC, this.platformLayer);

        this.physics.add.collider(this.moveableBlockA, this.moveableBlockB, () => {this.moveableBlockA.body.setAllowGravity(false); this.moveableBlockB.body.setAllowGravity(false) });
        this.physics.add.collider(this.moveableBlockB, this.moveableBlockC, () => {this.moveableBlockB.body.setAllowGravity(false); this.moveableBlockC.body.setAllowGravity(false) });
        this.physics.add.collider(this.moveableBlockA, this.moveableBlockC, () => {this.moveableBlockA.body.setAllowGravity(false); this.moveableBlockC.body.setAllowGravity(false) });



        this.movingBlockA = new MovingBlock(this, 2.9, this.pointA1, this.pointA2, 32, 16, false, "mossyBlock2x1")
        this.movingBlockB = new MovingBlock(this, 3, this.pointB1, this.pointB2, 32, 16, false, "mossyBlock2x1")
        this.movingBlockC = new MovingBlock(this, 3, this.pointC1, this.pointC2, 32, 16, false, "mossyBlock2x1")


        this.physics.add.collider(this.player, this.movingBlockA, this.player.collisionWithMovingBlock);
        this.physics.add.collider(this.player, this.movingBlockB, this.player.collisionWithMovingBlock);
        this.physics.add.collider(this.player, this.movingBlockC, this.player.collisionWithMovingBlock);



        //background image
        this.backgroundImage = this.add.image(0, 0, "MountainBG").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);

        this.textures.get("MountainBG").setFilter(Phaser.Textures.FilterMode.NEAREST);

    }

    createAScreen(){
        this.scene.start('screen3_1',{point:"B",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
        this.scene.start('screen3_3',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:[true,false,false,false,false]});
    }
    
   
}

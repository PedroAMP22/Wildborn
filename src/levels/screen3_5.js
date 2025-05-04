import CameraDummy from '../cameraDummy.js';
import { MovingBlock } from '../movingBlock.js';
import ScreenBase from './screenBase.js';
import Statue from '../statue.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Screenbase
 */
export default class Screen3_5 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen3_5',"screen3_5" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
            if(name === "pointA1"){
                this.pointA1 = {x,y};

            } else if(name === "pointA2")
                this.pointA2 = {x,y};
            else if(name === "posA1"){
                    this.posA1 = {x,y};
    
            } else if(name === "posA2")
                    this.posA2 = {x,y};
               
           
    });
        this.movingBlock = new MovingBlock(this,7,this.pointA1,this.pointA2,48,32,false, "mossyBlock3x2"); 
        this.statueA = new Statue(this, 5, this.posA1, this.posA2, null, 48, 32, true, "icyBlock3x2", this.posA1);

        this.physics.add.collider(this.player, this.statueA, this.player.collisionWithMovingBlock);
        this.physics.add.overlap(this.airGroup, this.statueA, this.statueA.collisionWithAir.bind(this.statueA));
        this.physics.add.collider(this.statueA, this.platformLayer);
        this.physics.add.collider(this.player, this.movingBlock, this.player.collisionWithMovingBlock);

        new CameraDummy(this, this.boss.x,this.boss.y, this.player);
        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
             
    }

    respawn(){
        super.respawn()
        this.statueA.respawn()
    }
    
    createBScreen(){
        if(this.bossDead)
            this.scene.start('screen3_6',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
}

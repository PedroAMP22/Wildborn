import { MovingBlock } from '../movingBlock.js';
import ScreenBase from './screenBase.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Screenbase
 */
export default class Screen2_1 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen2_1',"screen2_1" );
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
                this.pointB1 = {x,y};
           
        });
        this.movingBlock = new MovingBlock(this,7,this.pointA1,this.pointB1,48,32,false, "caveBlock3x2"); 
        this.physics.add.collider(this.player, this.movingBlock, this.player.collisionWithMovingBlock);
        //background image
        this.backgroundImage = this.add.image(0, 0, "MountainBG").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(1);
             
    }
    
    //conectar a 2_0
    createAScreen(){
        this.scene.start('screen1_1',{point:"B",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
        this.scene.start('screen2_2',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
}

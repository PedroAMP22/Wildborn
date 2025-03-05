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
export default class Screen1_6 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen1_6',"level1_6" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
            if(name === "pointA1"){
                this.pointA1 = {x,y};

            } else if(name === "pointB1"){
                this.pointB1 = {x,y};
            }else if(name === "pointA2"){
                this.pointA2 = {x,y};

            } else if(name === "pointB2"){
                this.pointB2 = {x,y};
            }
        });

        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);

        this.movingBlock = new MovingBlock(this,8,this.pointA1,this.pointA2,16,64)  
        this.movingBlock2 = new MovingBlock(this,8,this.pointB1,this.pointB2,16,64)        
        this.physics.add.collider(this.player, this.movingBlock, this.player.collisionWithMovingBlock);
        this.physics.add.collider(this.player, this.movingBlock2, this.player.collisionWithMovingBlock);
             
    }
    
    createAScreen(){
        this.scene.start('screen1_5',{point:"B",transformation:this.player.stateMachine.state.toString()});
    }
    createBScreen(){
        this.scene.start('screen1_7',{point:"A",transformation:this.player.stateMachine.state.toString()});
    }
}

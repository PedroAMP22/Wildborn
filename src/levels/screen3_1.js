import { MoveableBlock } from '../moveableBlock.js';
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
export default class Screen3_1 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen3_1',"screen3_1" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
            if(name === "posA1"){
                this.posA1 = {x,y};
            }else if(name === "posA2"){
                this.posA2 = {x,y};
            }else if(name === "posA3"){
                this.posA3 = {x,y};
            }
        });
        
        this.moveableBlock = new MoveableBlock(this,8,this.posA1,this.posA2,this.posA3,48,32,true, "mossyBlock3x2");           
        this.physics.add.collider(this.player, this.moveableBlock, this.player.collisionWithMovingBlock); 
        this.physics.add.collider(this.airGroup, this.moveableBlock, this.moveableBlock.collisionWithAir); 

        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
             
    }
    
    createAScreen(){
        this.scene.start('screen2_2',{point:"B",transformation:this.player.stateMachine.state.toString()});
    }
    createBScreen(){
        this.scene.start('screen2_4',{point:"A",transformation:this.player.stateMachine.state.toString()});
    }
}

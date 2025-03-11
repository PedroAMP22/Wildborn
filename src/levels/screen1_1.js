
import Phaser from 'phaser';
import { MovingBlock } from '../movingBlock.js';
import ScreenBase from './screenBase.js';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Screen1_1 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        
        super('screen1_1',"screen1_1" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

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

        this.movingBlock = new MovingBlock(this,5,this.pointA1,this.pointA2,48,32,false, "mossyBlock3x2")  
        this.movingBlock2 = new MovingBlock(this,5,this.pointB1,this.pointB2,48,32,false, "mossyBlock3x2")   
        this.physics.add.collider(this.player, this.movingBlock, this.player.collisionWithMovingBlock);
        this.physics.add.collider(this.player, this.movingBlock2, this.player.collisionWithMovingBlock);

      
    }

    createAScreen(){
<<<<<<< Updated upstream
        this.scene.start('screen1_0',{point:"B",transformation:this.player.stateMachine.state.toString()});
=======
        this.scene.start('screen3_1',{point:"A",transformation:this.player.stateMachine.state.toString()});
>>>>>>> Stashed changes
    }
    createBScreen(){
        this.scene.start('screen1_2',{point:"A",transformation:this.player.stateMachine.state.toString()});
    }
    
   
}

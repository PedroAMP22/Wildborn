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
export default class Screen1_3 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen1_3',"screen1_3" );
    }


    init(data){
        super.init(data)
        this.broken = data.broken;     
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

            } else if(name === "pointA2")
                this.pointB1 = {x,y};
           
        });

        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);


        this.movingBlock = new MovingBlock(this,7,this.pointA1,this.pointB1,48,32,false, "mossyBlock3x2"); 
        this.physics.add.collider(this.player, this.movingBlock, this.player.collisionWithMovingBlock);

             
    }
    
    createAScreen(){
        this.scene.start('screen1_2',{point:"B",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
        if(this.broken){
            this.scene.start('screen1_4_Broken',{point:"B",transformation:this.player.stateMachine.state.toString(),broken:this.broken,unlockedTranformations:this.unlockedTranformations});
        }
        else{
            this.scene.start('screen1_4',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
        }
        
    }
    createCScreen(){
        this.scene.start('screen1_5',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
}

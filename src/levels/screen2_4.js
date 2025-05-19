import { MovingBlock } from '../movingBlock.js';
import { ChickenState } from '../PlayerStateMachine/chickenState.js';
import ScreenBase from './screenBase.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Screenbase
 */
export default class Screen2_4 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen2_4',"screen2_4" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create();

        this.objectsLayer = this.map.getObjectLayer("objects");

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
                if(name === "pointA1"){
                    this.pointA1 = {x,y};

                }else if(name === "pointA2"){
                    this.pointA2 = {x,y};

                }    
        });

        //background image
        this.backgroundImage = this.add.image(0, 0, "CaveBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
        
        this.movingBlock = new MovingBlock(this,5,this.pointA1,this.pointA2,32,32,false, "spikedBlock2x2");
        this.physics.add.collider(this.player, this.movingBlock, () => this.respawn());

    }
    
    createAScreen(){
        this.scene.start('screen2_3',{point:"B",transformation:this.player.stateMachine.state.toString(),broken:false,unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
        this.cameras.main.fadeOut(1000, 0, 0, 0); 
        this.input.keyboard.enabled = false; 

        this.scene.start('unlockScreen',{point:"A",transformation:this.player.stateMachine.state.toString(),broken:false,nextScreen:"screen2_4_Broken",unlock:ChickenState.NAME,unlockedTranformations:[true,true,true,true,false]});
    }
}

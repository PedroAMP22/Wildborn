import { MoleState } from '../PlayerStateMachine/moleState.js';
import ScreenBase from './screenBase.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Screenbase
 */
export default class Screen1_8 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen1_9',"screen1_9" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()


        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
             
    }
    
    createAScreen(){
        this.scene.start('screen1_8',{point:"B",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }

    createBScreen(){
        this.cameras.main.fadeOut(1000, 0, 0, 0); 
        this.input.keyboard.enabled = false; 

       
        this.scene.start('unlockScreen',{point:"A",transformation:this.player.stateMachine.state.toString(),broken:false,nextScreen:"screen1_9_Broken",unlock:MoleState.NAME,unlockedTranformations:[true,true,true,false,false]});
       
    }
}

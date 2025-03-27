
import Phaser from 'phaser';
import ScreenBase from './screenBase.js';
import { SnailState } from '../StateMachine/snailState';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class UnlockScreen extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        
        super('unlockScreen',"unlockScreen" );
    }

    init(data){
        super.init(data)
        this.nextScreen = data.nextScreen;
        this.unlock = data.unlock;
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()    
        // Deactivate keyboard control
        this.input.keyboard.enabled = false;
        this.cameras.main.setZoom(1.5);
        this.player.body.setVelocityX(100);
        this.cameras.main.setFollowOffset(0);
        this.player.canMove = false;
        this.time.delayedCall(1000, () => { 
            this.player.stateMachine.transform(this.unlock);
        });
        
        this.input.keyboard.enabled = false; 
    }

    createAScreen(){
        this.scene.start(this.nextScreen,{point:this.point,transformation:this.player.stateMachine.state.toString()});
    }
    
   
}

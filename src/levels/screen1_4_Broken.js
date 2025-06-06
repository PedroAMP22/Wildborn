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
export default class Screen1_4_Broken extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen1_4_Broken',"screen1_4_Broken" );
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
        
        

        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
        if(!this.broken){
            this.input.keyboard.enabled = false;
            this.cameras.main.fadeIn(2000, 0, 0, 0); // Fade in from black
            this.time.delayedCall(2000, () => { 
                this.input.keyboard.enabled = true;
            });
        }
        this.infoImage = this.add.image(400, 400, 'squirrelInfo');
        this.infoImage.setVisible(false);
        this.infoImage.setDepth(100);
        
    }
    
    createBScreen(){
        this.scene.start('screen1_3',{point:"B",transformation:this.player.stateMachine.state.toString(),broken:true,unlockedTranformations:this.unlockedTranformations});
    }
}

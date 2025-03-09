
import Phaser from 'phaser';
import ScreenBase from './screenBase.js';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Screen0_1 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        
        super('screen0_1',"screen0_1" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

        //background image
        this.backgroundImage = this.add.image(0, 0, "MountainBG").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);

        this.textures.get("MountainBG").setFilter(Phaser.Textures.FilterMode.NEAREST);

      
    }

    createAScreen(){
        this.scene.start('screen0_0',{point:"A",transformation:this.player.stateMachine.state.toString()});
    }
    createBScreen(){
        this.scene.start('screen1_1',{point:"A",transformation:this.player.stateMachine.state.toString()});
    }
    
   
}

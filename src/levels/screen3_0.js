
import Phaser from 'phaser';
import ScreenBase from './screenBase.js';
import { SnailState } from '../PlayerStateMachine/snailState.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Screen3_0 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        
        super('screen3_0',"screen3_0" );
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

        this.overlapEvent = this.physics.add.collider(this.player, this.triggerZone, this.triggerFunction, null, this)
    }

    triggerFunction(player) {
        // Remove collider (weird loop if not)
        this.physics.world.removeCollider(this.overlapEvent);
    
        // Deactivate keyboard control
        this.input.keyboard.enabled = false;
        player.body.stop()
        player.body.setVelocityY(-50);
        
        player.body.setAllowGravity(false)
    
    
        this.time.delayedCall(500, () => {
            player.stateMachine.transform(SnailState.NAME);
            player.body.setAllowGravity(false)
            player.body.stop()


        });
    
        // Restore normal gameplay
        this.time.delayedCall(2000, () => {
            this.input.keyboard.enabled = true;
            player.body.setAllowGravity(true)
            console.log("Se restauró el control del jugador.");
        });
    }
    
    

    createAScreen(){
        this.scene.start('screen2_9',{point:"B",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
        this.scene.start('screen3_1',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:[true,false,false,false,false]});
    }
    
   
}

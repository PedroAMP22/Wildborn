
import Phaser from 'phaser';
import ScreenBase from './screenBase.js';
import Statue from '../statue.js';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
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

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

        this.objectsLayer.objects.forEach(({ name, x, y }) => {
            if (name === "posA1") {
                this.posA1 = { x, y };
            } else if (name === "posA2") {
                this.posA2 = { x, y };
            } else if (name === "posB2") {
                this.posB2 = { x, y };
            }
        });


        this.statueA = new Statue(this, 5, this.posA1, this.posA2, 48, 32, true, "icyBlock3x2", this.posA1); // movible
        this.statueB = new Statue(this, 5, this.posB2, this.posB2, 48, 32, false, "icyBlock3x2", this.posB2, true); // ya colocada

        this.physics.add.collider(this.player, this.statueA, this.player.collisionWithMovingBlock);
        this.physics.add.overlap(this.airGroup, this.statueA, this.statueA.collisionWithAir.bind(this.statueA));
        this.physics.add.collider(this.statueA, this.platformLayer);

        
        

        //background image
        this.backgroundImage = this.add.image(0, 0, "MountainBG").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);

        this.textures.get("MountainBG").setFilter(Phaser.Textures.FilterMode.NEAREST);

    }

    createAScreen(){
        this.scene.start('screen3_0',{point:"B",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
        this.scene.start('screen3_2',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:[true,false,false,false,false]});
    }
    
   
}

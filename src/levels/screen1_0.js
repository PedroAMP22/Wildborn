
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
export default class Screen1_0 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        
        super('screen1_0',"screen1_0" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        
        super.create()

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
            if(name === "triggerZone"){
                let triggerZone = this.physics.add.staticSprite(x + width / 2, y + height / 2, null);
                triggerZone.setSize(width, height);
                triggerZone.setOrigin(0.5);
                triggerZone.setAlpha(0);  //to make it invisible
                this.triggerZone = triggerZone;
            }
           
        });

        this.longFallSE = this.sound.add('longFall', {volume : 3})


        if(this.point === 'A')
            this.longFallSE.play();

        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);

        this.textures.get("ForestBG2").setFilter(Phaser.Textures.FilterMode.NEAREST);

        this.overlapEvent = this.physics.add.collider(this.player, this.triggerZone, this.triggerFunction, null, this)
        
        this.infoImage = this.add.image(400, 400, 'snailInfo').setScale(1.4);
        this.infoImage.setVisible(false);
        this.infoImage.setDepth(100);
    }
    
    createBScreen(){
        this.scene.start('screen1_1',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    
}

import Player from './player.js';
import Phaser from 'phaser';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        this.bases = this.add.group();
        this.player = new Player(this, 400, 300);
        
        this.anims.create({
            key:"run",
            frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 7 }),
            frameRate: 2,
            repeat:-1
        })

        this.physics.world.setBounds(0,0,540,360);
        this.cameras.main.startFollow(this.player,true, 0.1, 0.1);
        this.cameras.main.setBounds(0,0,540,360)
    }
   
}

import Boot from './boot.js';
import Phaser from 'phaser';
import Screen1_1 from './levels/screen1_1.js';
import Screen1_2 from './levels/screen1_2.js';
import Screen1_3 from './levels/screen1_3.js';
import Screen1_4 from './levels/screen1_4.js';
import Screen1_5 from './levels/screen1_5.js';
import Screen1_6 from './levels/screen1_6.js';
import Screen1_7 from './levels/screen1_7.js';
import Screen1_8 from './levels/screen1_8.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 200,
    parent: 'juego',
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Screen1_1, Screen1_2, Screen1_3,Screen1_4,Screen1_5,Screen1_6,Screen1_7,Screen1_8],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1600 },
            debug: true
        }
    }
};

new Phaser.Game(config);

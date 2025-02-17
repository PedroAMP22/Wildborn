import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import Phaser from 'phaser';

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
    scene: [Boot, Level, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1600 },
            debug: true
        }
    }
};

new Phaser.Game(config);

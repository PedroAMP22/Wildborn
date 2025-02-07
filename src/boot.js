import Phaser from 'phaser'

import playerRun from '../assets/sprites/run.png'
import playerIdle from '../assets/sprites/idle.png'
import playerFall from '../assets/sprites/fall.png'
import playerJump from '../assets/sprites/jump.png'
import playerLand from '../assets/sprites/landing.png'

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {

    this.load.spritesheet('playerRun', playerRun, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('playerIdle', playerIdle, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('playerFall', playerFall, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('playerFall', playerFall, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('playerJump', playerJump, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('playerLand', playerLand, {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');
  }
}
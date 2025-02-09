import Phaser from 'phaser'

import playerTrans from '../assets/sprites/druid/transDruid.png'
import playerRun from '../assets/sprites/druid/run.png'
import playerIdle from '../assets/sprites/druid/idle.png'
import playerFall from '../assets/sprites/druid/fall.png'
import playerJump from '../assets/sprites/druid/jump.png'
import playerLand from '../assets/sprites/druid/landing.png'

import snailIdle from '../assets/sprites/snail/idleSnail.png'
import snailTrans from '../assets/sprites/snail/transSnail.png'

import squirrelTrans from '../assets/sprites/squirrel/transSquirrel.png'
import squirrelRun from '../assets/sprites/squirrel/runSquirrel.png'
import squirrelIdle from '../assets/sprites/squirrel/idleSquirrel.png'
import squirrelAir from '../assets/sprites/squirrel/airSquirrel.png'
import squirrelJump from '../assets/sprites/squirrel/jumpSquirrel.png'
import squirrelFly from '../assets/sprites/squirrel/flySquirrel.png'
import moleIdle from '../assets/sprites/mole/idleMole.png'
import moleRun from '../assets/sprites/mole/runMole.png'
import moleTrans from '../assets/sprites/mole/transMole.png'

import level1 from '../assets/tilemaps/level1_1.json'
import tileSet1 from '../assets/tilemaps/SheetA.png'
import tileSet2 from '../assets/tilemaps/SheetB.png'

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

    //DRUID
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
    this.load.spritesheet('playerJump', playerJump, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('playerLand', playerLand, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('playerTrans', playerTrans,{
      frameWidth : 32,
      frameHeight : 32
    });

    //SQUIRREL
    this.load.spritesheet('squirrelTrans', squirrelTrans, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('squirrelRun', squirrelRun, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('squirrelIdle', squirrelIdle, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('squirrelAir', squirrelAir, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('squirrelJump', squirrelJump, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('squirrelFly', squirrelFly,{
      frameWidth : 32,
      frameHeight : 32
    });

    //SNAIL
    this.load.spritesheet('snailIdle', snailIdle,{
      frameWidth : 32,
      frameHeight : 32
    });
    this.load.spritesheet('snailTrans', snailTrans,{
      frameWidth : 32,
      frameHeight: 32
    });

    //Mole
    this.load.spritesheet('moleIdle', moleIdle,{
      frameWidth : 32,
      frameHeight : 32
    });
    this.load.spritesheet('moleTrans', moleTrans,{
      frameWidth : 32,
      frameHeight: 32
    });
    this.load.spritesheet('moleRun', moleRun,{
      frameWidth : 32,
      frameHeight: 32
    });

    //Tile maps
    this.load.tilemapTiledJSON('level1',level1);
    this.load.image("tileSet1", tileSet1);
    this.load.image("tileSet2", tileSet2);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');
  }
}
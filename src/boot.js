import Phaser from 'phaser'

import druidTrans from '../assets/sprites/druid/transDruid.png'
import druidRun from '../assets/sprites/druid/run.png'
import druidIdle from '../assets/sprites/druid/idle.png'
import druidFall from '../assets/sprites/druid/fall.png'
import druidJump from '../assets/sprites/druid/jump.png'
import druidLand from '../assets/sprites/druid/landing.png'
import druidDeath from '../assets/sprites/druid/death.png'

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
import moleFall from '../assets/sprites/mole/fallMole.png'
import moleFly from '../assets/sprites/mole/flyMole.png'
import moleHide from '../assets/sprites/mole/hideMole.png'
import moleIdleHidden from '../assets/sprites/mole/idleHiddenMole.png'
import moleJump from '../assets/sprites/mole/jumpMole.png'


import fishBig from '../assets/sprites/pufferfish/idleFishBig.png'
import fishSmall from '../assets/sprites/pufferfish/idleFishSmall.png'
import fishTrans from '../assets/sprites/pufferfish/transFish.png'


import chickenFlap from '../assets/sprites/chicken/flapChicken.png'
import chickenIdle from '../assets/sprites/chicken/idleChicken.png'
import chickenRun from '../assets/sprites/chicken/runChicken.png'
import chickenTrans from '../assets/sprites/chicken/transChicken.png'

import rune from '../assets/sprites/runes/rune1Spin.png'

import eKey from '../assets/sprites/keys/eKey.png'

import screenMenu from '../assets/tilemaps/menus/mainMenuLevel.json'
import unlockScreen from '../assets/tilemaps/menus/unlockScreen.json'
import screenLevelSel from '../assets/tilemaps/menus/levelSelectorScreen.json'

import screen0_0 from '../assets/tilemaps/levels/level_0/screen0_0.json'
import screen0_1 from '../assets/tilemaps/levels/level_0/screen0_1.json'
import screen1_0 from '../assets/tilemaps/levels/level_1/screen1_0.json'
import screen1_1 from '../assets/tilemaps/levels/level_1/screen1_1.json'
import screen1_2 from '../assets/tilemaps/levels/level_1/screen1_2.json'
import screen1_3 from '../assets/tilemaps/levels/level_1/screen1_3.json'
import screen1_4 from '../assets/tilemaps/levels/level_1/screen1_4.json'
import screen1_4_Broken from '../assets/tilemaps/levels/level_1/screen1_4_Broken.json'
import screen1_5 from '../assets/tilemaps/levels/level_1/screen1_5.json'
import screen1_6 from '../assets/tilemaps/levels/level_1/screen1_6.json'
import screen1_7 from '../assets/tilemaps/levels/level_1/screen1_7.json'
import screen1_8 from '../assets/tilemaps/levels/level_1/screen1_8.json'
import screen1_9 from '../assets/tilemaps/levels/level_1/screen1_9.json'
import screen1_9_Broken from '../assets/tilemaps/levels/level_1/screen1_9_Broken.json'
import screen2_1 from '../assets/tilemaps/levels/level_2/screen2_1.json'
import screen2_2 from '../assets/tilemaps/levels/level_2/screen2_2.json'
import screen2_3 from '../assets/tilemaps/levels/level_2/screen2_3.json'
import screen2_4 from '../assets/tilemaps/levels/level_2/screen2_4.json'
import screen2_4_Broken from '../assets/tilemaps/levels/level_2/screen2_4_Broken.json'
import screen2_5 from '../assets/tilemaps/levels/level_2/screen2_5.json'
import screen2_6 from '../assets/tilemaps/levels/level_2/screen2_6.json'
import screen2_7 from '../assets/tilemaps/levels/level_2/screen2_7.json'
import screen3_0 from '../assets/tilemaps/levels/level_3/screen3_0.json'
import screen3_1 from '../assets/tilemaps/levels/level_3/screen3_1.json'
import screen3_2 from '../assets/tilemaps/levels/level_3/screen3_2.json'
import screen3_3 from '../assets/tilemaps/levels/level_3/screen3_3.json'
import screen3_5 from '../assets/tilemaps/levels/level_3/screen3_5.json'





import tileSet1 from '../assets/tilemaps/SheetA.png'
import tileSet2 from '../assets/tilemaps/SheetB.png'
import tileSet3 from '../assets/tilemaps/SheetC.png'
import thorns from '../assets/tilemaps/thorns.png'
import spikes from '../assets/tilemaps/Spikes.png'
import backgroundForest from '../assets/tilemaps/backgrounds/ForestBG2.png'
import backgroundMountain from '../assets/tilemaps/backgrounds/MountainBG.png'
import backgroundCave from '../assets/tilemaps/backgrounds/CaveBG1.png'
import backgroundCave2 from '../assets/tilemaps/backgrounds/CaveBG2.png'

import backgroundWood from '../assets/tilemaps/menuImages/WoodBackground.jpeg'

import mossyBlock3x2 from '../assets/sprites/blocks/mossyBlock3x2.png'
import mossyBlock1x4 from '../assets/sprites/blocks/mossyBlock1x4.png'
import icyBlock3x2 from '../assets/sprites/blocks/icyBlock3x2.png'
import spikedBlock2x2 from '../assets/sprites/blocks/spikedBlock2x2.png'
import caveBlock3x2 from '../assets/sprites/blocks/caveBlock3x2.png'
import mossyBlock2x1 from '../assets/sprites/blocks/mossyBlock2x1.png'


import snailInfo from '../assets/imagesMain/SnailInfo.png'
import ChickenInfo from '../assets/imagesMain/ChickenInfo.png'
import MoleInfo from '../assets/imagesMain/MoleInfo.png'
import FishInfo from '../assets/imagesMain/FishInfo.jpeg'
import SquirrelInfo from '../assets/imagesMain/SquirrelInfo.png'

import menuMusic from '../assets/music/menuMusic.mp3'
import bosqueMusica from '../assets/music/bosque.mp3';
import montaniaMusica from '../assets/music/montania.mp3';
import temploMusica from '../assets/music/templo.mp3';
import bossMusica from '../assets/music/boss.mp3';

import grassFootsteps from '../assets/sfx/grass_footsteps.wav'
import snowFootsteps from '../assets/sfx/snow_footsteps.wav'
import stoneFootsteps from '../assets/sfx/stone_footsteps.wav'
import jump from '../assets/sfx/jump.wav'
import death from '../assets/sfx/death.wav'
import longFall from '../assets/sfx/longFall.wav'
import puff from '../assets/sfx/puff.wav'

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
    this.load.spritesheet('druidRun', druidRun, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('druidIdle', druidIdle, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('druidFall', druidFall, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('druidJump', druidJump, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('druidLand', druidLand, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('druidTrans', druidTrans,{
      frameWidth : 32,
      frameHeight : 32
    });
    this.load.spritesheet('druidDeath', druidDeath,{
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
    this.load.spritesheet('moleFall', moleFall,{
      frameWidth : 32,
      frameHeight : 32
    });
    this.load.spritesheet('moleFly', moleFly,{
      frameWidth : 32,
      frameHeight: 32
    });
    this.load.spritesheet('moleHide', moleHide,{
      frameWidth : 32,
      frameHeight: 32
    });
    this.load.spritesheet('moleHiddenIdle', moleIdleHidden,{
      frameWidth : 32,
      frameHeight : 32
    });
    this.load.spritesheet('moleJump', moleJump,{
      frameWidth : 32,
      frameHeight : 32
    });

    //Pufferfish
    this.load.spritesheet('fishBig', fishBig, {
      frameWidth : 32,
      frameHeight : 32
    })

    this.load.spritesheet('fishSmall', fishSmall, {
      frameWidth : 32,
      frameHeight : 32
    })

    this.load.spritesheet('fishTrans', fishTrans, {
      frameWidth : 32,
      frameHeight : 32
    })

    //Chicken
    this.load.spritesheet('chickenFlap', chickenFlap, {
      frameWidth : 32,
      frameHeight : 32
    })
    this.load.spritesheet('chickenIdle', chickenIdle, {
      frameWidth : 32,
      frameHeight : 32
    })
    this.load.spritesheet('chickenRun', chickenRun, {
      frameWidth : 32,
      frameHeight : 32
    })
    this.load.spritesheet('chickenTrans', chickenTrans, {
      frameWidth : 32,
      frameHeight : 32
    })
    this.load.spritesheet('rune', rune, {
      frameWidth : 32,
      frameHeight : 32
    })
    this.load.spritesheet('eKey', eKey, {
      frameWidth : 13,
      frameHeight : 13
    })
    //Tile maps
    this.load.tilemapTiledJSON("screenMenu", screenMenu);
    this.load.tilemapTiledJSON("screenLevelSel", screenLevelSel)
    this.load.tilemapTiledJSON('screen0_0',screen0_0);
    this.load.tilemapTiledJSON('screen0_1',screen0_1);
    this.load.tilemapTiledJSON('screen1_0',screen1_0);
    this.load.tilemapTiledJSON('screen1_1',screen1_1);
    this.load.tilemapTiledJSON('screen1_2',screen1_2);
    this.load.tilemapTiledJSON('screen1_3',screen1_3);
    this.load.tilemapTiledJSON('screen1_4',screen1_4);
    this.load.tilemapTiledJSON('screen1_4_Broken',screen1_4_Broken);
    this.load.tilemapTiledJSON('screen1_5',screen1_5);
    this.load.tilemapTiledJSON('screen1_6',screen1_6);
    this.load.tilemapTiledJSON('screen1_7',screen1_7);
    this.load.tilemapTiledJSON('screen1_8',screen1_8);
    this.load.tilemapTiledJSON('screen1_9',screen1_9);
    this.load.tilemapTiledJSON('screen1_9_Broken',screen1_9_Broken);
    this.load.tilemapTiledJSON('screen2_1',screen2_1);
    this.load.tilemapTiledJSON('screen2_2',screen2_2);
    this.load.tilemapTiledJSON('screen2_3',screen2_3);
    this.load.tilemapTiledJSON('screen2_4',screen2_4);
    this.load.tilemapTiledJSON('screen2_4_Broken',screen2_4_Broken);
    this.load.tilemapTiledJSON('screen2_5',screen2_5);
    this.load.tilemapTiledJSON('screen2_6',screen2_6);
    this.load.tilemapTiledJSON('screen2_7',screen2_7);
    this.load.tilemapTiledJSON('screen3_0',screen3_0);
    this.load.tilemapTiledJSON('screen3_1',screen3_1);
    this.load.tilemapTiledJSON('screen3_2',screen3_2);
    this.load.tilemapTiledJSON('screen3_3',screen3_3);
    this.load.tilemapTiledJSON('screen3_5',screen3_5);
    this.load.tilemapTiledJSON('unlockScreen',unlockScreen);
    this.load.image("tileSet1", tileSet1);
    this.load.image("tileSet2", tileSet2);
    this.load.image("tileSet3", tileSet3);
    this.load.image("ForestBG2", backgroundForest);
    this.load.image("MountainBG", backgroundMountain);
    this.load.image("CaveBG1", backgroundCave);
    this.load.image("CaveBG2", backgroundCave2);
    this.load.image("thorns",thorns);
    this.load.image("spikes",spikes);
    this.load.image("snailInfo",snailInfo);
    this.load.image("squirrelInfo",SquirrelInfo);
    this.load.image("moleInfo",MoleInfo);
    this.load.image("fishInfo",FishInfo);
    this.load.image("chickenInfo",ChickenInfo);
    this.load.image("icyBlock3x2",icyBlock3x2);
    this.load.image("caveBlock3x2",caveBlock3x2);
    this.load.image("spikedBlock2x2",spikedBlock2x2);

    this.load.image("backgroundWood", backgroundWood);

    this.load.spritesheet('mossyBlock3x2', mossyBlock3x2, {
      frameWidth : 48,
      frameHeight : 32
    });
    this.load.spritesheet('mossyBlock2x1', mossyBlock2x1, {
      frameWidth : 32,
      frameHeight : 16
    });
    this.load.spritesheet('mossyBlock1x4', mossyBlock1x4, {
      frameWidth : 16,
      frameHeight : 64
    });

    //MUSICA
    this.load.audio('menuMusic', menuMusic)
    this.load.audio('bosque_musica', bosqueMusica);
    this.load.audio('montania_musica', montaniaMusica);
    this.load.audio('templo_musica', temploMusica);
    this.load.audio('boss_musica', bossMusica);
    this.load.audio('menuMusic', menuMusic)


    // SFX
    // walking sound effects
    this.load.audio('footsteps_grass', grassFootsteps)
    this.load.audio('footstep_snow', snowFootsteps)
    this.load.audio('footstep_stone', stoneFootsteps)

    //jump
    this.load.audio('jump', jump)

    //death
    this.load.audio('death', death)

    //long fall
    this.load.audio('longFall', longFall)

    // Transformation (puff)
    this.load.audio('puff', puff)


  }

  create() {
    // Boss is in screen3_5
    this.scene.start('screenMenu',{unlockedTranformations:[true,true,true,true,true]});

  }
}
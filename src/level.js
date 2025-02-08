import Player from './player.js';
import Phaser from 'phaser';
import { DruidState } from './StateMachine/druidState.js';
import { SnailState } from './StateMachine/snailState.js';

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
        this.player = new Player(this, 30, 20);
        this.player.stateMachine.transform(DruidState.NAME);
        this.anims.create({
            key:"druidRun",
            frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 7 }),
            frameRate: 10,
            repeat:-1
        });
        this.anims.create({
            key:"druidIdle",
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat:-1
        });
        this.anims.create({
            key:"druidFall",
            frames: this.anims.generateFrameNumbers('playerFall', { start: 0, end: 5 }),
            frameRate: 10
        });
        this.anims.create({
            key:"druidJump",
            frames: this.anims.generateFrameNumbers('playerJump', { start: 0, end: 4 }),
            frameRate: 10
        });
        this.anims.create({
            key:"druidLand",
            frames: this.anims.generateFrameNumbers('playerLand', { start: 0, end: 3 }),
            frameRate: 10
        });
        this.anims.create({
            key: "snailIdle",
            frames: this.anims.generateFrameNumbers('snailIdle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: "snailTrans",
            frames: this.anims.generateFrameNumbers('snailTrans', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        this.map = this.make.tilemap({key: "level1"});
        this.tileset = this.map.addTilesetImage("ground","tilemapImage",32,32);

        this.platformLayer = this.map.createLayer("platform", this.tileset);

        this.platformLayer.setCollisionByExclusion([-1]);

        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.world.setBounds(0,0,2560,1024);
        this.cameras.main.startFollow(this.player,true, 0.1, 0.1);
        this.cameras.main.setBounds(0,0,2560,1024)
    }
   
}

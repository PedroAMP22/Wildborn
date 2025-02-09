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

        this.map = this.make.tilemap({key: "level1"});

        //spawnpoint
        this.spawnPoint = this.map.findObject("objects", obj=>obj.name==="playerSpawn");


        this.bases = this.add.group();
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
        this.player.stateMachine.transform(DruidState.NAME);
        this.player.setDepth(3);
        //ANIMATIONS

        //DRUID
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
            frameRate: 10,
            repeat:-1
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
            key:"playerTrans",
            frames: this.anims.generateFrameNumbers('playerTrans', { start: 0, end: 4 }),
            frameRate: 20
        });

        //SNAIL
        this.anims.create({
            key: "snailIdle",
            frames: this.anims.generateFrameNumbers('snailIdle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: "snailTrans",
            frames: this.anims.generateFrameNumbers('snailTrans', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: 0
        });


        //SQUIRREL
        this.anims.create({
            key:"squirrelRun",
            frames: this.anims.generateFrameNumbers('squirrelRun', { start: 0, end: 4 }),
            frameRate: 10,
            repeat:-1
        });
        this.anims.create({
            key:"squirrelIdle",
            frames: this.anims.generateFrameNumbers('squirrelIdle', { start: 0, end: 3 }),
            frameRate: 4,
            repeat:-1
        });
        this.anims.create({
            key:"squirrelAir",
            frames: this.anims.generateFrameNumbers('squirrelAir', { start: 0, end: 0 }),
            frameRate: 1,
            repeat:-1
        });
        this.anims.create({
            key:"squirrelJump",
            frames: this.anims.generateFrameNumbers('squirrelJump', { start: 0, end: 1 }),
            frameRate: 5,
            repeat:0
        });
        this.anims.create({
            key:"squirrelFly",
            frames: this.anims.generateFrameNumbers('squirrelFly', { start: 0, end: 1 }),
            frameRate: 2,
            repeat:-1
        });
        this.anims.create({
            key:"squirrelTrans",
            frames: this.anims.generateFrameNumbers('squirrelTrans', { start: 0, end: 6 }),
            frameRate: 20

        });
        //MOLE
        this.anims.create({
            key: "moleIdle",
            frames: this.anims.generateFrameNumbers('moleIdle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: "moleTrans",
            frames: this.anims.generateFrameNumbers('moleTrans', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: "moleRun",
            frames: this.anims.generateFrameNumbers('moleRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        
       
        this.tileset1 = this.map.addTilesetImage("SheetA","tileSet1",16,16);
        this.tileset2 = this.map.addTilesetImage("SheetB","tileSet2",16,16);

        this.decoLayer = this.map.createLayer("deco", [this.tileset2,this.tileset1]);
        this.backgroundLayer = this.map.createLayer("background");
        this.platformLayer = this.map.createLayer("platforms", [this.tileset2,this.tileset1]);
    
        
        this.platformLayer.setCollisionByExclusion([-1]);

        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.world.setBounds(0,0, 64 * 16, 16 * 16);
        this.cameras.main.startFollow(this.player,true, 0.1, 0.25);
        this.cameras.main.setBounds(0,0,32 * 16,16 * 16)
    }
   
}

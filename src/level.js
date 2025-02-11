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

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

        this.killingObjects = this.physics.add.staticGroup();

        this.spawnPoint = { x: 100, y: 100 };
        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
                if (name === "playerSpawn") {
                    this.spawnPoint = { x, y };
                } else {
                    //creates a "invisible sprite" so it can collide
                    let killZone = this.physics.add.staticSprite(x + width / 2, y + height / 2, null);
                    killZone.setSize(width, height);
                    killZone.setOrigin(0.5);
                    killZone.setAlpha(0);  //to make it invisible
                    this.killingObjects.add(killZone);
                }
        });

        //Player creator
        this.bases = this.add.group();
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
        this.player.stateMachine.transform(DruidState.NAME);
        this.player.setDepth(3);
        //ANIMATIONS

        //DRUID
        this.anims.create({
            key:"druidRun",
            frames: this.anims.generateFrameNumbers('druidRun', { start: 0, end: 7 }),
            frameRate: 10,
            repeat:-1
        });
        this.anims.create({
            key:"druidIdle",
            frames: this.anims.generateFrameNumbers('druidIdle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat:-1
        });
        this.anims.create({
            key:"druidFall",
            frames: this.anims.generateFrameNumbers('druidFall', { start: 0, end: 5 }),
            frameRate: 10,
            repeat:-1
        });
        this.anims.create({
            key:"druidJump",
            frames: this.anims.generateFrameNumbers('druidJump', { start: 0, end: 4 }),
            frameRate: 10
        });
        this.anims.create({
            key:"druidLand",
            frames: this.anims.generateFrameNumbers('druidLand', { start: 0, end: 3 }),
            frameRate: 10
        });
        this.anims.create({
            key:"druidDeath",
            frames: this.anims.generateFrameNumbers('druidDeath', { start: 0, end: 7 }),
            frameRate: 10
        });
        this.anims.create({
            key:"druidTrans",
            frames: this.anims.generateFrameNumbers('druidTrans', { start: 0, end: 4 }),
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
            frameRate: 20,
            repeat:0
        });
        this.anims.create({
            key:"squirrelFly",
            frames: this.anims.generateFrameNumbers('squirrelFly', { start: 0, end: 1 }),
            frameRate: 5,
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
        });
        this.anims.create({
            key: "moleRun",
            frames: this.anims.generateFrameNumbers('moleRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "moleFall",
            frames: this.anims.generateFrameNumbers('moleFall', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: "moleFly",
            frames: this.anims.generateFrameNumbers('moleFly', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "moleHide",
            frames: this.anims.generateFrameNumbers('moleHide', { start: 0, end: 7 }),
            frameRate: 10,
        });
        this.anims.create({
            key: "moleHide2",
            frames: this.anims.generateFrameNumbers('moleHide', { start: 3, end: 7 }),
            frameRate: 10,
        });
        this.anims.create({
            key: "moleHiddenIdle",
            frames: this.anims.generateFrameNumbers('moleHiddenIdle', { start: 0, end: 11 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: "moleJump",
            frames: this.anims.generateFrameNumbers('moleJump', { start: 0, end: 9 }),
            frameRate: 20,
        });

        
        //load all tileset and layers
        this.tileset1 = this.map.addTilesetImage("SheetA","tileSet1",16,16);
        this.tileset2 = this.map.addTilesetImage("SheetB","tileSet2",16,16);
        this.thonsTileSet = this.map.addTilesetImage("thorns", "thorns", 16,16);
        
        this.decoLayer = this.map.createLayer("deco", [this.tileset2,this.tileset1, this.thonsTileSet]);
        this.backgroundLayer = this.map.createLayer("background");
        this.platformLayer = this.map.createLayer("platforms", [this.tileset2,this.tileset1, this.thonsTileSet]);  
        
        
        this.platformLayer.setCollisionByExclusion([-1]);

        //backgrounf image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);

        //if player collides with a "killing zone" respawn
        this.physics.add.collider(this.player, this.platformLayer);
    
        this.physics.add.overlap(this.player, this.killingObjects, () => {
            this.respawn();
        });

        //camera config
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.world.setBounds(0,0, 64 * 16, 16 * 16);
        this.cameras.main.startFollow(this.player,true, 0.1, 0.25);
        this.cameras.main.setBounds(0,0,32 * 16,16 * 16)
    }

    respawn(){
        this.player.setPosition(this.spawnPoint.x, this.spawnPoint.y);
    }
   
}

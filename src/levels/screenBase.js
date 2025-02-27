import Phaser from 'phaser';
import Player from '../player.js';
import { DruidState } from '../StateMachine/druidState.js';

export default class ScreenBase extends Phaser.Scene {

    /**
    * Constructor de la escena
    */
    constructor(key, levelkey) {
        super({ key: key});
        this.key = key
        this.levelkey = levelkey
    }


    create(){
        this.map = this.make.tilemap({key: this.levelkey });

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

        this.killingObjects = this.physics.add.staticGroup();

        this.spawnPoint = { x: 100, y: 100 };
        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
                if (name.startsWith("spawnpoint")) { // spawnPoint
                    this[name] = { x, y };
                    console.log("Spawpoint:" + this.spawnPoint);
                    console.log(x , y)
                }
                else if(name === "killingZone") {
                    //creates a "invisible sprite" so it can collide
                    let killZone = this.physics.add.staticSprite(x + width / 2, y + height / 2, null);
                    killZone.setSize(width, height);
                    killZone.setOrigin(0.5);
                    killZone.setAlpha(0);  //to make it invisible
                    this.killingObjects.add(killZone);
                }
        });

        //Player creator
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
        this.player.stateMachine.transform(DruidState.NAME);
        this.player.setDepth(3);

        //load all tileset and layers
        this.tileset1 = this.map.addTilesetImage("SheetA","tileSet1",16,16);
        this.tileset2 = this.map.addTilesetImage("SheetB","tileSet2",16,16);
        this.thonsTileSet = this.map.addTilesetImage("thorns", "thorns", 16,16);
        
        this.decoLayer = this.map.createLayer("deco", [this.tileset2,this.tileset1, this.thonsTileSet]);
        this.backgroundLayer = this.map.createLayer("background");
        this.platformLayer = this.map.createLayer("platforms", [this.tileset2,this.tileset1, this.thonsTileSet]);

        this.platformLayer.setCollisionByExclusion([-1]);

             
        //if player collides with a "killing zone" respawn
        this.physics.add.collider(this.player, this.platformLayer);

    
        this.physics.add.overlap(this.player, this.killingObjects, () => {
            this.respawn();
        });

        //camera config
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player,true, 0.1, 0.25);
        this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels)

    }

    respawn(){
        this.player.body.setVelocity(0,0);
        this.player.momentum = 0;
        this.player.stateMachine.transform(DruidState.NAME);
        this.player.setPosition(this.spawnPoint.x, this.spawnPoint.y);
    }
}

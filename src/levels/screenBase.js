import Phaser from 'phaser';
import Player from '../player.js';
import { DruidState } from '../StateMachine/druidState.js';
import { Rune } from '../rune.js';


export default class ScreenBase extends Phaser.Scene {

    /**
    * Constructor de la escena
    */
    constructor(key, levelkey) {
        super({ key: key});
        this.key = key
        this.levelkey = levelkey
    }

    init(data){
        this.point = data.point;
        if(data.transformation){
            this.transformation = data.transformation;
        }
        else{
            this.transformation = DruidState.NAME;
        }
        
    }

    create(){
        this.map = this.make.tilemap({key: this.levelkey });

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

        this.killingObjects = this.physics.add.staticGroup();
        this.spawnZoneA = this.physics.add.staticGroup();
        this.spawnZoneB = this.physics.add.staticGroup();
        this.spawnZoneC = this.physics.add.staticGroup();
        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
                if (name === "spawnpointA") { // spawnPoint
                    this.spawnPointA = { x, y };  
                }
                else if(name === "spawnpointB") {
                    this.spawnPointB = { x, y };  
                }
                else if(name === "spawnpointC") {
                    this.spawnPointC = { x, y };  
                }
                else if (name === "spawnZoneA") { //change level zones
                    let spawn = this.physics.add.staticSprite(x + width / 2, y + height / 2, null);
                    spawn.setSize(width, height);
                    spawn.setOrigin(0.5);
                    spawn.setAlpha(0);
                    this.spawnZoneA.add(spawn);
                    
                }
                else if(name === "spawnZoneB") {
                    let spawn = this.physics.add.staticSprite(x + width / 2, y + height / 2, null);
                    spawn.setSize(width, height);
                    spawn.setOrigin(0.5);
                    spawn.setAlpha(0);
                    this.spawnZoneB.add(spawn);
                }
                else if(name === "spawnZoneC") {
                    let spawn = this.physics.add.staticSprite(x + width / 2, y + height / 2, null);
                    spawn.setSize(width, height);
                    spawn.setOrigin(0.5);
                    spawn.setAlpha(0);
                    this.spawnZoneC.add(spawn);
                }
                else if(name === "killingZone") {
                    //creates a "invisible sprite" so it can collide
                    let killZone = this.physics.add.staticSprite(x + width / 2, y + height / 2, null);
                    killZone.setSize(width, height);
                    killZone.setOrigin(0.5);
                    killZone.setAlpha(0);  //to make it invisible
                    this.killingObjects.add(killZone);
                }
                else if(name === "rune"){
                    this.rune = new Rune(this,x,y);
                    
                }
        });

        //Player creator
        if(this.point){
            if(this.point === 'A'){
                this.player = new Player(this, this.spawnPointA.x, this.spawnPointA.y);
            }
            else if(this.point === 'B'){
                this.player = new Player(this, this.spawnPointB.x, this.spawnPointB.y);
            }
            else{
                this.player = new Player(this, this.spawnPointC.x, this.spawnPointC.y);
            }
        }
        else{
            this.player = new Player(this, this.spawnPointA.x, this.spawnPointA.y);
        }
        
        this.player.stateMachine.transform(this.transformation);
        this.player.setDepth(3);
        this.player.setRune(this.rune);

        //load all tileset and layers
        this.tileset1 = this.map.addTilesetImage("SheetA","tileSet1",16,16);
        this.tileset2 = this.map.addTilesetImage("SheetB","tileSet2",16,16);
        this.tileset3 = this.map.addTilesetImage("SheetC", "tileSet3", 16, 16);
        this.thonsTileSet = this.map.addTilesetImage("thorns", "thorns", 16,16);
        this.spikesTileSet = this.map.addTilesetImage("Spikes", "spikes", 16,16);
        
        this.backgroundLayer = this.map.createLayer("background");
        this.decoBackLayer = this.map.createLayer("decoBack", [this.tileset3, this.tileset2,this.tileset1, this.thonsTileSet, this.spikesTileSet]);
        this.decoLayer = this.map.createLayer("deco", [this.tileset3, this.tileset2,this.tileset1, this.thonsTileSet, this.spikesTileSet]);
        this.platformLayer = this.map.createLayer("platforms", [this.tileset3, this.tileset2,this.tileset1, this.thonsTileSet, this.spikesTileSet]);
        this.decoFrontLayer = this.map.createLayer("decoFront", [this.tileset3, this.tileset2,this.tileset1, this.thonsTileSet, this.spikesTileSet]);
        
        this.decoFrontLayer.setDepth(4);
        this.platformLayer.setDepth(3);
        this.decoLayer.setDepth(1);
        this.decoBackLayer.setDepth(0);
        
        this.platformLayer.setCollisionByExclusion([-1]);

        
             
        //if player collides with a "killing zone" respawn
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.add.overlap(this.player, this.killingObjects, () => {
            this.respawn()
        });
        this.physics.add.overlap(this.player, this.spawnZoneA, () => {
            this.createAScreen();
        });
        this.bScreenOverlap = this.physics.add.overlap(this.player, this.spawnZoneB, () => {
            this.createBScreen();
        });
        this.physics.add.overlap(this.player, this.spawnZoneC, () => {
            this.createCScreen();
        });

        //camera config
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player,true, 0.1, 0.25);

        this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels)

        this.runeImage = this.add.image(400, 400, 'snailInfo').setScale(0.2);
        this.runeImage.setVisible(false);
        this.runeImage.setDepth(100);

        this.eKeyText = this.add.text(0, 0, 'e', { font: '12px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.eKeyText.setVisible(false);
        this.eKeyText.setDepth(100);

        this.airGroup = this.physics.add.staticGroup();
    }

    respawn(){
        this.player.body.setVelocity(0,0);
        this.player.momentum = 0;
        this.player.stateMachine.transform(this.player.stateMachine.state.toString());
        if(this.point){
            if(this.point === 'A')
                this.player.setPosition( this.spawnPointA.x, this.spawnPointA.y);
            else if(this.point === 'B')
                this.player.setPosition( this.spawnPointB.x, this.spawnPointB.y);
            else{
                this.player.setPosition( this.spawnPointC.x, this.spawnPointC.y);
            }
        }
        else{
            this.player.setPosition( this.spawnPointA.x, this.spawnPointA.y);
        }
        
    }

    createAScreen(){

    }
    createBScreen(){

    }
    createCScreen(){
        
    }
    
}

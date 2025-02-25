import Player from '../player.js';
import Phaser from 'phaser';
import { DruidState } from '../StateMachine/druidState.js';
import { SnailState } from '../StateMachine/snailState.js';
import { MovingBlock } from '../movingBlock.js';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Screen1_2 extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'screen1_2' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {


        this.map = this.make.tilemap({key: "level1_2"});

        //spawnpoint and killing zones
        this.objectsLayer = this.map.getObjectLayer("objects");

        this.killingObjects = this.physics.add.staticGroup();

        this.spawnPoint = { x: 100, y: 100 };
        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
                if (name === "spawnpoint") { // spawnPoint
                    this.spawnPoint = { x, y };
                }else if(name === "pointA1"){
                    this.pointA1 = {x,y};

                } else if(name === "pointB1"){
                    this.pointB1 = {x,y};
                }else if(name === "pointA2"){
                    this.pointA2 = {x,y};

                } else if(name === "pointB2"){
                    this.pointB2 = {x,y};
                }
                else {
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

        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);


        this.movingBlock = new MovingBlock(this,100,this.pointA1,this.pointB1)  
        this.movingBlock2 = new MovingBlock(this,100,this.pointA2,this.pointB2)        
        this.physics.add.collider(this.player, this.movingBlock, this.player.collisionWithMovingBlock);
        this.physics.add.collider(this.player, this.movingBlock2, this.player.collisionWithMovingBlock);

             
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

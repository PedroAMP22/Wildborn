import Phaser from 'phaser';
import { Proyectile } from './proyectile';
import { Cross } from './cross';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Boss extends Phaser.GameObjects.Sprite {

    

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y,"spikedBlock2x2");


        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.body.setAllowGravity(false);
        this.body.setSize(10,20);
        this.loadAnimations();
        this.proyectileList = []
        this.bulletSpeed = 100;
        this.shootEvent = this.scene.time.addEvent({
            delay: 1000, 
            callback: this.shoot,
            callbackScope: this,
            loop: true
          });
        this.crossEvent = this.scene.time.addEvent({
            delay: 2000, 
            callback: this.cross,
            callbackScope: this,
            loop: true
          });
        this.crossEvent.paused = true;
        this.mechChange = this.scene.time.addEvent({
            delay: 10000, 
            callback: this.change,
            callbackScope: this,
            loop: true
          });
    }

    loadAnimations(){

    }
    
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        
    }

    shoot(){
        this.proyectileList.push(new Proyectile(this.scene,this.bulletSpeed,this.x,this.y,this.scene.player.x,this.scene.player.y + 10) )
    }

    cross(){
        this.scene.crosPointList.forEach(crosPoint => {
            new Cross(this.scene,crosPoint.x,crosPoint.y,true)
            new Cross(this.scene,crosPoint.x,crosPoint.y,false)
        });
        
    }

    change(){
        if(this.shootEvent.paused == true){
            this.crossEvent.paused = true; 
            this.shootEvent.paused = false; 
        }
        else{
            this.shootEvent.paused = true; 
            this.crossEvent.paused = false; 
        }
    }
   
    respawn(){
        this.setVisible(true);

        this.shootEvent.remove()
        this.crossEvent.remove()
        this.mechChange.remove()
        this.shootEvent = this.scene.time.addEvent({
            delay: 2000, 
            callback: this.shoot,
            callbackScope: this,
            loop: true
          });
        this.crossEvent = this.scene.time.addEvent({
            delay: 2000, 
            callback: this.cross,
            callbackScope: this,
            loop: true
          });
        this.crossEvent.paused = true;
        this.mechChange = this.scene.time.addEvent({
            delay: 10000, 
            callback: this.change,
            callbackScope: this,
            loop: true
          });

        this.proyectileList.forEach(proy => {
            proy.destroy();
        });
    }

    killBoss(){
        this.shootEvent.remove()
        this.crossEvent.remove()
        this.mechChange.remove()
        this.proyectileList.forEach(proy => {
            proy.destroy();
        });
        this.scene.bossDead = true;
        this.setVisible(false);
    }
}

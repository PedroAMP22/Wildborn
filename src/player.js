import Phaser from 'phaser';
import {StateMachine} from './StateMachine/stateMachine'
import { DruidState } from './StateMachine/druidState';
import { SnailState } from './StateMachine/snailState';
import { MoleState } from './StateMachine/moleState';
import { SquirrelState } from './StateMachine/squirrelState';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y,"playerIdle");

        this.snailKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);

        this.druidKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        this.squirrelKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        this.moleKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

        //Adding to physics engine
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Queremos que el jugador no se salga de los límites del mundo

        this.stateMachine = new StateMachine(this.scene);
        
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (Phaser.Input.Keyboard.JustDown(this.snailKey)) {
            this.stateMachine.transform(SnailState.NAME);
        }
        else if (Phaser.Input.Keyboard.JustDown(this.druidKey)){
            this.stateMachine.transform(DruidState.NAME);
        }
        else if (Phaser.Input.Keyboard.JustDown(this.moleKey)){
            this.stateMachine.transform(MoleState.NAME);
        }
        else if (Phaser.Input.Keyboard.JustDown(this.squirrelKey)){
            this.stateMachine.transform(SquirrelState.NAME);
        }

        this.stateMachine.update(t,dt);
        
    }

    moveHorizontal(initialSpeed, topSpeed,walkAcceleration,t,dt){
        //Izquierda
        if (Phaser.Input.Keyboard.JustDown(this.keys.left) && !this.keys.right.isDown){
            this.body.setVelocityX(-initialSpeed)
            this.setFlipX(true)
        }
        else if (this.keys.left.isDown && this.body.velocity.x > -topSpeed && !this.keys.right.isDown) {
            this.setFlipX(true)
            if(this.body.velocity.x > -initialSpeed){
                this.body.setVelocityX(-initialSpeed);
            }
            this.body.setVelocityX(this.body.velocity.x - walkAcceleration * dt);
            if(this.body.velocity.x < -topSpeed){
                this.body.setVelocityX(-topSpeed);
            }
        }
        //Derecha
        else if (Phaser.Input.Keyboard.JustDown(this.keys.right) && !this.keys.left.isDown){
            this.body.setVelocityX(initialSpeed)
            this.setFlipX(false)
        }
        else if (this.keys.right.isDown && this.body.velocity.x < topSpeed && !this.keys.left.isDown) {
            this.setFlipX(false)
            if(this.body.velocity.x < initialSpeed){
                this.body.setVelocityX(initialSpeed);
            }
            this.body.setVelocityX(this.body.velocity.x + walkAcceleration * dt);
        }
        if(this.body.velocity.x > topSpeed){
            this.body.setVelocityX(topSpeed);
        }
        //Pararse
        if(!this.keys.left.isDown && !this.keys.right.isDown ){
            this.body.setVelocityX(0);
        }
    }

}

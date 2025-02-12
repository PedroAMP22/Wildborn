import Phaser from 'phaser';
import {StateMachine} from './StateMachine/stateMachine'
import { DruidState } from './StateMachine/druidState';
import { SnailState } from './StateMachine/snailState';
import { MoleState } from './StateMachine/moleState';
import { SquirrelState } from './StateMachine/squirrelState';
import { PufferFishState } from './StateMachine/pufferFishState';
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

        this.fishKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

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

        this.maxCoyoteTime = 5;
        this.maxInputBuffer = 6;

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
        else if(Phaser.Input.Keyboard.JustDown(this.fishKey)){
            this.stateMachine.transform(PufferFishState.NAME);
        }

        this.stateMachine.update(t,dt);
    }

    playIdleIfPossible(canPlayIdle, idleName){
        if(this.body.velocity.x === 0 && this.body.velocity.y === 0 && canPlayIdle){
            this.anims.play(idleName, true);
            return true;
        }
        return false;
    }

    checkPlaying(animationName){
        return (this.anims.currentAnim !== null && this.anims.currentAnim.key === animationName && this.anims.isPlaying);
    }

    jump(justJumped, jumpAnimation, jumpSpeed, coyoteTime, inputBuffer){
        if ((justJumped && this.body.onFloor()) ||
            (justJumped && coyoteTime < this.maxCoyoteTime && coyoteTime !== 0) ||
            (this.body.onFloor() && inputBuffer < this.maxInputBuffer && inputBuffer !== 0)
            ){

            this.body.setVelocityY(jumpSpeed);
            this.anims.play(jumpAnimation,true);

            return true;
        }
        else{
            return false;
        }
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
        }
        if(this.body.velocity.x < -topSpeed){
            this.body.setVelocityX(-topSpeed);
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
        if(!this.keys.left.isDown && !this.keys.right.isDown && this.body.onFloor()){
            this.body.setVelocityX(0);
        }
        if(!this.keys.left.isDown && !this.keys.right.isDown && !this.body.onFloor()){
            console.log(this.body.velocity.x)
            this.body.setVelocityX(this.body.velocity.x - 10 * dt);
            if(this.body.velocity.x < 0)
                this.body.setVelocityX(0);
        }
    }

    fall(topFallingSpeed){
        if(this.body.velocity.y > 0){
            if(this.body.velocity.y > topFallingSpeed){
                this.body.setVelocityY(topFallingSpeed);
            }
        }
    }

}

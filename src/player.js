import Phaser from 'phaser';
import {StateMachine} from './StateMachine/stateMachine'
import { DruidState } from './StateMachine/druidState';
import { SnailState } from './StateMachine/snailState';
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

        this.uKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);

        this.iKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

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

        if (Phaser.Input.Keyboard.JustDown(this.uKey)) {
            this.stateMachine.transform(SnailState.NAME);
        }

        if (Phaser.Input.Keyboard.JustDown(this.iKey)){
            this.stateMachine.transform(DruidState.NAME);
        }

        this.stateMachine.update(t,dt);
        
    }

}

import { State } from './state';

export class PufferFishState extends State {
    static NAME = "pufferFish";

    constructor(scene) {
        super();

        this.scene = scene;
        this.player = scene.player;

        // Parámetros de movimiento y flotación
        this.floatSpeed = -50; // Velocidad vertical al flotar
        this.moveSpeed = 150; // Velocidad horizontal
        this.isFloating = false; // Determina si está flotando o no

        // Configuración inicial del cuerpo del jugador
        this.player.body.setCircle(10); // Tamaño inicial pequeño
        this.player.body.setOffset(10, 10);
        this.player.body.setAllowGravity(true); // Gravedad activada por defecto
        this.player.setAngle(0);

        this.transformToSmall(); // Comienza como un pez pequeño
    }

    transform() {
        this.player.anims.play("fishTrans", true);
    }

    transformToSmall() {
        this.player.anims.play("fishSmall", true);
        this.player.body.setCircle(10); // Tamaño pequeño
        this.player.body.setAllowGravity(true); // Activar gravedad
        this.isFloating = false;
    }

    transformToBig() {
        this.player.anims.play("fishBig", true);
        this.player.body.setCircle(20); // Tamaño grande
        this.player.body.setAllowGravity(false); // Desactivar gravedad
        this.player.body.setVelocityY(this.floatSpeed); // Flotar hacia arriba
        this.isFloating = true;
    }

    update(t, dt) {
        const cursors = this.player.cursors;
        let canPlayIdle = true;
        const justPressedSpace = Phaser.Input.Keyboard.JustDown(cursors.space);

        // Alternar estado de flotación con Espacio
        if (justPressedSpace) {
            if (this.isFloating) {
                this.transformToSmall(); // Cambia a estado pequeño
            } else {
                this.transformToBig(); // Cambia a estado grande
            }
        }

        // Movimiento horizontal permitido en ambos estados
        if (cursors.left.isDown) {
            this.player.body.setVelocityX(-this.moveSpeed);
            this.player.setFlipX(true);
            this.player.anims.play("fishSmall", true); // Animación de nadar
            canPlayIdle = false;
        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(this.moveSpeed);
            this.player.setFlipX(false);
            this.player.anims.play("fishSmall", true); // Animación de nadar
            canPlayIdle = false;
        } else {
            this.player.body.setVelocityX(0);
        }

        // Mantener la velocidad vertical constante si está flotando
        if (this.isFloating) {
            this.player.body.setVelocityY(this.floatSpeed);
        }

        // Reproducir animación de estar flotando si no hay movimiento horizontal
        if (this.isFloating && canPlayIdle) {
            this.player.anims.play("fishBig", true);
        }

        // Reproducir animación de idle si no se está moviendo
        if (!this.isFloating && this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0 && canPlayIdle) {
            this.player.anims.play("fishSmall", true);
        }
    }

    checkState(stateString) {
        return stateString === PufferFishState.NAME;
    }
}

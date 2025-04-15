import { Scene } from 'phaser';
import { MoveableBlock } from './moveableBlock';

export class Statue extends MoveableBlock {
    constructor(scene, speed, pointA, pointB, x, y, falling, model, spawnPoint) {
        super(scene, speed, pointA, pointB, null, x, y, falling, model, spawnPoint);
        this.isPlaced = false;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.moving && this.point === this.pointB && !this.isPlaced) {
            this.isPlaced = true;

            
            this.play('statue_placed', true);

            this.setDepth(0); // aseguramos que quede visualmente detrás

            this.body.enable = false;
        }
    }

    collisionWithAir(statue, air) {
        // solo permitir movimiento si está en A y va a B
        if (statue.point === statue.pointA && air.x > statue.x) {
            // verificar si ya hay una estatua en el punto B
            let overlappingStatue = false;
            statue.scene.children.list.forEach(obj => {
                if (obj instanceof Statue && obj !== statue && obj.point === statue.pointB) {
                    overlappingStatue = true;
                }
            });

            if (overlappingStatue) {
                statue.play('statue_blocked', true); // animacion en B
            } else {
                statue.pointObj = statue.pointB;
                statue.moving = true;
            }

            air.destroy();
        }
    }

    respawn() {
        super.respawn();
        this.isPlaced = false;
        this.setDepth(2); // restaurar la profundidad original
        this.body.enable = true;
    }

}

import { MoveableBlock } from './moveableBlock';

export default class Statue extends MoveableBlock {
    constructor(scene, speed, pointA, pointB, pointC, x, y, falling, model, spawnPoint, placed = false) {
        super(scene, speed, pointA, pointB, pointC, x, y, falling, model, spawnPoint);
        this.isPlaced = placed;

        if (placed) {
            this.setDepth(0);
            this.play('statue_placed', true);
            this.body.enable = false;
            this.point = pointB; // colocada en su punto final
            this.moving = false;
        }
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.moving && !this.isPlaced && this.isAtFinalPoint()) {
            this.placeStatue();
        }
    }

    isAtFinalPoint() {
        // verifica si está en el último punto
        return (this.pointC ? this.point === this.pointC : this.point === this.pointB);
    }

    placeStatue() {
        this.isPlaced = true;
        this.play('statue_placed', true);
        this.setDepth(0); 
        this.body.enable = false;
        this.scene.killBoss();
    }

    collisionWithAir(statue, air) {
        if (statue.isPlaced) {
            air.destroy();
            return;
        }

        if (statue.moving) {
            var pointAux = statue.point;
            statue.point = statue.pointObj;
            statue.pointObj = pointAux;
        } else {
            if (statue.pointA.x > statue.pointB.x) { // movimiento hacia la izquierda
                if (statue.point === statue.pointA && air.x > statue.x) {
                    statue.pointObj = statue.pointB;
                    statue.moving = true;
                } else if (statue.point === statue.pointB) {
                    if (air.x > statue.x && statue.pointC) {
                        statue.pointObj = statue.pointC;
                        statue.moving = true;
                    } else if (air.x <= statue.x) {
                        statue.pointObj = statue.pointA;
                        statue.moving = true;
                    }
                } else if (statue.point === statue.pointC && air.x < statue.x) {
                    statue.pointObj = statue.pointB;
                    statue.moving = true;
                }
            } else { // movimiento hacia la derecha
                if (statue.point === statue.pointA && air.x < statue.x) {
                    statue.pointObj = statue.pointB;
                    statue.moving = true;
                } else if (statue.point === statue.pointB) {
                    if (air.x < statue.x && statue.pointC) {
                        statue.pointObj = statue.pointC;
                        statue.moving = true;
                    } else if (air.x >= statue.x) {
                        statue.pointObj = statue.pointA;
                        statue.moving = true;
                    }
                } else if (statue.point === statue.pointC && air.x > statue.x) {
                    statue.pointObj = statue.pointB;
                    statue.moving = true;
                }
            }
        }

        air.destroy();
    }

    respawn() {
        super.respawn();
        this.isPlaced = false;
        this.setDepth(2);
        this.body.enable = true;
    }
}

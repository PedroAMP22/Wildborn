import { Scene } from 'phaser';
import { MoveableBlock } from './moveableBlock';

export default class Statue extends MoveableBlock {
    constructor(scene, speed, pointA, pointB, x, y, falling, model, spawnPoint, placed = false) {
        super(scene, speed, pointA, pointB, null, x, y, falling, model, spawnPoint);
        this.isPlaced = placed;

        if (placed) {
            this.setDepth(0); // detrás de todo
            this.play('statue_placed', true); // animación de colocada
            this.body.enable = false; // no colisiona
            this.point = pointB; // colocada en puntoB
            this.moving = false;
        }
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
        // Si ya está colocada, se ignora la interacción
        if (statue.isPlaced) {
            air.destroy();
            return;
        }
        
        // Solo se procesa el movimiento si la estatua está en pointA
        if (statue.point === statue.pointA) {
            // calculamos la dirección 
            const direction = statue.pointB.x - statue.pointA.x;
            
            // si la estatua debe moverse hacia la derecha el aire debe venir de la izquierda para empujarla
            // si debe moverse hacia la izquierda el aire debe venir de la derecha
            if ((direction > 0 && air.x < statue.x) || (direction < 0 && air.x > statue.x)) {
                statue.pointObj = statue.pointB;
                statue.moving = true;
            } 
        }
        
        air.destroy();
    }
    

    respawn() {
        super.respawn();
        this.isPlaced = false;
        this.setDepth(2); // restaurar la profundidad original
        this.body.enable = true;
    }

}

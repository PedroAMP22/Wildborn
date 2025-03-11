import { Scene } from 'phaser';

export class Air extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene,x,y) {
        super(scene,x,y,null)
        this.speed = 10;
        this.scene.airGroup.add(this);
        this.scene.physics.add.existing(this);
     
        this.setVisible(false);
    }

    create() {
        // Ahora que el cuerpo físico ha sido añadido, configuramos las propiedades
        this.body.setSize(3, 3); // Ajustar el tamaño de la colisión
        this.body.setImmovable(true); // El objeto no se mueve por colisiones
        this.body.setAllowGravity(false); // Desactivar la gravedad
    }

    preUpdate(t, d) {
        super.preUpdate(t, d)
    }

}

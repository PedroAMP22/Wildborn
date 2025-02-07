import Phaser from 'phaser';

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
        //Adding to physics engine
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Queremos que el jugador no se salga de los límites del mundo

        this.body.setCircle(5.5);
        this.body.setOffset(10.5,14.5)
        this.body.setCollideWorldBounds();
        this.jumpSpeed = -400;
        this.topSpeed = 150;
        this.initialSpeed = 50;
        this.walkAcceleration = 0.5;
        this.topFallingSpeed = 100;
        this.maxCoyoteTime = 5;
        this.coyoteTime = 0;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.lastSpeed = 0;
        this.wasGrounded = this.body.onFloor();
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        
        //Animations
        if (this.body.velocity.x !== 0) {
            this.anims.play("druidRun", true);
        }
        if(this.lastSpeed > 0 && this.body.velocity.y === 0){
            this.anims.play("druidLand", true);
        }
        this.lastSpeed = this.body.velocity.y;

        let canPlayIdle = true;

        if(this.anims.currentAnim !== null && this.anims.currentAnim.key === "druidLand" && this.anims.isPlaying){
           canPlayIdle = false;
        }
    
        if(this.body.velocity.x === 0 && this.body.velocity.y === 0 && canPlayIdle){
            this.anims.play("druidIdle", true);
        }
        if(this.body.velocity.y !== 0){
            this.anims.play("druidFall", true);
        }

        if(this.wasGrounded && !this.body.onFloor() && !this.justJumped){
            this.coyoteTime = 1;
            console.log("tamadre")
        }
        if(this.coyoteTime > 0)
            this.coyoteTime += 1
        
        this.justJumped = Phaser.Input.Keyboard.JustDown(this.cursors.space);
        //Salto 
        if ((this.justJumped && this.body.onFloor())) {
            console.log(this.coyoteTime)
            this.coyoteTime = 0
            this.body.setVelocityY(this.jumpSpeed);
            this.anims.play("druidJump",true);
        }
        if(this.justJumped && this.coyoteTime < this.maxCoyoteTime && this.coyoteTime !== 0){
            console.log(this.coyoteTime)
            this.coyoteTime = 0
            this.body.setVelocityY(this.jumpSpeed);
            this.anims.play("druidJump",true);
        }

        //Caer mas rapido
        if(this.body.velocity.y > 0 && this.body.velocity.y < this.topFallingSpeed){
            this.body.setVelocityY(this.body.velocity.y + 0.01 * dt)
            if(this.body.velocity.y > this.topFallingSpeed){
                this.body.setVelocityY(this.topFallingSpeed);
            }
        }

        //Saltar menos segun cuanto pulses
        else if(this.body.velocity.y < -0 && !this.cursors.space.isDown){
            this.body.setVelocityY(this.body.velocity.y + 4 * dt)
        }

        //Izquierda
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left) && !this.cursors.right.isDown){
            this.body.setVelocityX(-this.initialSpeed)
            this.setFlipX(true)
        }
        else if (this.cursors.left.isDown && this.body.velocity.x > -this.topSpeed && !this.cursors.right.isDown) {
            this.setFlipX(true)
            if(this.body.velocity.x > -this.initialSpeed){
                this.body.setVelocityX(-this.initialSpeed);
            }
            this.body.setVelocityX(this.body.velocity.x - this.walkAcceleration * dt);
            if(this.body.velocity.x < -this.topSpeed){
                this.body.setVelocityX(-this.topSpeed);
            }
        }
        //Derecha
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right) && !this.cursors.left.isDown){
            this.body.setVelocityX(this.initialSpeed)
            this.setFlipX(false)
        }
        else if (this.cursors.right.isDown && this.body.velocity.x < this.topSpeed && !this.cursors.left.isDown) {
            this.setFlipX(false)
            if(this.body.velocity.x < this.initialSpeed){
                this.body.setVelocityX(this.initialSpeed);
            }
            this.body.setVelocityX(this.body.velocity.x + this.walkAcceleration * dt);
            if(this.body.velocity.x > this.topSpeed){
                this.body.setVelocityX(this.topSpeed);
            }
        }
        //Pararse
        if(!this.cursors.left.isDown && !this.cursors.right.isDown ){
            this.body.setVelocityX(0);
        }
        this.wasGrounded = this.body.onFloor();
    }

}

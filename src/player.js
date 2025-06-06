import Phaser from 'phaser';
import {StateMachine} from './PlayerStateMachine/stateMachine'
import { SnailState } from './PlayerStateMachine/snailState';
import { MoleState } from './PlayerStateMachine/moleState';
import { SquirrelState } from './PlayerStateMachine/squirrelState';
import { PufferFishState } from './PlayerStateMachine/pufferFishState';
import { ChickenState } from './PlayerStateMachine/chickenState';
import {Air} from './air';
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
    constructor(scene, x, y,unlockedTransformations) {
        super(scene, x, y,"playerIdle");

        this.snailKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);

        this.squirrelKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        this.moleKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

        this.fishKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.chickenKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        this.unlockedTransformations = unlockedTransformations;

        this.rune = null;
        this.infoRock = null;
        //Adding to physics engine
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.onBlock = false;
        
        this.canMove = true;

        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            e: Phaser.Input.Keyboard.KeyCodes.E
        });

        // Footsteps sound
        this.sounds = {
            dirt: scene.sound.add('footsteps_grass', { volume: 0.3 }),
            snow: scene.sound.add('footstep_snow', { volume: 0.05 }),
            stone: scene.sound.add('footstep_stone', { volume: 0.2 })
        };

        this.jumpSE = scene.sound.add('jump',{volume:0.2})

        this.footstepTimer = scene.time.addEvent({ 
            delay: 400,
            callback: () => this.playFootstep(),
            loop: true
        });

        this.maxCoyoteTime = 5;
        this.maxInputBuffer = 6;

        this.stateMachine = new StateMachine(this.scene);

        this.momentum = 0;

        this.loadAnimations();
        
        
    }

    playFootstep() {
        if ((this.body.velocity.x !== 0) && this.sounds[this.currentSurface] && this.body.onFloor()) {
            this.sounds[this.currentSurface].play();
        }
    }

    loadAnimations(){
        this.scene.anims.create({
            key:"druidRun",
            frames: this.anims.generateFrameNumbers('druidRun', { start: 0, end: 7 }),
            frameRate: 10,
            repeat:-1
        });
        this.scene.anims.create({
            key:"druidIdle",
            frames: this.anims.generateFrameNumbers('druidIdle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat:-1
        });
        this.scene.anims.create({
            key:"druidFall",
            frames: this.anims.generateFrameNumbers('druidFall', { start: 0, end: 5 }),
            frameRate: 10,
            repeat:-1
        });
        this.scene.anims.create({
            key:"druidJump",
            frames: this.anims.generateFrameNumbers('druidJump', { start: 0, end: 4 }),
            frameRate: 10
        });
        this.scene.anims.create({
            key:"druidLand",
            frames: this.anims.generateFrameNumbers('druidLand', { start: 0, end: 3 }),
            frameRate: 10
        });
        this.scene.anims.create({
            key:"druidDeath",
            frames: this.anims.generateFrameNumbers('druidDeath', { start: 0, end: 7 }),
            frameRate: 10
        });
        this.scene.anims.create({
            key:"druidTrans",
            frames: this.anims.generateFrameNumbers('druidTrans', { start: 0, end: 4 }),
            frameRate: 20
        });

        //SNAIL
        this.scene.anims.create({
            key: "snailIdle",
            frames: this.anims.generateFrameNumbers('snailIdle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: "snailTrans",
            frames: this.anims.generateFrameNumbers('snailTrans', { start: 0, end: 6 }),
            frameRate: 20,
            repeat: 0
        });


        //SQUIRREL
        this.scene.anims.create({
            key:"squirrelRun",
            frames: this.anims.generateFrameNumbers('squirrelRun', { start: 0, end: 4 }),
            frameRate: 10,
            repeat:-1
        });
        this.scene.anims.create({
            key:"squirrelIdle",
            frames: this.anims.generateFrameNumbers('squirrelIdle', { start: 0, end: 3 }),
            frameRate: 4,
            repeat:-1
        });
        this.scene.anims.create({
            key:"squirrelAir",
            frames: this.anims.generateFrameNumbers('squirrelAir', { start: 0, end: 0 }),
            frameRate: 1,
            repeat:-1
        });
        this.scene.anims.create({
            key:"squirrelJump",
            frames: this.anims.generateFrameNumbers('squirrelJump', { start: 0, end: 1 }),
            frameRate: 20,
            repeat:0
        });
        this.scene.anims.create({
            key:"squirrelFly",
            frames: this.anims.generateFrameNumbers('squirrelFly', { start: 0, end: 1 }),
            frameRate: 5,
            repeat:-1
        });
        this.scene.anims.create({
            key:"squirrelTrans",
            frames: this.anims.generateFrameNumbers('squirrelTrans', { start: 0, end: 6 }),
            frameRate: 20

        });
        //MOLE
        this.scene.anims.create({
            key: "moleIdle",
            frames: this.anims.generateFrameNumbers('moleIdle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: "moleTrans",
            frames: this.anims.generateFrameNumbers('moleTrans', { start: 0, end: 5 }),
            frameRate: 20,
        });
        this.scene.anims.create({
            key: "moleRun",
            frames: this.anims.generateFrameNumbers('moleRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "moleFall",
            frames: this.anims.generateFrameNumbers('moleFall', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.scene.anims.create({
            key: "moleFly",
            frames: this.anims.generateFrameNumbers('moleFly', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });
        this.scene.anims.create({
            key: "moleHide",
            frames: this.anims.generateFrameNumbers('moleHide', { start: 0, end: 7 }),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: "moleHide2",
            frames: this.anims.generateFrameNumbers('moleHide', { start: 3, end: 7 }),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: "moleHiddenIdle",
            frames: this.anims.generateFrameNumbers('moleHiddenIdle', { start: 0, end: 11 }),
            frameRate: 7,
            repeat: -1
        });
        this.scene.anims.create({
            key: "moleJump",
            frames: this.anims.generateFrameNumbers('moleJump', { start: 0, end: 9 }),
            frameRate: 20,
        });

        //PUFFERFISH
        this.scene.anims.create({
            key: "fishBig",
            frames: this.anims.generateFrameNumbers('fishBig', { start: 0, end: 7 }),
            frameRate: 7,
        });
        this.scene.anims.create({
            key: "fishSmall",
            frames: this.anims.generateFrameNumbers('fishSmall', { start: 0, end: 7 }),
            frameRate: 7,
        });
        this.scene.anims.create({
            key: "fishTrans",
            frames: this.anims.generateFrameNumbers('fishTrans', { start: 0, end: 5 }),
            frameRate: 20,
        });

        //CHICKEN
        this.scene.anims.create({
            key: "chickenIdle",
            frames: this.anims.generateFrameNumbers('chickenIdle', { start: 0, end: 8 }),
            frameRate: 5,
        });
        this.scene.anims.create({
            key: "chickenFlap",
            frames: this.anims.generateFrameNumbers('chickenFlap', { start: 0, end: 5 }),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: "chickenRun",
            frames: this.anims.generateFrameNumbers('chickenRun', { start: 0, end: 3 }),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: "chickenTrans",
            frames: this.anims.generateFrameNumbers('chickenTrans', { start: 0, end: 5 }),
            frameRate: 10,
        });
    }

    setRune(rune){
        this.rune = rune;
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if(this.canMove){
            if(this.rune){
                const distance = Phaser.Math.Distance.Between(this.x, this.y, this.rune.x, this.rune.y);
                if(distance < 20){
                    this.scene.eKeyText.setPosition(this.rune.x, this.rune.y - 20);
                    this.scene.eKeyText.setVisible(true);
                    this.scene.eKeyText.anims.play('eKeyBlink',true);
                }
                else{
                    this.scene.eKeyText.setVisible(false); 
                    this.scene.eKeyText.anims.stop()
                }
                this.justPressed = Phaser.Input.Keyboard.JustDown(this.keys.e);
                if (distance < 20 && this.justPressed ) {
                    this.rune.interact();

                    this.scene.addCollectibles()
                }
            }
    
            if(this.infoRock){
                const distance2 = Phaser.Math.Distance.Between(this.x, this.y, this.infoRock.x, this.infoRock.y);
                if(distance2 < 20){
                    this.scene.eKeyText.setPosition(this.infoRock.x, this.infoRock.y - 20);
                    this.scene.eKeyText.setVisible(true);
                    this.scene.eKeyText.anims.play('eKeyBlink',true);
                }
                else{
                    this.scene.eKeyText.setVisible(false); 
                    this.scene.eKeyText.anims.stop()
                }
                this.justPressed = Phaser.Input.Keyboard.JustDown(this.keys.e);
                if (distance2 < 20 && this.justPressed) {
                    this.infoRock.interact();
                }
            }
    
            
            
            if (Phaser.Input.Keyboard.JustDown(this.snailKey) && this.unlockedTransformations[0]) {
                this.stateMachine.transform(SnailState.NAME);
                this.momentum = 0;
            }
            else if (Phaser.Input.Keyboard.JustDown(this.moleKey)&& this.unlockedTransformations[2]){
                this.stateMachine.transform(MoleState.NAME);
            }
            else if (Phaser.Input.Keyboard.JustDown(this.squirrelKey)&& this.unlockedTransformations[1]){
                this.stateMachine.transform(SquirrelState.NAME);
            }
            else if(Phaser.Input.Keyboard.JustDown(this.fishKey) && this.unlockedTransformations[4]){
                this.stateMachine.transform(PufferFishState.NAME);
            }
            else if(Phaser.Input.Keyboard.JustDown(this.chickenKey) && this.unlockedTransformations[3]){
                
                this.stateMachine.transform(ChickenState.NAME);
            }
    
            if(this.body.onFloor()){
                this.momentum = 0;
            }
            this.stateMachine.update(t,dt);
            if(this.body.velocity.x > 10){
                this.scene.cameras.main.setFollowOffset(-this.body.velocity.x * 0.2,0);
            }
            else if(this.body.velocity.x < 10){
                this.scene.cameras.main.setFollowOffset(-this.body.velocity.x* 0.2,0);
            }
            else{
                this.scene.cameras.main.setFollowOffset(0,0);
            }
        }

    }

    setInfo(infoRock){
        this.infoRock = infoRock;
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

            this.jumpSE.play()

            return true;
        }
        else{
            return false;
        }

    }

    moveHorizontal(initialSpeed, topSpeed,walkAcceleration,t,dt){
        //GO LEFT
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
        if(this.body.velocity.x < -topSpeed && this.momentum === 0){
            this.body.setVelocityX(-topSpeed);
        }
        //GO RIGHT
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
        if(this.body.velocity.x > topSpeed && this.momentum === 0){
            this.body.setVelocityX(topSpeed);
        }
        //STOP IN FLOOR
        if(!this.keys.left.isDown && !this.keys.right.isDown && this.body.onFloor()){
            this.body.setVelocityX(0);
        }
        if(!this.keys.left.isDown && !this.keys.right.isDown && !this.body.onFloor() && this.body.velocity.x !== 0 && this.momentum === 0){
            this.body.setVelocityX(this.body.velocity.x - dt);
            if(this.body.velocity.x < 0)
                this.body.setVelocityX(0);
        }
        //CONSERVE MOMENTUM
        if(this.momentum < 0 && !this.body.onFloor()){
            this.momentum += dt;
            this.body.setVelocityX(this.momentum);
           
            if(this.body.velocity.x > 0)
                this.body.setVelocityX(0);
        }
        if(this.momentum > 0 && !this.body.onFloor()){
            this.momentum -= dt;
            this.body.setVelocityX(this.momentum);
           
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

    collisionWithMovingBlock(player,block){
        player.stateMachine.state.onCollision(block);
    }

    moveChicken(initialSpeed, topSpeed, walkAcceleration, t, dt) {
        // GO RIGHT (ahora con la tecla izquierda)
        if (Phaser.Input.Keyboard.JustDown(this.keys.left) && !this.keys.right.isDown) {
            this.body.setVelocityX(initialSpeed);
            this.setFlipX(false);
        } 
        else if (this.keys.left.isDown && this.body.velocity.x < topSpeed && !this.keys.right.isDown) {
            this.setFlipX(false);
            if (this.body.velocity.x < initialSpeed) {
                this.body.setVelocityX(initialSpeed);
            }
            this.body.setVelocityX(this.body.velocity.x + walkAcceleration * dt);
        }
        if (this.body.velocity.x > topSpeed && this.momentum === 0) {
            this.body.setVelocityX(topSpeed);
        }
    
        // GO LEFT (ahora con la tecla derecha)
        else if (Phaser.Input.Keyboard.JustDown(this.keys.right) && !this.keys.left.isDown) {
            this.body.setVelocityX(-initialSpeed);
            this.setFlipX(true);
        } 
        else if (this.keys.right.isDown && this.body.velocity.x > -topSpeed && !this.keys.left.isDown) {
            this.setFlipX(true);
            if (this.body.velocity.x > -initialSpeed) {
                this.body.setVelocityX(-initialSpeed);
            }
            this.body.setVelocityX(this.body.velocity.x - walkAcceleration * dt);
        }
        if (this.body.velocity.x < -topSpeed && this.momentum === 0) {
            this.body.setVelocityX(-topSpeed);
        }
    
        // STOP IN FLOOR
        if (!this.keys.left.isDown && !this.keys.right.isDown && this.body.onFloor()) {
            this.body.setVelocityX(0);
        }
        if (!this.keys.left.isDown && !this.keys.right.isDown && !this.body.onFloor() && this.body.velocity.x !== 0 && this.momentum === 0) {
            this.body.setVelocityX(this.body.velocity.x - dt);
            if (this.body.velocity.x < 0)
                this.body.setVelocityX(0);
        }
    
        // CONSERVE MOMENTUM
        if (this.momentum < 0 && !this.body.onFloor()) {
            this.momentum += dt;
            this.body.setVelocityX(this.momentum);
            if (this.body.velocity.x > 0)
                this.body.setVelocityX(0);
        }
        if (this.momentum > 0 && !this.body.onFloor()) {
            this.momentum -= dt;
            this.body.setVelocityX(this.momentum);
            if (this.body.velocity.x < 0)
                this.body.setVelocityX(0);
        }
    }

    shoot(){
        new Air(this.scene,this.x,this.y,this.flipX);
    }

}

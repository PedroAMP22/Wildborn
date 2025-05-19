import { MoveableBlock } from '../moveableBlock.js';
import { MovingBlock } from '../movingBlock.js';
import ScreenBase from './screenBase.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Screenbase
 */
export default class Screen2_7 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen2_7',"screen2_7" );
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
            if(name === "posA1"){
                this.posA1 = {x,y};
            }else if(name === "posA2"){
                this.posA2 = {x,y};
            }
            else if(name === "posA3"){
                this.posA3 = {x,y};
            }
            else if(name === "pointA1"){
                this.pointA1 = {x,y};

            } else if(name === "pointA2"){
                this.pointA2 = {x,y};
            }
        });
        
        this.movingBlock = new MovingBlock(this,4,this.pointA1,this.pointA2,16,64,true, "mossyBlock1x4");
        this.physics.add.collider(this.player, this.movingBlock, this.player.collisionWithMovingBlock);
        this.moveableBlock = new MoveableBlock(this,5,this.posA1,this.posA2,this.posA3,48,32,true, "icyBlock3x2",this.posA1);           
        this.physics.add.collider(this.player, this.moveableBlock, this.player.collisionWithMovingBlock); 
        this.physics.add.overlap(this.airGroup, this.moveableBlock, this.moveableBlock.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock, this.platformLayer);

        


        //background image
        this.backgroundImage = this.add.image(0, 0, "MountainBG").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
             
    }

    respawn(){
        super.respawn()
        this.moveableBlock.respawn()
    }
    
    createAScreen(){
        this.scene.start('screen2_6',{point:"B",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
        this.scene.start('screen3_0',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
}

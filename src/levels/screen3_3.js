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
export default class Screen3_3 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen3_3',"screen3_3" );
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
            else if(name === "posB1"){
                this.posB1 = {x,y};
            }
            else if(name === "posB2"){
                this.posB2 = {x,y};
            }
            else if(name === "pointA1"){
                this.pointA1 = {x,y};

            } else if(name === "pointA2"){
                this.pointA2 = {x,y};
            }
            else if(name === "pointB1"){
                this.pointB1 = {x,y};

            } else if(name === "pointB2"){
                this.pointB2 = {x,y};
            }
        });
        
        this.movingBlock1 = new MovingBlock(this,4,this.pointA1,this.pointA2,48,32,false, "mossyBlock3x2");
        this.movingBlock2 = new MovingBlock(this,4,this.pointB1,this.pointB2,48,32,false, "mossyBlock3x2");

        this.physics.add.collider(this.player, this.movingBlock1, this.player.collisionWithMovingBlock);
        this.physics.add.collider(this.player, this.movingBlock2, this.player.collisionWithMovingBlock);

        this.moveableBlock1 = new MoveableBlock(this,2,this.posA1,this.posA2, null,48,32,false, "icyBlock3x2",this.posA1);
        this.moveableBlock2 = new MoveableBlock(this,2,this.posB1,this.posB2, null,48,32,false, "icyBlock3x2",this.posB1);  

        this.physics.add.collider(this.player, this.moveableBlock1, this.player.collisionWithMovingBlock); 
        this.physics.add.overlap(this.airGroup, this.moveableBlock1, this.moveableBlock1.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock1, this.platformLayer);

        this.physics.add.collider(this.player, this.moveableBlock2, this.player.collisionWithMovingBlock); 
        this.physics.add.overlap(this.airGroup, this.moveableBlock2, this.moveableBlock2.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock2, this.platformLayer);

        //background image
        this.backgroundImage = this.add.image(0, 0, "MountainBG").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
             
    }

    respawn(){
        super.respawn()
        this.moveableBlock1.respawn()
        this.moveableBlock2.respawn()
    }
    
    createAScreen(){
        this.scene.start('screen3_2',{point:"B",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
        this.scene.start('screen3_4',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
}

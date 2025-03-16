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
export default class Screen2_6 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen2_6',"screen2_6" );
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
            else if(name === "posB1"){
                this.posB1 = {x,y};
            }else if(name === "posB2"){
                this.posB2 = {x,y};
            }
            else if(name === "posC1"){
                this.posC1 = {x,y};
            }else if(name === "posC2"){
                this.posC2 = {x,y};
            }
            else if(name === "posE1"){
                this.posE1 = {x,y};
            }else if(name === "posE2"){
                this.posE2 = {x,y};
            }
        });
        
        this.moveableBlock = new MoveableBlock(this,5,this.posA1,this.posA2,this.posA3,48,32,true, "mossyBlock3x2",this.posA2);           
        this.physics.add.collider(this.player, this.moveableBlock, this.player.collisionWithMovingBlock); 
        this.physics.add.overlap(this.airGroup, this.moveableBlock, this.moveableBlock.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock, this.platformLayer);

        this.moveableBlock2 = new MoveableBlock(this,4,this.posB1,this.posB2,null,48,32,false, "mossyBlock3x2",this.posB1);           
        this.physics.add.collider(this.player, this.moveableBlock2, this.player.collisionWithMovingBlock); 
        this.physics.add.collider(this.airGroup, this.moveableBlock2, this.moveableBlock.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock2, this.platformLayer);

        this.moveableBlock3 = new MoveableBlock(this,4,this.posC1,this.posC2,null,48,32,false, "mossyBlock3x2",this.posC1);           
        this.physics.add.collider(this.player, this.moveableBlock3, this.player.collisionWithMovingBlock); 
        this.physics.add.collider(this.airGroup, this.moveableBlock3, this.moveableBlock.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock3, this.platformLayer);

        this.moveableBlock5 = new MoveableBlock(this,4,this.posE1,this.posE2,null,48,32,false, "mossyBlock3x2",this.posE1);           
        this.physics.add.collider(this.player, this.moveableBlock5, this.player.collisionWithMovingBlock); 
        this.physics.add.collider(this.airGroup, this.moveableBlock5, this.moveableBlock.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock5, this.platformLayer);

        


        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
             
    }

    respawn(){
        super.respawn()
        this.moveableBlock.respawn()
        this.moveableBlock2.respawn()
        this.moveableBlock3.respawn()
        this.moveableBlock5.respawn()
    }
    
    createAScreen(){
        this.scene.start('screen2_5',{point:"B",transformation:this.player.stateMachine.state.toString()});
    }
    createBScreen(){
        this.scene.start('screen2_7',{point:"A",transformation:this.player.stateMachine.state.toString()});
    }
}

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
export default class Screen2_3 extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen2_3',"screen2_3" );
    }

    init(data){
        super.init(data)
        this.broken = data.broken;     
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        super.create()

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
            if(name === "pointA1"){
                this.pointA1 = {x,y};

            } else if(name === "pointB1"){
                this.pointB1 = {x,y};
            }else if(name === "pointA2"){
                this.pointA2 = {x,y};

            } else if(name === "pointB2"){
                this.pointB2 = {x,y};
            } else if(name === "pointC1"){
                this.pointC1 = {x,y};
            }else if(name === "pointC2"){
                this.pointC2 = {x,y};

            }
            else if(name === "posA1"){
                this.posA1 = {x,y};
            }else if(name === "posA2"){
                this.posA2 = {x,y};
            }else if(name === "posA3"){
                this.posA3 = {x,y};
            }
        });
        this.movingBlock = new MovingBlock(this,8,this.pointA1,this.pointA2,48,32,true, "spikedBlock2x2"); 
        this.movingBlock2 = new MovingBlock(this,8,this.pointB1,this.pointB2,48,32,true, "spikedBlock2x2");    
        this.movingBlock3 = new MovingBlock(this,8,this.pointC1,this.pointC2,48,32,false, "caveBlock3x2");        
        this.physics.add.collider(this.player, this.movingBlock3, this.player.collisionWithMovingBlock);    
        this.physics.add.collider(this.player, this.movingBlock, () => this.respawn());
        this.physics.add.collider(this.player, this.movingBlock2, () => this.respawn());

        this.moveableBlock = new MoveableBlock(this,5,this.posA1,this.posA2,null,48,32,true, "icyBlock3x2",this.posA1);           
        this.physics.add.collider(this.player, this.moveableBlock, this.player.collisionWithMovingBlock); 
        this.physics.add.collider(this.airGroup, this.moveableBlock, this.moveableBlock.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock, this.platformLayer);
        //background image
        this.backgroundImage = this.add.image(0, 0, "CaveBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
             
    }
    
    createAScreen(){
        this.scene.start('screen2_2',{point:"B",transformation:this.player.stateMachine.state.toString()});
    }
    createBScreen(){
        if(this.broken){
            this.scene.start('screen2_4_Broken',{point:"B",transformation:this.player.stateMachine.state.toString(),broken:this.broken});
        }
        else{
            this.scene.start('screen2_4',{point:"A",transformation:this.player.stateMachine.state.toString()});
        }
    }
    createCScreen(){
        this.scene.start('screen2_5',{point:"A",transformation:this.player.stateMachine.state.toString()});
    }
}

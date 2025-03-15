import ScreenBase from './screenBase.js';
import { MoveableBlock } from '../moveableBlock.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Screenbase
 */
export default class Screen2_4_Broken extends ScreenBase {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('screen2_4_Broken',"screen2_4_Broken" );
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
            if(name === "posA1"){
                this.posA1 = {x,y};
            }else if(name === "posA2"){
                this.posA2 = {x,y};
            }else if(name === "posB1"){
                this.posB1 = {x,y};
            }else if(name === "posB2"){
                this.posB2 = {x,y};
            }
        });

        if(this.broken){
            this.moveableBlock1 = new MoveableBlock(this,8,this.posA2,null,null,48,32,true, "mossyBlock3x2");           
            this.moveableBlock2 = new MoveableBlock(this,8,this.posB2,null,null,48,32,true, "mossyBlock3x2");           
        }
        else{
            this.moveableBlock1 = new MoveableBlock(this,8,this.posA1,this.posA2,null,48,32,true, "mossyBlock3x2",this.posA1);           
            this.moveableBlock2 = new MoveableBlock(this,8,this.posB1,this.posB2,null,48,32,true, "mossyBlock3x2",this.posB1);           
        }

        this.physics.add.collider(this.player, this.moveableBlock1, this.player.collisionWithMovingBlock); 
        this.physics.add.collider(this.airGroup, this.moveableBlock1, this.moveableBlock1.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock1, this.platformLayer);

        this.physics.add.collider(this.player, this.moveableBlock2, this.player.collisionWithMovingBlock); 
        this.physics.add.collider(this.airGroup, this.moveableBlock2, this.moveableBlock2.collisionWithAir); 
        this.physics.add.collider(this.moveableBlock2, this.platformLayer);
        
        //background image
        this.backgroundImage = this.add.image(0, 0, "ForestBG2").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);
        if(!this.broken){
            this.input.keyboard.enabled = false;
            this.cameras.main.fadeIn(2000, 0, 0, 0); // Fade in from black
            this.time.delayedCall(2000, () => { 
                this.input.keyboard.enabled = true;
            });
        }
        
    }
    
    respawn(){
        super.respawn()
        
        this.moveableBlock1.respawn()
        this.moveableBlock2.respawn()
           
    }

    createBScreen(){
        this.scene.start('screen2_3',{point:"B",transformation:this.player.stateMachine.state.toString(),broken:true});
    }
}

import ScreenBase from "../levels/screenBase";

import titleImage from "../../assets/tilemaps/menuImages/MenuTitle.png"
import playButtonHighlight from "../../assets/tilemaps/menuImages/playButtonHighlight.png"
import playButtonImage from "../../assets/tilemaps/menuImages/playButton.png"

export default class MenuScene extends ScreenBase {
    constructor() {
        super('screenMenu', "screenMenu");
    }

    preload() {
        this.load.image('wildBornTitle', titleImage);
        this.load.image('playButtonImage', playButtonImage);
        this.load.image('playButtonHighlight', playButtonHighlight)
    }

    create() {
        super.create()

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
            if(name === "cameraFocus")
                this.cameraFocus = {x,y};
            
        });

        //background image
        this.backgroundImage = this.add.image(0, 0, "MountainBG").setOrigin(0.1);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);

        this.textures.get("MountainBG").setFilter(Phaser.Textures.FilterMode.NEAREST);
        
        //TODO This will be set at false when the menu is done
        this.input.keyboard.enabled = false;

        this.cameras.main.setZoom(0.8);

        this.createMenu();

    }

    createMenu() {
        // Menu Title 
        const titleImage = this.add.image(250, 125, 'wildBornTitle');
        titleImage.setOrigin(0.5); 
        titleImage.setDepth(10)
        titleImage.setScale(1)

        this.playing= false;


        this.playButton = this.add.image(255, 200, 'playButtonImage')
            .setOrigin(0.5)
            .setInteractive() 
            .on('pointerover', () => {
                this.playButton.setTexture('playButtonHighlight')
            })
            .on('pointerout', () => {
                this.playButton.setTexture('playButtonImage');
            })
            .on('pointerdown', () => {
                this.play()
            })
            .setDepth(10)
               


        // The camera focus on an object, so it doesnt move when the character starts moving
        this.cameras.main.startFollow(this.cameraFocus,true, true, 50)  
    
    }

    
    createAScreen(){
        this.scene.start('screen0_0',{point:"A",transformation:this.player.stateMachine.state.toString(),unlockedTranformations:this.unlockedTranformations});
    }
    createBScreen(){
    }

    play(){
        this.playing = true;
        
    }

    update(){
        if(this.playing){
            this.player.body.setVelocityX(10);
            this.player.setPosition(this.player.x + 2, this.player.y)
        }
    }

}

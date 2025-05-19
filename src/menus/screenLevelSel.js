import ScreenBase from "../levels/screenBase";

import titleImage from "../../assets/tilemaps/menuImages/MenuTitle.png"
import level1 from "../../assets/tilemaps/menuImages/Level1.png"
import level2 from "../../assets/tilemaps/menuImages/Level2.png"
import level3 from "../../assets/tilemaps/menuImages/playButton.png"
import levelSelectorLabel from "../../assets/tilemaps/menuImages/levelSelectorLabel.png"
import { DruidState } from "../PlayerStateMachine/druidState";
import { SnailState } from '../PlayerStateMachine/snailState';


export default class ScreenLevelSel extends ScreenBase {
    constructor() {
        super('screenLevelSel', "screenLevelSel");
    }

    preload() {
        this.load.image("titleImage", titleImage);
        this.load.image("level1", level1);
        this.load.image("level2", level2);
        this.load.image("level3", level3);
        this.load.image("levelSelectorLabel",levelSelectorLabel)
    }

    create() {
        super.create()

        this.objectsLayer.objects.forEach(({ name, x, y, width, height }) => {
            if(name === "cameraFocus")
                this.cameraFocus = {x,y};
            
        });

        //background image
        this.backgroundImage = this.add.image(0, 0, "backgroundWood").setOrigin(0.1);
        this.backgroundImage.setDepth(8);
        this.backgroundImage.setScrollFactor(0);
        this.backgroundImage.setScale(0.6);

        
        //TODO This will be set at false when the menu is done
        this.input.keyboard.enabled = false;

        this.createMenu();

    }

    createMenu() {
        this.playing= false;


        this.label = this.add.image(215, 158, "levelSelectorLabel").setOrigin(0.5).setDepth(11).setScale(0.4)

        this.level1 = this.add.image(100, 258, "level1") 
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('screen1_0',{point:"A",transformation: SnailState.NAME,unlockedTranformations:this.unlockedTranformations});

        })
        .on('pointerover', () => {
            this.level1.setScale(0.4)
        })
        .on('pointerout', () => {
            this.level1.setScale(0.34);
        })
        .setDepth(10)
        .setScale(0.34);

        this.level2 = this.add.image(220, 260, "level2") 
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('screen2_1',{point:"A",transformation: DruidState.NAME,unlockedTranformations:[true,true,true,false,false]});

        })
        .on('pointerover', () => {
            this.level2.setScale(0.25)
        })
        .on('pointerout', () => {
            this.level2.setScale(0.22);
        })
        .setDepth(10)
        .setScale(0.22);
               


        // The camera focus on an object, so it doesnt move when the character starts moving
        this.cameras.main.startFollow(this.cameraFocus,true, true, 50)  
    
    }

    
    createAScreen(){
    }
    createBScreen(){
    }

}

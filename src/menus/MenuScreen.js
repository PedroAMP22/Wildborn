import ScreenBase from "../levels/screenBase";

export default class MenuScene extends ScreenBase {
    constructor() {
        super('screenMenu', "screenMenu");
    }

    preload() {
        this.load.image('wildBornTitle', '../../assets/tilemaps/menuImages/MenuTitle.png');
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
        this.input.keyboard.enabled = true;

        this.cameras.main.setZoom(0.8);

        


        this.createMenu();

    }

    createMenu() {
        // Menu Background Panel
        const titleImage = this.add.image(250, 130, 'wildBornTitle');
        titleImage.setOrigin(0.5); 
        titleImage.setDepth(10)
        titleImage.setScale(0.20)

        this.cameras.main.startFollow(this.cameraFocus,true,0.1, 50)
        
    }

    play(){
        this.time.delayedCall(100, () => {
            this.input.keyboard.enabled = true;
            this.player.body.setVelocityX(50);
        });
    }
    createAScreen(){
        this.scene.start('screen0_0',{point:"A",transformation:this.player.stateMachine.state.toString()});
    }
    createBScreen(){
    }
}

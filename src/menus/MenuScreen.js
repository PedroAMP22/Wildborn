import ScreenBase from "../levels/screenBase";

export default class MenuScene extends ScreenBase {
    constructor() {
        super('screenMenu', "screenMenu");
    }

    preload() {
    }

    create() {
        super.create()

        //background image
        this.backgroundImage = this.add.image(0, 0, "MountainBG").setOrigin(0, 0);
        this.backgroundImage.setDepth(-10);
        this.backgroundImage.setScrollFactor(0);

        this.textures.get("MountainBG").setFilter(Phaser.Textures.FilterMode.NEAREST);
        
        this.input.keyboard.enabled = false;

        this.createMenu();

    }

    createMenu() {
        // Menu Background Panel
        this.menuPanel = this.add.image(this.scale.width / 2, this.scale.height / 2, "menuBackground")
            .setOrigin(0.5)
            .setDepth(100)
            .setAlpha(0.9);

        // Button A
        this.buttonPlay = this.add.image(this.scale.width / 2, this.scale.height / 2 - 50, "buttonPlay")
            .setOrigin(0.5)
            .setDepth(101)
            .setInteractive()
            .on('pointerdown', () => this.play());

        // Button B
        this.buttonSelector = this.add.image(this.scale.width / 2, this.scale.height / 2 + 50, "buttonSelector")
            .setOrigin(0.5)
            .setDepth(101)
            .setInteractive()
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

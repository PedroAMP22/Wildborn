import State from "./state";

class DruidState extends State {
    static NAME = "druid";
    /**
     * @param {Phaser.Scene} scene - The player instance
     */
    constructor(scene){
       this.scene = scene
    }

    transform(){

    }
    update(t,dt){
        this.scene.children.getByName("player")
    }   
}
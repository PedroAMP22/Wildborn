import './state'
import './druidState'
import DruidState from './druidState,js'

class StateMachine {
    /**
     * @param {Phaser.Scene} scene - The player instance
     */
    constructor(scene){
        this.scene = scene;
        this.state = new DruidState(scene);
    }

    transform(transformation){
        switch(transformation){
            case DruidState.NAME:
                this.state = new DruidState(player);
        }
    }

    update(t,dt){
        this.state.update();
    }
}
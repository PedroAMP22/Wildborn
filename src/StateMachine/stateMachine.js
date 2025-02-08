import './state'
import { DruidState } from './druidState';


export class StateMachine {
    /**
     * @param {Phaser.Scene} scene - The player instance
     */
    constructor(scene){
        this.scene = scene;
    }

    transform(transformation){
        switch(transformation){
            case DruidState.NAME:
                this.state = new DruidState(this.scene);
        }
    }

    update(t,dt){
        this.state.update(t,dt);
    }
}
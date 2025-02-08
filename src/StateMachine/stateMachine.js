import './state'
import { DruidState } from './druidState';
import { SnailState } from './snailState';


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
                break;
            case SnailState.NAME:
                this.state = new SnailState(this.scene);
                break;
        }

        this.state.transform();
    }

    update(t,dt){
        this.state.update(t,dt);
    }
}
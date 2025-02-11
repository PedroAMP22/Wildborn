import './state'
import { DruidState } from './druidState';
import { SnailState } from './snailState';
import { MoleState } from './moleState';
import { SquirrelState } from './squirrelState';
import { PufferfishState } from './pufferFishState';


export class StateMachine {
    /**
     * @param {Phaser.Scene} scene - The player instance
     */
    constructor(scene){
        this.scene = scene;
    }

    transform(transformation){
        console.log(transformation)
        if (!this.state || !this.state.checkSate(transformation)){
            switch(transformation){
                case DruidState.NAME:
                    this.state = new DruidState(this.scene);
                    break;
                case SnailState.NAME:
                    this.state = new SnailState(this.scene);
                    break;
                case MoleState.NAME:
                    this.state = new MoleState(this.scene);
                    break;
                case SquirrelState.NAME:
                    this.state = new SquirrelState(this.scene);
                    break;
                case PufferfishState.NAME:
                    this.state = new PufferfishState(this.scene);
                    break
            }
            this.state.transform();
        }

    }

    update(t,dt){
        this.state.update(t,dt);
    }
}
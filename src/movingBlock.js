import Level from './level';

export class MovingBlock {
    /**
     * @param {Level} level
     * @param {String} objName - Name of the object in the level.json
     * @param {Number} speed - Speed (default: 100)
     * @param {Number} delay - Time before chaging direction (default: 2000ms)
     */
    constructor(level, objName, speed = 100, delay = 2000) {
        this.level = level;
        this.objName = objName;
        this.speed = speed;
        this.delay = delay;
        
        this.movingBlocks = this.level.map.createFromObjects("objects", { name: objName });

        this.movingBlocks.forEach(block => {
            this.level.physics.world.enable(block);
            block.body.setImmovable(true);
            block.body.setAllowGravity(false);
            block.body.setVelocityX(this.speed);

            console.log(block)
            this.level.time.addEvent({
                delay: this.delay,
                callback: () => {
                    block.body.setVelocityX(block.body.velocity.x * -1);
                },
                loop: true
            });
        });

    }

    /**
     * @returns {Phaser.Physics.Arcade.Group}
     */
    getGroup() {

        return this.movingBlocks;
    }
}

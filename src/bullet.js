import * as PIXI from 'pixi.js';
import Entity from './entity.js';

export default class Bullet extends Entity {
    /**
     * @param {Vector} origin 
     * @param {Vector} direction 
     */
    constructor(origin, direction) {
        super();
        this.speed = 20;
        this.radius = 10;
        this.direction = {x: direction.x, y: direction.y};
        this.create(origin);
        app.ticker.add(this.update, this);
    }
    
    /**
     * @param {Vector} origin 
     */
    create(origin) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFFFF00)
            .drawCircle(0, 0, this.radius)
            .endFill();
        app.stage.addChild(this.graphics);

        this.x = origin.x;
        this.y = origin.y;
    }  
    
    onDestroy(cb) {
        this.destroyCb = cb;
    }
    
    destroy() {
        super.destroy();
        this.destroyCb(this);
    }

    move(dt) {
        const x = this.x + this.direction.x * this.speed * dt;
        const y = this.y + this.direction.y * this.speed * dt;

        const canMove = this.checkInBorders(x, y)

        if (canMove) {
            this.x = x;
            this.y = y;
        } else {
            this.destroy();
        }
    }
}
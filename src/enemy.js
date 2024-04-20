import * as PIXI from 'pixi.js';
import Entity from './entity.js';

export default class Enemy extends Entity {
    constructor(player) {
        super();
        this.player = player;
        this.direction = { x: 0, y: 0 }
        this.radius = 20;
        this.speed = 1;
        this.create();
        this.ticker = app.ticker.add(this.update, this);
    }

    create() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xffffff)
            .lineStyle(4, 0xffffff, 1)
            .drawCircle(0, 0, this.radius)
            .endFill()

        app.stage.addChild(this.graphics)
    }
    
    checkInBorders(x, y) {
        return true;
    }
    setRandomPosition() {
        const randomDirection = {
            x: (Math.random() - 0.5) * 2 + 1,
            y: (Math.random() - 0.5) * 2 + 1,
        }
        
        const position = {
            x: this.player.x + randomDirection.x * window.innerWidth,
            y: this.player.y + randomDirection.y * window.innerHeight,
        }
        
        this.setPosition(position.x, position.y)
    }


    move(dt) {
        const direction = utils.normalize({ x: this.player.x - this.x, y: this.player.y - this.y });
        const x = this.x + direction.x * this.speed * dt;
        const y = this.y + direction.y * this.speed * dt;
        const canMove = this.checkInBorders(x, y)

        if (canMove) {
            this.x = x;
            this.y = y;
        }
    }
}
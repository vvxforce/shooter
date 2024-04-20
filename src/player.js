import Input from "./input.js";
import Entity from "./entity.js";
import Bullet from "./bullet.js";
import * as PIXI from 'pixi.js';

export default class Player extends Entity {
    constructor() {
        super();
        this.input = new Input()
        this.lookDirection = { x: 0, y: 0 }
        this.radius = 20;
        this.speed = 5;
        this.update = this.update.bind(this);
        this.input.addPointerDownHandler(this.shoot.bind(this));
        this.bullets = [];
        this.health = 100;
        this.colors = {
            green: 0x00FF00,
            yellow: 0xFFEA00,
            red: 0xFF0000,
        }    

        this.create();

        app.ticker.add(this.update, this);
    }

    create() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(this.colors.green)
            .lineStyle(4, 0xFFFFFF, 1)
            .drawCircle(0, 0, this.radius)
            .drawRect(-this.radius * 1.5, 0, 50, 5)
            .endFill()
    }

    move(dt) {
        const direction = this.input.getDirection();
        this.direction = direction;
        const x = this.x + direction.x * this.speed * dt;
        const y = this.y + direction.y * this.speed * dt;

        const canMove = this.checkInBorders(x, y)
        if (canMove) {
            this.x = x;
            this.y = y;
        }
    }
    rotate() {
        const { x: px, y: py } = this.input.pointer;
        const { x: mx, y: my } = this;
        const dy = my - py;
        const dx = mx - px;
        const angle = Math.atan2(dy, dx);

        this.graphics.rotation = angle;

        const pointer = this.input.pointer;
        this.lookDirection.x = pointer.x - this.x;
        this.lookDirection.y = pointer.y - this.y;
        this.lookDirection = utils.normalize(this.lookDirection)
    }
    
    shoot() {
        const bullet = new Bullet({x: this.x, y: this.y }, this.lookDirection);
        this.bullets.push(bullet);
        bullet.onDestroy(bullet => {
            this.bullets = this.bullets.filter(b => b !== bullet);
        })
    }
    
    takeDamage(damage = 30) {
        this.health -= damage; 
        this.graphics.clear();
        const color = this.health > 50 ? this.colors.green : this.health > 20 ? this.colors.yellow : this.colors.red;

        this.graphics.beginFill(color)
            .lineStyle(4, 0xFFFFFF, 1)
            .drawCircle(0, 0, this.radius)
            .drawRect(-this.radius * 1.5, 0, 50, 5)
            .endFill()
    }

    update(dt) {
        this.move(dt)
        this.rotate()
    }
}
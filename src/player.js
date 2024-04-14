import Input from "./input.js";
import Shoot from "./shoot.js";

export default class Player {
    constructor(x = 0, y = 0, width = 100, height = 100, speed = 2) {
        this.shoot = new Shoot(this)
        this.input = new Input()
        this.lookDirection = {x: 0, y: 0}
        this.direction = {x: 0, y: 0}
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.create();
        this.speed = speed;
    }

    create() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xAA33BB)
            .lineStyle(4, 0xFFEA00, 1)
            .drawRect(this.x - this.width/2, this.y - this.height /2, this.width, this.height)
            .drawRect(this.x - this.width, this.y, 50, 5)
            .endFill()
    }

    move(dt) {
        const direction = this.input.getDirection();
        this.direction = direction;
        this.x += direction.x * this.speed * dt;
        this.y += direction.y * this.speed * dt;
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }
    rotate(){  
        const {x: px, y: py} = this.input.pointer;
        const {x: mx, y: my} = this;
        var dist_Y = my - py;
        var dist_X = mx - px;
        var angle = Math.atan2(dist_Y,dist_X);
        this.graphics.rotation = angle;
        this.lookDirection = this.input.getLookDirection({x: this.x, y: this.y})
      }

    update(dt) {
        this.move(dt)
        this.rotate()
        //this.draw()

    }
}
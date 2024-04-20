import Input from "./input.js";
import Shoot from "./shoot.js";

export default class Player {
    constructor() {
        this.shoot = new Shoot(this)
        this.input = new Input()
        this.width = 50;
        this.height = 50;
        this.speed = 10;
        this.lookDirection = {x: 0, y: 0}
        this.direction = {x: 0, y: 0}
        this.create();
    }

    get x() {
        return this.graphics.x;
    }
    get y() {
        return this.graphics.y;
    }
    
    set x(value) {
        this.graphics.x = value;
    }
    set y(value) {
        this.graphics.y = value;
    }

    create() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xAA33BB)
            .lineStyle(1, 0xFFEA00, 1)
            .drawRect(-this.width / 2, -this.height / 2, this.width, this.height)
            .drawRect(-this.width, 0, 50, 5)
            .endFill()
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dt) {
        const direction = this.input.getDirection();
        this.direction = direction;
        this.x += direction.x * this.speed * dt;
        this.y += direction.y * this.speed * dt;
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
    }
}
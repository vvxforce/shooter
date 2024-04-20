import Input from "./input.js";
import Shoot from "./shoot.js";

export default class Player {
    constructor() {
        this.shoot = new Shoot(this)
        this.input = new Input()
        this.lookDirection = { x: 0, y: 0 }
        this.direction = { x: 0, y: 0 }
        this.radius = 50;
        this.create();
        this.speed = 20;
    }

    get x() { return this.graphics.x }
    get y() { return this.graphics.y }

    set x(value) { this.graphics.x = value }
    set y(value) { this.graphics.y = value }

    create() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xAA33BB)
            .lineStyle(4, 0xFFEA00, 1)
            .drawCircle(0, 0, this.radius)
            .drawRect(this.x - this.radius * 1.5, this.y, 50, 5)
            .endFill()
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    checkInBorders(x, y) {
        return x + this.radius < app.stage.width && x - this.radius > 0 && y - this.radius > 0 && y + this.radius < app.stage.height
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
        var dist_Y = my - py;
        var dist_X = mx - px;
        var angle = Math.atan2(dist_Y, dist_X);
        this.graphics.rotation = angle;
        this.lookDirection = this.input.getLookDirection({ x: this.x, y: this.y })
    }

    destroy() {
        app.stage.removeChild(this.graphics)
    }

    update(dt) {
        this.move(dt)
        this.rotate()
    }
}
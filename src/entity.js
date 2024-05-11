

export default class Entity {
    constructor() {
        this.lookDirection = { x: 0, y: 0 }
        this.direction = { x: 0, y: 0 }
        this.radius = 50;
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
        return x + this.radius < window.innerWidth && x - this.radius > 0 && y - this.radius > 0 && y + this.radius < window.innerHeight
    }

    move(dt) {
    }

    rotate() {
    }

    setDestroyCallback(callback) {
        this.destroyCallback = callback;

    }

    destroy() {
        app.stage.removeChild(this.graphics)
        this.destroyCallback?.(this)
    }

    update(dt) {
        this.move(dt)
        this.rotate()
    }
}
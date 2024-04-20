import Input from "./input.js";
import Shoot from "./shoot.js";

export default class Enemy {
    constructor(player) {
        this.player = player;
        this.direction = { x: 0, y: 0 }
        this.radius = 20;
        this.create();
        this.speed = 5;
    }

    get x() { return this.graphics.x }
    get y() { return this.graphics.y }

    set x(value) { this.graphics.x = value }
    set y(value) { this.graphics.y = value }

    create() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xffffff)
            .lineStyle(4, 0xffffff, 1)
            //.drawCircle(this.x - this.width/2, this.y - this.height /2, this.width, this.height)
            .drawCircle(0, 0, this.radius)
            .endFill()

        app.stage.addChild(this.graphics)
    }

    setRandomPosition() {
        const rand = (min, max) => Math.random() * (max - min) + min
        this.x = rand(0, app.stage.width)
        this.y = rand(0, app.stage.height)
    }

    checkInBorders(x, y) {
        return x + this.radius < app.stage.width && x - this.radius > 0 && y - this.radius > 0 && y + this.radius < app.stage.height
    }

    destroy() {
        app.stage.removeChild(this.graphics)
    }

    move(dt) {
        let direction = { x: this.player.x - this.x, y: this.player.y - this.y }
        direction = utils.normalize(direction)
        console.log(direction)
        const x = this.x + direction.x * this.speed * dt;
        const y = this.y + direction.y * this.speed * dt;
        const canMove = this.checkInBorders(x, y)
        if (canMove) {
            this.x = x;
            this.y = y;
        }
    }

    update(dt) {
        this.move(dt)
        //this.rotate()
    }
}
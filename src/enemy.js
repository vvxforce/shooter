import Input from "./input.js";
import Shoot from "./shoot.js";
import Entity from "./entity.js";

export default class Enemy extends Entity{
    constructor(player) {
        super()
        this.player = player;
        this.radius = 20;
        this.create();
        this.speed = 2;
    }

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
        //
        const vector = {x:Math.random() -.5, y: Math.random() -.5}
        vector.x = vector.x + Math.sign(vector.x ) * app.stage.width
        vector.y = vector.y + Math.sign(vector.y ) * app.stage.height
        console.log(vector.x * app.stage.width)
        const rand = (min, max) => Math.random() * (max - min) + min
        this.x = rand(0, app.stage.width)
        this.y = rand(0, app.stage.height)
    }

    move(dt) {
        let direction = { x: this.player.x - this.x, y: this.player.y - this.y }
        direction = utils.normalize(direction)
        //onsole.log(direction)
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
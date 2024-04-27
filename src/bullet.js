import Entity from "./entity";

export default class Bullet extends Entity {
    constructor(origin, direction) {
        super()
        this.speed = 20;
        this.radius = 10;
        this.direction = direction;
        this.create(origin);
    }

    create(origin) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xAA33BB)
            .drawCircle(0, 0, this.radius)
            .endFill();
        this.x = origin.x;
        this.y = origin.y;
        app.stage.addChild(this.graphics)
    }  

    move(dt) {
        const x = this.x + this.direction.x * this.speed * dt;
        const y = this.y + this.direction.y * this.speed * dt;

        const canMove = this.checkInBorders(x,y)
        if (canMove) {
            this.x = x;
            this.y = y;
        } else {
            app.stage.removeChild(this.graphics)
        }
    }
}
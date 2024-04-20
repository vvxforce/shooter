export default class Bullet {
    constructor(origin, direction) {
        this.speed = 20;
        this.size = 10;
        this.direction = direction;
        this.create(origin);
        app.ticker.add(this.move.bind(this))
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

    create(origin) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xAA33BB)
            .drawCircle(0, 0, this.size)
            .endFill();
        this.x = origin.x;
        this.y = origin.y;
        app.stage.addChild(this.graphics)
    }   

    move(dt) {
        this.x += this.direction.x * this.speed * dt;
        this.y += this.direction.y * this.speed * dt;
    }
}
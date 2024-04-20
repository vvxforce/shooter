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

    checkInBorders(x, y) {
        return  x + this.size /2 < app.stage.width && x - this.size /2 > 0 && y - this.size /2 > 0 && y + this.size /2< app.stage.height}
 

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
export default class Bullet {
    constructor(origin, direction) {
        //this.x = x;
        //this.y = y;
        this.create(origin);
        this.speed = 8;
        this.direction = direction;
        app.ticker.add(this.move.bind(this))
    }

    create(origin) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xAA33BB)
            .lineStyle(14, 0xFFEA00, 1)
            .drawRect(0, 0, 20, 20)
            .endFill();
        this.graphics.x = origin.x;
        this.graphics.y = origin.y;
        app.stage.addChild(this.graphics)
    }   

    move(dt) {
        this.graphics.x +=  this.direction.x * this.speed * dt;
        this.graphics.y +=  this.direction.y * this.speed * dt;
        //debugger
        console.log( this.graphics.x,  this.graphics.y)
        //debugger
    }
}
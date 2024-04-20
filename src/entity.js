import * as PIXI from 'pixi.js';

export default class Entity {
    constructor() {
        this.radius = 50;
        this.speed = 20;
        this.direction = { x: 0, y: 0 };
        app.ticker.add(this.update, this);
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
            .endFill()
    }
    
    setPosition(x, y) {
        this.x = x
        this.y = y
    }
    
    onDestroy(cb) {
        this.destroyCb = cb;
    }
    
    
    destroy() {
        app.ticker.remove(this.update, this);
        app.stage.removeChild(this.graphics)
        if (this.destroyCb) this.destroyCb(this);
    }
    
    checkInBorders(x, y) {
        return x + this.radius < window.innerWidth && x - this.radius > 0 && y - this.radius > 0 && y + this.radius < window.innerHeight; 
    }
    
    move(dt) {
        
    }
    
    update(dt) {
        this.move(dt);
    }

}
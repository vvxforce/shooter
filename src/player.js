import Input from "./input.js";
import Bullet from "./bullet.js";
import Shoot from "./shoot.js";
import Entity from "./entity.js";

export default class Player extends Entity {
    constructor() {
        super()
        //this.shoot = new Shoot(this)
        this.input = new Input();
        this.bullets = [];
        this.input.addPointerDownHandler(this.shoot.bind(this));
        this.create()
        this.health = 3;
    }

    create() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xAA33BB)
            .lineStyle(4, 0xFFEA00, 1)
            .drawCircle(0, 0, this.radius)
            .drawRect(this.x - this.radius * 1.5, this.y, 50, 5)
            .endFill()
    }

    update(dt) {
        super.update(dt)
        this.bullets.forEach(e => {
            e.update(dt)
        })

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
        //this.lookDirection = this.input.getLookDirection({ x: this.x, y: this.y })
        this.lookDirection.x = px - mx
        this.lookDirection.y = py - my
        this.lookDirection = utils.normalize(this.lookDirection)
    }

    shoot() {
        const origin = { x: this.x, y: this.y };
        //console.log(this)
        const direction = { x: this.lookDirection.x, y: this.lookDirection.y }
        const bullet = new Bullet(origin, direction);
        this.bullets.push(bullet)
        bullet.setDestroyCallback(this.removeBullet.bind(this))
    }

    removeBullet(bullet) {
        const index = this.bullets.indexOf(bullet)
        this.bullets.splice(index, 1)
        console.log(this.bullets)
    }

    hit() {
        this.health -= 1
        if (this.health === 0) {
            observer.fire('dead')
            this.destroy()
        } else { observer.fire('hit', this.health) }

    }
}
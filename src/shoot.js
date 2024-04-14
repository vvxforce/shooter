import Input from "./input.js";
import Bullet from "./bullet.js";

export default class Shoot {
    constructor(player) {
        this.input = new Input();
        this.bullets = [];
        this.direction = { x: 0, y: 0 };
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.keys = {}
        this.player = player;
        this.createHandlers();
    }
    createHandlers() {
        this.input.addPointerDownHandler(this.shoot.bind(this));
    }

    reset() {
        this.direction.x = 0;
        this.direction.y = 0;
    }
    onKeyDown(ev) {
        this.shoot()
        console.log(ev.key)
    }
    onKeyUp(ev) {
        this.keys[ev.key] = false;
    }

    shoot() {
        const origin = {x: this.player.x, y: this.player.y};
        const direction = {x: this.player.lookDirection.x, y: this.player.lookDirection.y}
        const bullet = new Bullet(origin, direction);
        //1. create the bullet
        //2. give the bullet direction
    }
}
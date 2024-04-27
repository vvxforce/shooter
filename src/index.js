import * as PIXI from '../node_modules/pixi.js/dist/pixi.min.mjs';
import Player from './player.js';
import Input from './input.js';
import Enemy from './enemy.js';
import './utils.js'


export default class PixiApp {
    constructor() {
        this.create();
    }

    start() {
        this.app.ticker.add(dt => this.loop(dt));
    }

    create() {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        this.app = new PIXI.Application({
            width: this.size.width,
            height: this.size.height,
            transparent: false,
            antialias: true
        });
        window.app = this.app;

        const background = new PIXI.Graphics();
        background.beginFill(0x000000)
            .drawRect(0, 0, this.size.width, this.size.height)
            .endFill();

        background.interactive = true;
        this.app.stage.addChild(background)

        document.body.appendChild(this.app.view);
        this.app.renderer.backgroundColor = 0x23395D;

        this.app.renderer.resize(this.size.width, this.size.height)

        this.input = new Input(this.app);
        this.player = new Player();
        this.player.setPosition(this.size.width / 2, this.size.height / 2);
        this.app.stage.addChild(this.player.graphics)

        this.enemies = []






        this.pointer = { x: 0, y: 0 }

        this.createEnemy()


    }

    createEnemy() {
        const enemy = new Enemy(this.player)
        this.enemies.push(enemy)
        enemy.setRandomPosition()
        console.log('createEnemy')
        enemy.setDestroyCallback(this.removeEnemy.bind(this))
    }

    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy)
        this.enemies.splice(index, 1)
    }



    loop(dt) {


        this.player.update(dt)
        this.enemies.forEach(e => {
            e.update(dt)
            //console.log(window.utils.checkCollision(this.player, e))

            if (window.utils.checkCollision(this.player, e)) {
                this.player.destroy()
                e.destroy()
            }
            this.player.bullets.forEach(b => {
                if (window.utils.checkCollision(b, e)) {
                    //console.log(this.player.bullets.indexOf(b))
                    b.destroy()
                    e.destroy()
                }
            })
        })
    }

}

const app = new PixiApp();
app.start();
import * as PIXI from '../node_modules/pixi.js/dist/pixi.min.mjs';
import Player from './player.js';
import Input from './input.js';
import Enemy from './enemy.js';
import './utils.js'


export default class PixiApp {
    constructor() {
        this.create();
        this.elapsed = 0;
    }

    start() {
        this.app.ticker.add(this.loop, this);
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
            .drawRect(0,0, this.size.width, this.size.height)
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
        this.pointer = {x: 0, y: 0}

        window.onresize = function(event) {
            this.size = {
                width: window.innerWidth,
                height: window.innerHeight,
            }
            background.clear()
            background.beginFill(0x000000)
                .drawRect(0,0, this.size.width, this.size.height)
                .endFill();
            this.app.renderer.resize(this.size.width, this.size.height)
        };
        console.log(this.app.stage.width, this.size.width);

        this.enemySpawnRate = 3 * 60; 
        this.enemySpawnRateCounter = 0;
    }

    createEnemy() {
        if (this.enemies.length > 30) return;
        const enemy = new Enemy(this.player)
        this.enemies.push(enemy)
        enemy.setRandomPosition()
        enemy.speed *= 1 + this.elapsed * 0.01;
        enemy.onDestroy(() => {
            this.enemies = this.enemies.filter(e => e !== enemy)
        });
    }

    loop(dt) {
        this.elapsed += dt / 60;
        this.enemySpawnRateCounter += dt;

        if (this.enemySpawnRateCounter > this.enemySpawnRate) {
            this.createEnemy()
            this.enemySpawnRateCounter = 0;
            this.enemySpawnRate -= 0.05 * 60;
            if (this.enemySpawnRate < 30) this.enemySpawnRate = 30; 
        }

        for (const enemy of this.enemies) {
            const enemyPlayerCollision = utils.checkCollision(this.player, enemy)

            if (enemyPlayerCollision) {
                this.player.takeDamage(30);
                enemy.destroy()
            }
            
            const bullet = this.player.bullets.find(bullet => utils.checkCollision(bullet, enemy));
            if (bullet) {
                enemy.destroy()
                bullet.destroy()
            }
        }
    }

}

const app = new PixiApp();
app.start();

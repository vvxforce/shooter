import * as PIXI from '../node_modules/pixi.js/dist/pixi.min.mjs';
import Player from './player.js';
import Input from './input.js';


class PixiApp {
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
            .drawRect(0,0, this.size.width, this.size.height)
            .endFill();

        background.interactive = true;
        this.app.stage.addChild(background)

        document.body.appendChild(this.app.view);
        this.app.renderer.backgroundColor = 0x23395D;
        
        this.app.renderer.resize(this.size.width,this.size.height)

        this.input = new Input(this.app);
        this.player = new Player();
        this.player.setPosition(this.size.width / 2, this.size.height / 2);
        this.app.stage.addChild(this.player.graphics)
        
        


        this.pointer = {x: 0, y: 0}




    }



    loop(dt) {
        this.player.update(dt)
        const direction = this.input.getDirection()
        //this.rect.move(direction, dt)
        //console.log(direction)
    }

}

const app = new PixiApp();
app.start();

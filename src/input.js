export default class Input {
    constructor(app) {
        if (Input.instance) {return Input.instance}
        this.direction = { x: 0, y: 0 };
        this.lookDirection = {x: 0, y: 0};
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.keys = {}
        this.pointer = {x:0, y:0}
        this.app = app;
        this.createHandlers();
        this.pointerDownHandlers = [];
        Input.instance = this;
    }
    createHandlers() {
        window.addEventListener("keydown", this.onKeyDown)
        window.addEventListener("keyup", this.onKeyUp)
        this.app.stage.interactive = true;
       this.app.stage.on('pointermove', this.onPointerMove)
       this.app.stage.on('pointerdown', this.onPointerDown.bind(this))
        
    }

    reset() {
        this.direction.x = 0;
        this.direction.y = 0;
    }
    onKeyDown(ev) {
        this.keys[ev.key] = true;
    }
    onKeyUp(ev) {
        this.keys[ev.key] = false;
    }

    onPointerMove(ev) {
        Object.assign(this.pointer, ev.data.global)
    }

    onPointerDown() {
        for (let handler of this.pointerDownHandlers) {
            handler()
        }
    }

    addPointerDownHandler(handler) {
        this.pointerDownHandlers.push(handler)
    }

    getDirection() {
        this.reset()
        if (this.keys.w) { this.direction.y -= 1 }
        if (this.keys.s) { this.direction.y += 1 }
        if (this.keys.a) { this.direction.x -= 1 }
        if (this.keys.d) { this.direction.x += 1 }
        return this.direction
        
    }

   
    
}
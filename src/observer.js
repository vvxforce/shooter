/**
 * @typedef {Object.<string, Function[]>} Events
 */

export default class Observer {
    constructor() {
        this.events = {};
        window.observer = this;
    }

    subscribe(event, callback) {
        if (event in this.events) { this.events[event].push(callback) }
        else { this.events[event] = [callback] }
    }
    fire(event, data) {
        const callbacks = this.events[event]
        if (callbacks) {
            callbacks.forEach((cb) => cb(data))
        }
    }
}
export default class UI {
    constructor() {
        observer.subscribe('hit', this.onHit.bind(this))
    }

    onHit(data) {
        //console.log('ui: player hit')
        console.log(data)
    }
}
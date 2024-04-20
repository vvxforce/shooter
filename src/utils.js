export default (function () {
    /**
     * @typedef {{x: number, y: number}} Vector
     */
    window.utils = {
        normalize(vector) {
            const { x, y } = vector;
            const length = Math.sqrt(x * x + y * y);

            if (length !== 0) {
                vector.x /= length;
                vector.y /= length;
            }
            return vector
        },

        /**
         * 
         * @param {Vector} p1 
         * @param {Vector} p2 
         * @returns 
         */
        distance(p1, p2) {
            const vector = {x: p1.x - p2.x , y: p1.y - p2.y};
            const { x, y } = vector;
            const length = Math.sqrt(x * x + y * y);
            return length
        }, 

        /**
         * @param {Entity} c1 
         * @param {Entity} c2 
         * @returns {boolean}
         */
        checkCollision(c1, c2) {
            const distance = this.distance(c1, c2);
            return distance < c1.radius + c2.radius
        }
    } 
})()


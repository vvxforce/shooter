export default (function () {
    window.utils = {
        normalize(vector) {
            const { x, y } = vector;
            const length = Math.sqrt(x * x + y * y);
            if (length !== 0) {
                // Normalize the vector
                vector.x /= length;
                vector.y /= length;
            }
            return vector
        },

        distance(p1, p2) {
            const vector = {x: p1.x - p2.x , y: p1.y - p2.y};
            const { x, y } = vector;
            const length = Math.sqrt(x * x + y * y);
            return length
        }   
    } 
    console.log(window.utils.normalize)
})()


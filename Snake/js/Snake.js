class Snake {

    constructor(direction, x, y) {
        this._direction = direction;
        this._queue = [];
        this.last = null;
        this.insertHead(x, y);
    }

    insertHead(x, y) {
        this._queue.unshift({x: x, y: y});
        this.last = this._queue[0];
    }

    deleteTail() {
        return this._queue.pop();
    }

}

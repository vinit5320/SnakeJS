class Grid {

    constructor(defaultValue, columns, rows) {
        this.width = columns;
        this.height = rows;
        this._grid = [];
        for (var x = 0; x < columns; x++) {
            this._grid.push([]);
            for (var y = 0; y < rows; y++) {
                this._grid[x].push(defaultValue);
            }
        }
    }

    get(x, y) {
        return this._grid[x][y];
    }

    set(value, x, y) {
        this._grid[x][y] = value;
    }

}

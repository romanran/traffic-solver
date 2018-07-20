class Entity {
    constructor(
        size   = 10, 
        start  = {x: 0, y: 0},
        target = {x: 0, y: 0},
        color  = "#FFFFFF" 
    ) {
        this.size = size
        this.radius = size
        this.starting_position = start
        this.position = start
        this.target = target
    }
    init() {


    }
    move(x = 0, y = 0) {
        this.position.x += x
        this.position.y += y
    }
}
module.exports = Entity;
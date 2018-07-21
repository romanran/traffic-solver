const _ = require('lodash')
class Entity {
    constructor(
        radius = 10, 
        start  = {x: 0, y: 0},
        target = {x: 0, y: 0},
        color  = "#FFFFFF"
    ) {        
        this.radius = radius
        this.starting_position = start
        this.position = start
        this.target = target
        this.id = _.uniqueId()
        this.is_hit = false
        this.color = color
    }
    init() {


    }
    move(x = 0, y = 0) {
        this.position.x += x
        this.position.y += y
    }
}
module.exports = Entity;
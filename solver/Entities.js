const _ = require('lodash')
const Entity = require('./canvas/Entity')

class Entities {
    constructor(scenario) {
        this.scenario = scenario
        this.entities = []
    }
    init() {
        _.forEach(this.scenario.entities, entity => {
            const target = this.scenario.targets[entity.target]

            const entity_instance = new Entity(
                this.scenario.entity_radius, 
                {x: entity.x, y: entity.y},
                target,
                entity.color
            )
            this.entities.push(entity_instance)
        })
        this.start()
    }

    start() {
        this.processTick()
    }
    processTick() {
        setTimeout(this.processTick.bind(this), 0)
        this.move()
    }
    move() {
        _.forEach(this.entities, entity => {
            entity.move(0.1, 0)            
        })
    }
    get list() {
        return this.entities
    }
    get position() {
        return this.entities.map(entity => {
            return {
                id: entity.id,
                position: entity.position,
                is_hit: entity.is_hit
            }
        })
    }
}

module.exports = Entities
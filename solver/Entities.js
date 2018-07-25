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
            entity_instance.init()
            this.entities.push(entity_instance)
        })
        this.start()
    }

    start() {
        this.processTick()
    }
    processTick() {
        setTimeout(this.processTick.bind(this), 10)
        this.move()
        this.checkIntersections()
    }
    checkIntersections() { 
        let for_checking = _.clone(this.entities)
        _.pull(for_checking, this.entities[0])
        let previous = 0
        this.entities.forEach((entity, i) => {
            if (i === this.entities.length - 1) {
                return 0
            }
            for_checking.forEach(entity2 => {                
                const is_hit = this.isIntersecting(entity, entity2)
                entity.is_hit = is_hit
                _.find(this.entities, {id: entity2.id}).is_hit = is_hit
            })
            if (previous) {
                _.pull(for_checking, previous)
            }
            previous = entity
        })
    }
    isIntersecting(entity1, entity2) {
        const distance =  Math.pow(entity1.position.x - entity2.position.x, 2) +  Math.pow(entity1.position.y - entity2.position.y, 2)
        return distance <=  Math.pow(entity1.radius + entity2.radius, 2)
    }

    move() {
        this.entities[0].move(-0.1, 0) 
        this.entities[1].move(0, 0) 
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
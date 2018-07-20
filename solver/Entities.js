const _ = require('lodash')
const Entity = require('./canvas/Entity')

class Entities {
    constructor(scenario) {
        this.scenario = scenario
        this.entities = []
    }
    init() {
        _.forEach(this.scenario.entities, entity => {
            const target = _.find(this.scenario.targets, entity.target)
            const entity_instance = new Entity({
                radius : this.scenario.entity_radius, 
                start  : {x: entity.x, y: entity.y},
                target : target,
                color  : entity.color
            })
            this.entities.push(entity_instance)
        })
    }

    start() {

    }
    get list() {
        return this.entities
    }
}

module.exports = Entities;
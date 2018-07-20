const Entities = require('./Entities');
const scenario = require('./scenarios/basic')

module.exports = {
    Entities: new Entities(scenario)
}
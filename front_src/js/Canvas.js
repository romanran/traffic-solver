const _ = require('lodash')



class Canvas {
    constructor(canvas, socket) {
        this.canvas = canvas
        this.socket = socket
        this.ctx = canvas.getContext('2d')
        this.entities = []
    }
    nextFrame() {
        this.socket.emit('ready', true)
        requestAnimationFrame(this.nextFrame.bind(this))
    }
    listen() {
        this.socket.on('init', this.init.bind(this)); 
        this.socket.on('entities_pos', this.move.bind(this)); 
    }
    init(entities) {
        console.log('Entities', entities)
        this.entities = entities
        this.resize()
        window.addEventListener('resize', _.debounce(e => this.resize()))
        _.forEach(this.entities, entity => this.drawEntity(entity))
    }
    move(entities) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        _.forEach(entities, entity => {
            
            const target = _.find(this.entities, {id: entity.id})
            console.log(entity,target)
            target.position = entity.position
            target.is_hit = entity.is_hit
            this.drawEntity(target)
        })
    }
    resize() {
        this.ctx.canvas.width  = window.innerWidth
        this.ctx.canvas.height = window.innerHeight
    }
    drawEntity(entity) {
        this.ctx.arc(entity.position.x, entity.position.y, entity.radius, 0, 2*Math.PI)
        this.ctx.fillStyle = entity.color
        this.ctx.fill()
    }
}   

module.exports = Canvas
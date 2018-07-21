const _ = require('lodash')
const Handlebars = require('handlebars')

class Canvas {
    constructor(canvas, socket) {
        this.canvas = canvas
        this.socket = socket
        this.ctx = canvas.getContext('2d')
        this.canvas_wrap = document.querySelector('[data-canvas-wrap]')
        this.stats_template = ''
        this.entities = []
        this.stats = {}
        this.stats_wrap = document.querySelector('[data-stats]')
    }
    nextFrame() {
        this.socket.emit('ready', true)
        requestAnimationFrame(this.nextFrame.bind(this))
        this.updateStats()
    }
    listen() {
        this.socket.on('init', this.init.bind(this)); 
        this.socket.on('entities_pos', this.move.bind(this)); 
    }
    init(entities) {
        console.log('Entities', entities)
        this.entities = entities
        this.resize()
        const stats = document.querySelector('[data-stats-template]')
        console.log(stats.innerHTML);
        
        this.stats_template = Handlebars.compile(stats.innerHTML)
        // stats.parentNode.removeChild()
        this.nextFrame()

        window.addEventListener('resize', _.debounce(e => this.resize()))
        _.forEach(this.entities, entity => this.drawEntity(entity))
    }
    move(entities) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        _.forEach(entities, entity => {
            const target = _.find(this.entities, {id: entity.id})
            target.position = entity.position
            target.is_hit = entity.is_hit
            this.drawEntity(target)
        })
    }
    resize() {
        this.ctx.canvas.width  = this.canvas_wrap.scrollWidth
        this.ctx.canvas.height = this.canvas_wrap.scrollHeight
    }
    drawEntity(entity) {
        this.ctx.arc(entity.position.x, entity.position.y, entity.radius, 0, 2*Math.PI)
        this.ctx.fillStyle = entity.color
        this.ctx.fill()
    }
    updateStats() {
        this.stats = {
            entities: this.entities
        }
        console.log();
        
        this.stats_wrap.innerHTML = this.stats_template(this.stats)
    }
}   

module.exports = Canvas
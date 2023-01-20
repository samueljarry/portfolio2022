import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        this.height = window.innerHeight
        this.width = window.innerWidth
        this.pixelRatio = Math.min(devicePixelRatio, 2)
        this.aspect = this.width / this.height

        this.eventEmitter = new EventEmitter()

        window.addEventListener('resize', () =>
        {
            this.height = window.innerHeight
            this.width = window.innerWidth
            this.pixelRatio = Math.min(devicePixelRatio, 2)
            this.aspect = this.width / this.height

            this.trigger('resize')
        })
    }

    resize()
    {
        this.height = window.innerHeight
        this.width = window.innerWidth
        this.pixelRatio = Math.min(devicePixelRatio, 2)
        this.aspect = this.width / this.height
    }

    mousemove(e)
    {
        this.cursorX = e.clientX
        this.cursorY = e.clientY
    }
}
import * as THREE from 'three'
import Experience from "../Experience"

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()

        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.aspect = this.sizes.width / this.sizes.height
        this.camera = this.experience.camera
        this.scene = this.experience.scene

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: 'default',
            alpha:true
        })
        this.instance.setSize( this.sizes.width, this.sizes.height )
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        this.instance.setClearColor(0xEEEEEE)
    }

    resize()
    {
        this.instance.setSize( this.sizes.width, this.sizes.height )
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }
    
    update()
    {
    }
}
import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Utils/Renderer.js'
import Resources from './Utils/Resources.js'
import Models from './sources.js'
import World from './World/World.js'
import Debug from './Utils/Debug.js'
import Composer from './Utils/Composer.js'
import Animations from './Animations/Animations.js'
import Raycaster from './Utils/Raycaster.js'
import projects from './Sections/datas.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    { 
        if(instance)
        {
            return instance
        }

        instance = this

        // Global access
        window.experience = this


        // Datas 
        this.datas = projects
        // Debug
        this.debug = new Debug()

        this.loadingHandler = new THREE.LoadingManager(
            () =>
            {
                console.log('loading')
            }
        )

        // Scene
        this.time = new Time()
        this.canvas = canvas
        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.resources = new Resources(Models)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.composer = new Composer()
        this.world = new World()
        this.animations = new Animations()
        this.raycaster = new Raycaster()

         // Resize event
         this.sizes.on('resize', () => this.resize() )

         // Time tick event
        this.time.on('tick', () => this.update() )

        // Mouse Event
        window.addEventListener('mousemove', (e) => this.mousemove(e))
    }

    resize()
    {
        this.sizes.resize()
        this.camera.resize()
        this.renderer.resize()
        this.composer.resize()
    }

    mousemove(e)
    {
        this.sizes.mousemove(e)
        this.animations.mousemove()
        this.raycaster.mousemove()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.raycaster.update()
        // this.renderer.update()
        this.composer.update()
        this.animations.update()
    }
}
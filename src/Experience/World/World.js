import * as THREE from 'three'
import vertex from '../../shaders/vertex.glsl'
import fragment from '../../shaders/fragment.glsl'

import Experience from "../Experience.js"
import Environment from './Environment.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()

        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time


        // this.resources.on('ready', () =>
        // {
        this.environment = new Environment()
        // })
    }

    update()
    {
       this.environment.update()
    }
}
import * as THREE from 'three'
import Experience from "../Experience";

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()


        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setAmbientLight()

    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight()
        this.scene.add(this.ambientLight)
    }

    update()
    {
    }
}
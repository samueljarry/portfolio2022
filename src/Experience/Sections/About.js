import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'

import vertex from '../../shaders/vertex.glsl'
import fragment from '../../shaders/fragment.glsl'

import img from '../../../static/images/about/photo.jpg'

export default class About
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.close = document.querySelector('.unreveal__button')

        this.planeWidth = 1
        this.nombreDor = 1.61803398875

        this.planeAspectRatio =  (this.planeWidth*this.nombreDor)  / this.planeWidth
        this.scaleX = this.planeAspectRatio*.5
        this.scaleY = this.planeAspectRatio*.5

        this.textureLoader = new THREE.TextureLoader()
        this.materialMap = this.textureLoader.load(img)

        this.setInstance()
    }

    setInstance()
    {
        this.aboutMaterial = new THREE.ShaderMaterial(
        {
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: 
            {
                tMap: {value : this.materialMap },
                uPlaneSizes: {value: [0, 0]},
                uImageSizes: {value: [0, 0]},
                uViewPortSizes: {value : [this.sizes.width, this.sizes.height]},
                uSpeed: { value: 0},
                uTime: {value: 0},
                uOpacity: {value: 0},
                uScale: {value: this.scale}
            },
            transparent:true,
        })

        this.instanceMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.planeWidth, this.planeWidth*this.nombreDor, 16, 16),
            this.aboutMaterial
        )

        this.setAspectRatio()
        
        this.instanceMesh.position.set( 0, 0, -2)

    }

    setAspectRatio()
    {
        this.instanceMesh.scale.set(this.scaleX, this.scaleY, 1)
    }

    handleReveal()
    {
        this.revealDuration = .4

        gsap.timeline()
        .to(this.aboutMaterial.uniforms.uOpacity,
        {
            value: 1,
            duration: this.revealDuration
        })
    }

    unset()
    {
        gsap.to(
            this.aboutMaterial.uniforms.uOpacity,
            {
                value: 0,
                duration: .4
            }
        )
    }

    update()
    {
        this.aboutMaterial.uniforms.uTime.value += .01
    }
}
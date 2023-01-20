import * as THREE from 'three'
let lerp = require('lerp')
import normalizeWheel from 'normalize-wheel'
import gsap from 'gsap'

import Experience from "../Experience";
import fragment from '../../shaders/fragment.glsl'
import vertex from '../../shaders/vertex.glsl'
import map from '../Utils/map'


export default class Slider
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.projectsDatas = this.experience.datas

        this.isDown

        this.locomotiveRotation = {}
        this.index = 0
        this.projects = this.projectsDatas.length
        this.padding = 2.5
        this.planeWidth = 2
        this.nombreDor = 1.61803398875
        this.length = this.projectsDatas.length

        this.width = this.planeWidth + this.padding
        this.widthTotal = this.width * this.length

        this.setScroll()
        this.setInstance()
        this.setAdditionalDatas()
        this.setListeners()
    }

    setInstance()
    {
        this.planeGeometry = new THREE.PlaneGeometry(this.planeWidth*this.nombreDor, this.planeWidth, 16, 16)

        this.instance = new THREE.Group()
        this.scene.add(this.instance)

        this.meshes = []

        this.textures = this.projectsDatas.map(project =>
        {   
            return new THREE.TextureLoader(this.experience.loadingHandler).load(project.banner)
        })

        for(let i = 0; i < this.projects; i++)
        {
            this.x = this.padding * this.index

            const plane = new THREE.Mesh(
                this.planeGeometry,
                new THREE.ShaderMaterial(
                    {
                       vertexShader: vertex,
                       fragmentShader: fragment,
                       uniforms: 
                       {
                            tMap: {value : this.textures[i] /* textures[i%textures.length] */},
                            uPlaneSizes: {value: [0, 0]},
                            uImageSizes: {value: [0, 0]},
                            uViewPortSizes: {value : [this.sizes.width, this.sizes.height]},
                            uSpeed: { value: 0},
                            uTime: {value: 0},
                            uOpacity: {value: 0}
                       },
                       transparent:true,
                    })
            )
    
            
            this.instance.add(plane)
            plane.position.set(this.x, -.5, -4)
            // Chaque plane doit avoir un objet datas relatif à spécifier dans setDatas(), sinon le Raycaster déconne
            this.meshes.push({plane, index: i, datas: this.projectsDatas[i]})
            this.index++
        }
    
        this.instance.traverse(child =>
        {
            if(child.isMesh)
            {
                child.transparent = true
                child.material.uniforms.uOpacity.value = 0
            }
        })
    }

    setAdditionalDatas()
    {
        this.meshes.map(
            e =>
            {
                this.projectsDatas[e.index].mesh = e.plane
                e.plane.userData.datas = this.projectsDatas[e.index]
            }
        )

        console.log(this.projectsDatas)
    }

    handleReveal()
    {
        this.locomotiveRotation.value = 70

        this.meshes.forEach(
            mesh =>
            {
                gsap.timeline()
                    .to(
                    mesh.plane.material.uniforms.uOpacity,
                    {
                        value: 1,
                        duration: .4,
                    }, '<'
                    )
                    .to(this.locomotiveRotation,
                    {
                        value: 0,
                        duration: 2,
                        ease: 'Power4.easeOut'
                    }, '<')
            }
        )

        this.isActive = true
    }

    setScroll()
    {
        this.scroll =
        {
            ease: .05,
            current: 0,
            target: 0,
            last: 0,
        }

    }

    setListeners()
    {
        this.onTouchDown = (event) =>
        {
            if(this.isActive)
            {
                this.isDown = true

                this.scroll.position = this.scroll.current
                this.start = event.touches ? event.touches[0].clientX : event.clientX
            }
        }

        this.onTouchMove = (event) =>
        {
            if(this.isActive)
            {
                if(!this.isDown) return

                const x = event.touches ? event.touches[0].clientX : event.clientX
                const distance = (this.start - x) * .01
    
                this.scroll.target = this.scroll.position + distance
            }
        }

        this.onTouchUp = (event) =>
        {
            if(this.isActive)
            {
                this.isDown = false
            }
        }

        this.onWheel = (event) =>
        {
            if(this.isActive)
            {
                const normalized = new normalizeWheel(event)
                const speed = normalized.pixelY
    
                this.scroll.target += speed * .005
            }
        }
 
        window.addEventListener('mousewheel', this.onWheel.bind(this))
        window.addEventListener('wheel', this.onWheel.bind(this))
     
        window.addEventListener('mousedown', this.onTouchDown.bind(this))
        window.addEventListener('mousemove', this.onTouchMove.bind(this))
        window.addEventListener('mouseup', this.onTouchUp.bind(this))
     
        window.addEventListener('touchstart', this.onTouchDown.bind(this))
        window.addEventListener('touchmove', this.onTouchMove.bind(this))
        window.addEventListener('touchend', this.onTouchUp.bind(this))

    }

    unset()
    {
        this.meshes.forEach(
            mesh =>
            {
                gsap.timeline()
                .to(
                    mesh.plane.material.uniforms.uOpacity,
                    {
                        value: 0,
                        duration: .4,
                    }, '<'
                )
                .to(
                    this.scroll,
                    {
                        current: 0,
                        target: 0,
                        last: 0
                    }
                )
            })
        this.isActive = null
    }


    update()
    {
        this.updateScroll()
    }

    updateScroll()
    {
        this.meshes.forEach(mesh =>
        {
            mesh.plane.material.uniforms.uTime.value += .02
            this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
            mesh.plane.position.x =( this.width * mesh.index - (this.scroll.current + this.locomotiveRotation.value) + 42069*this.widthTotal)%this.widthTotal - 2 * this.width
            mesh.plane.position.y = Math.cos((mesh.plane.position.x / this.widthTotal) * Math.PI) * 6 - 6.5
            mesh.plane.rotation.z = map(mesh.plane.position.x, -this.widthTotal, this.widthTotal, Math.PI, -Math.PI) 
        })
    }
}
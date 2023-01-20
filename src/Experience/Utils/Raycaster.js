import gsap from 'gsap'
import * as THREE from 'three'
import Experience from "../Experience";
import Project from '../Sections/Projects';

export default class Raycaster
{
    constructor()
    {
        this.experience = new Experience()
        this.handleProject = new Project()
        this.slider = this.experience.animations.navigation.slider
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera.instance
        this.canvas = this.experience.canvas

        this.projectDOM = document.querySelector('.project__section')
        this.cursor = document.querySelector('.cursor')
        this.project = null
        this.intersects = null
        this.currentIntersect = null

        this.setInstance()
        this.setListeners()
    }

    setInstance()
    {
        this.instance = new THREE.Raycaster()

        // Cursor
        this.pointer = new THREE.Vector2

        // Tested meshes
        this.meshes = this.slider.meshes.map(
            obj =>
            {
                return obj.plane
            }
        )

        this.datas = this.slider.meshes.map(
            obj =>
            {
                return obj.datas
            }
        )
    }

    setListeners()
    {
        window.addEventListener('click', (e) => this.project && test(e))

        const test = (e) =>
        {
            this.handleProject.setInstance(this.project)
        }
    }

   mousemove()
   {
        this.pointer.x = (this.sizes.cursorX / this.sizes.width) * 2 - 1
        this.pointer.y = - (this.sizes.cursorY / this.sizes.height) * 2 + 1 
   }

   checkRaycast()
   {
        if(!this.handleProject.isActive)
        {
            if(this.intersects.length && this.slider.isActive)
            {
                // Initialise les fonctions de raycast ( set )
                if(!this.currentIntersect)
                {
                    this.handleMouse('set')
                    this.handleProperties('set', this.intersects[0])
                }
                this.currentIntersect = this.intersects[0]
            }
            else 
            {
                // Réinitialise les fonctions de raycast ( unset )
                if(this.currentIntersect)
                {
                    this.handleMouse('unset')
                    this.handleProperties('unset')
                }
                this.currentIntersect = null
            }
        }
        else
        {
            this.handleMouse('unset')
            this.handleProperties('unset')
        }
   }

   // Hover d'un projet dans le slider
   handleMouse(method)
   {
        const setMouse = () =>
        {
            document.documentElement.style.cursor = 'crosshair'

            gsap.timeline()
            .set('.see_more_span',
            {
                display: 'flex',
            })
            .set(this.cursor,
            {
                display:'block',
                background:'none'
            })
            .set('.see_more_item',
            {
                display:'block'
            })

            this.cursorTl = gsap.timeline({repeat: -1, ease: 'Power0.easeInOut'})
            .to('.see_more_item',
            {
                fontVariationSettings: "'wght' 1000, 'wdth' 151",
                stagger:
                {
                    amount: '.6',
                    from:'center'
                }
            })
            .to('.see_more_item',
            {
                fontVariationSettings: "'wght' 300, 'wdth' 151",
                stagger:
                {
                    amount: '.6',
                    from:'center'
                } 
            })
        }

        const unsetMouse = () =>
        {
            document.documentElement.style.cursor = 'default'

            this.cursorTl.kill()

            gsap.timeline()
            .set('.see_more_span',
            {
                display:'none'
            })
            .set(this.cursor,
            {
                display:'none'
            })
            .set('.see_more_item',
            {
                display:'none',
                fontVariationSettings: "'wght' 300, 'wdth' 151"
            })
        }

        switch(true)
        {
            case method == 'set':
                setMouse()
                break
            
            case method == 'unset':
                unsetMouse()
                break
        }
   }

   handleProperties(method, plane)
   {
        // Traiter les infos
        const setProperties = (plane) =>
        {
            this.project = plane.object.userData.datas
        }

        const unsetProperties = () =>
        {
            this.project = null
        }

         // Récupérer infos des projets dans le slider 
         switch(true)
         {
             case method == 'set':
                 setProperties(plane)
                 break
            
            case method == 'unset':
                 unsetProperties()
                 break
         }
   }

   update()
   {
        if(this.slider.isActive)
        {   
            this.objectToTest = this.meshes
            this.intersects = this.instance.intersectObjects(this.objectToTest)
            this.instance.setFromCamera(this.pointer, this.camera)
            this.checkRaycast()
        }
   }
}
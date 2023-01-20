import gsap from 'gsap'

import Experience from '../Experience'
import Cursor from './Cursor'
import Slider from '../Sections/Slider'
import About from '../Sections/About'
import Unset from '../Sections/Unset'

export default class Navigation
{
    constructor()
    {
        this.experience = new Experience()
        this.cursor = new Cursor()
        this.scene = this.experience.scene
        
        this.slider = new Slider()
        this.about = new About()
        this.unset = new Unset()

        this.isHovered = false

        this.close = document.querySelector('.unreveal__button')
        this.nav = document.querySelector('.landing__navigation')
        this.infoText = document.querySelectorAll('.info__text')

        this.items = document.querySelectorAll('.landing__item__span')
        this.items.forEach(
            item =>
            {
                item.addEventListener('mouseover', (e) =>
                {
                    this.setInstance(item)
                })

                item.addEventListener('mouseleave', (e) =>
                {
                    this.resetInstance(item)
                })
                item.addEventListener('click', (e) => this.isHovered && this.handleClick(e))
            }
        )
    }

    setInstance(item)
    {
        this.isHovered = true

        this.cursor.instance.style.display = 'block'
        gsap.timeline()
            .to(item,
                {
                    fontVariationSettings: `"wght" 700, "wdth" 170`,
                    
                    duration: .1,
                    ease: 'Power2.easeOut'
                })
    }

    resetInstance(item)
    {
        this.isHovered = false

        this.cursor.instance.style.display = 'none'
        gsap.timeline()
            .to(item,
                {
                    fontVariationSettings: `"wght" 100, "wdth" 130`,
                }) 
    }

    handleClick(e)
    {
        const animDuration = .4

        gsap.timeline()
            .to(this.nav,
            {
                opacity: 0,
                duration: animDuration,
                display: 'none'
            })

        this.infoText.forEach(
            text =>
            {
                gsap.to(
                    text,
                    {
                        opacity:0,
                        duration: animDuration,
                        display:'none'
                    }
                )
            }
        )
        
        
        for(let i = 0; i < e.path.length; i ++)
        {
            this.path = e.path[i].classList
            if(this.path)
            {
                this.checkSection(this.path.value == 'projects')
            }
        }
    }

    checkSection(section)
    {
        switch(true)
        {
            case this.path.value.includes('projects'):
                this.section = 'projects'
                break
            
            case this.path.value.includes('about'):
                this.section = 'about'
                break

            case this.path.value.includes('playground'):
                this.section = 'playground'
                break

            case this.path.value.includes('contact'):
                this.section = 'contact'
                break
        }

        this.setSection()
        this.unset.setSection(this.section)

        gsap.timeline()
            .to('.landing__portfolio__span',
            {
                opacity: 0,
                duration: .4
            })
            .set('.landing__portfolio__span',
            {
                innerText: this.section
            })
            .to('.landing__portfolio__span',
            {
                opacity: 1,
                duration: .4
            })
    }

    setSection()
    {
        switch(true)
        {
            case this.section == 'projects':
                this.slider.handleReveal()
                this.slider.isActive = true
                break

            case this.section == 'about':
                this.about.handleReveal()
                this.about.isActive = true

                break
        }

        gsap.to(
            this.close,
            {
                display: 'flex',
                opacity: 1,
            }
        )
    }

    handleUnreveal()
    {
        const animDuration = .4

        this.section = "portfolio"

        gsap.timeline({duration: animDuration})
            .to(this.close,
            {
                display: 'none',
                opacity: 0,
            }, '<')
            .to(this.nav,
            {
                opacity: 1,
                display: 'flex',
            }, '<')
            .to('.landing__portfolio__span',
            {
                opacity: 0,
            }, '<')
            .set('.landing__portfolio__span',
            {
                innerText: this.section
            })
            .to('.landing__portfolio__span',
            {
                opacity: 1,
            })
        
        this.infoText.forEach(
            text =>
            {
                gsap.to(
                    text,
                    {
                        opacity:1,
                        duration: animDuration,
                        display:'flex'
                    }
                )
            }
        )
    }

    update()
    {
        if(this.slider)
        {
            this.slider.update()
        }

        if(this.about)
        {
            this.about.update()
        }
    }
}
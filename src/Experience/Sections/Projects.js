import gsap from 'gsap'

import Experience from "../Experience";
import projects from './datas.js'

export default class Project
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.projectDOM = document.querySelector('.project__section')
        this.prevClose = document.querySelector('.unreveal__button')
        this.isActive
    }

    setListener()
    {
        this.close.addEventListener('click', () =>
        {
            this.unsetInstance()
        })
    }

    setInstance(project)
    {
        gsap.to(this.prevClose, {display: 'none', opacity: 0, duration: .1})

        this.isActive = true 

        this.projectDOM.style.display = 'block'

        this.projectDOM.innerHTML =
        `
        <div class="close__project">
            <img src="images/assets/cross.png" alt="cross icon" class="unreveal__icon">
        </div>
        <div class="project__reveal__1"></div>
        <div class="project__reveal__2"></div>
        <div class="project__wrapper">
            <div class="project__landing__wrapper">
                <div class="project__cover">
                    <div class="project_r_cover"></div>
                    <div class="title__container">
                        <h2 class="project__title">
                            ${project.name}
                        </h2>
                    </div>
                </div>

            <div class="project__infos">
                <p class="project__paragraph">
                    ${project.text.description.map(
                        phrase =>
                        {
                            return `<span class="project__sentence">${phrase}</span>`
                        }
                    ).join('<br>')}
                </p>
                <ul class="project__infos__list">
                    <li class="project__infos__item date">
                        date
                        <span class="project__infos__span">
                            ${project.text.date}
                        </span>
                    </li>
                    <li class="project__infos__item roles">
                        roles

                    ${project.text.roles.map(
                        role =>
                        {
                            return `
                                <span class="project__infos__span">
                                    ${role}
                                </span>
                            `
                        }
                    ).join('')}

                    </li>
                    <li class="project__infos__item techs">
                        techs
                        ${
                            project.text.techs.map(
                                tech =>
                                {
                                    return `
                                        <span class="project__infos__span">${tech}</span>
                                    `
                                }
                            ).join('')
                        }
                    </li>
                </ul>
            </div>
            </div>
            <div class="project_content">
                ${
                    project.url ?
                    `<a class="project__link" target="_blank" href="${project.url}"><span>Visit Website</span><img src="images/assets/left_arrow.png" alt="arrow icon"></a>`
                    : 
                    ''
                }

                <div class="project__gallery">
                ${
                        project.images.map(image =>
                        {
                            return `
                            <img src="${image}" alt="" class="project__gallery__item">
                            `  
                        }).join('')
                    }
                </div>
            </div>
        </div>
    </div>
        `

        this.close = document.querySelector('.close__project')
        this.projectCover = document.querySelector('.project__cover')
        this.projectCover.style.background = `url(${project.banner})`
        this.projectCover.style.backgroundPosition = 'center'
        this.projectCover.style.backgroundSize = 'cover'

        this.setAnimations(project)
        this.setListener()
    }

    setAnimations(project)
    {
        this.backgroundColor = '#ECECEC'
        this.revealUp = document.querySelector('.project__reveal__1')
        this.revealDown = document.querySelector('.project__reveal__2')
        this.content = document.querySelector('.project__landing__wrapper')

        this.title = document.querySelector('.project__title')
        this.coverWrap = document.querySelector('.project_r_cover')

        
        gsap.timeline({ ease: 'Sine.ease'})
        .addLabel('start', 0)
        .set('.project_content',
        {
            display:'none'
        })
        .set(this.content,
        {
            display:'none'
        })
        .set(this.revealUp,
        {
            y: '-100%',
            zIndex: 500
        })
        .set(this.revealDown,
        {
            y: '100%',
            zIndex: 500
        })
        .set('.close__project',
        {
            opacity:0
        })


        // Curtain closes
        .to(this.revealUp,
        {
            y: '0%',
            duration: .3
        },'start')
        .to(this.revealDown,
        {
            y: '0%',
            duration: .3
        },'start')

        .set('.project_content',
        {
            display:'block'
        })
        .set(this.content,
        {
            display:'block'
        })
        .set(this.coverWrap,
        {
            position: 'absolute',
            zIndex: 0,
            width: '100%',
            height:'100%',
            background: this.backgroundColor
        })
        .set(this.title,
        {
            y: '-80%',
            opacity: 0,
            color: project.color
        })
        .set('.project__infos__item',
        {
            y: '-40%',
            opacity:0,
            overflow: 'hidden'
        })
        .set('.project__infos__span',
        {
            y: '100%',
            opacity: 0
        })
        .set('.project__paragraph',
        {
            y: '100%',
        })
        .set('.project__sentence',
        {
            opacity:0,
        })

        // Curtain opens
        .to(this.revealUp,
        {
            y: '-100%',
            duration: .3,
            delay: .3,
            display:'none'
        })
        .to(this.revealDown,
        {
            y: '100%',
            duration: .3,
            display:'none'
        }, '<')

        .addLabel('content')

        /* Contenu du projet */

        // Image
        .to(this.coverWrap,
        {
            y: '-100%',
            display:'none'
        }, 'content')

        // titre
        .to(this.title,
        {
            y: 0,
            opacity: 1,
        }, 'content+.5')

        .to('.project__paragraph',
        {
            y: 0
        }, 'content+.5') 
        .to('.project__sentence',
        {
            opacity: 1,
            delay: .3,
            stagger: {amount: .3},
        }, 'content+.5')

        .to('.project__infos__item',
        {
            opacity: 1,
            y: 0,
        }, 'content+.5')
        
        .to('.project__infos__span',
        {
            y: 0,
            opacity: 1,
            delay: .3
        }, 'content+.5')
        .to('.close__project',
        {
            display:'flex',
            opacity:1
        })
    }

    unsetInstance()
    {
        this.isActive = false
        gsap.timeline()
        .set(this.revealUp,
        {
            display:'block',
            y: '-100%'
        })
        .set(this.revealDown,
        {
            display:'block',
            y: '100%'
        })
        .to(this.close,
        {
            opacity: 0,
            display:'none',
            duration: .2
        })
        .to(this.revealDown,
        {
            y: 0,
        })
        .to(this.revealUp,
        {
            y: 0,
        }, '<')
        .set('.project__wrapper',
        {
            innerHTML : ''
        })
        .to(this.revealUp,
        {
            y: '-100%'
        })
        .to(this.revealDown,
        {
            y:'100%'
        }, '<')

        if(this.sizes.width >= 960)
        {
            gsap.to(this.prevClose,
            {
                display: 'flex',
                opacity:1,
                delay: 1
            })
        }
    }
}
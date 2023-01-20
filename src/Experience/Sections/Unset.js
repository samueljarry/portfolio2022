import gsap from 'gsap'
import Experience from "../Experience";

export default class Unset
{
    constructor()
    {
        console.log('unset')
        this.experience = new Experience()

        this.close = document.querySelector('.unreveal__button')

        this.setListener()
    }

    setListener()
    {
        this.close.addEventListener('click', () => this.setInstance())
    }

    // Faire disparaître la section au clic
    setInstance()
    {
        switch(true)
        {
            case this.section == 'projects':
                this.experience.animations.navigation.slider.unset()
                break

            case this.section == 'about':
                this.experience.animations.navigation.about.unset()
                break

        }

        this.experience.animations.navigation.handleUnreveal()
    }

    // Récupérer la section à unset
    setSection(section)
    {
        this.section = section
    }
}
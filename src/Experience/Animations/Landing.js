import gsap from 'gsap'

export default class Landing
{
    constructor()
    {
        this.handleJarryAnimation()
    }

    handleJarryAnimation()
    {
        this.jarry = document.querySelectorAll('.jarry .letter')

        this.jarry.forEach(
            letter =>
            {
                gsap.timeline()
                    .set(letter,
                        {
                            fontVariationSettings: `"wght" 700, "wdth" 170`,
                        })
                    .to(letter,
                        {
                            fontVariationSettings: `"wght" 100, "wdth" 130`,
                            duration: 1,
                            ease: 'Power3.easeInOut',
                            delay: .3
                        })
            
            }
        )
    }
}
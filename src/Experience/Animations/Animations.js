import Experience from '../Experience'
import Cursor from './Cursor'
import Landing from './Landing'
import Navigation from './Navigation'

export default class Animations
{
    constructor()
    {
        this.experience = new Experience()

        this.cursor = new Cursor()
        this.landing = new Landing()
        this.navigation = new Navigation()
    }

    mousemove()
    {
        this.cursor.mousemove()
    }

    update()
    {
        this.navigation.update()
    }
}
import GUI from 'lil-gui'
export default class Debug
{
    constructor()
    {
        this.active = window.location.hash == '#debug'

        if(this.active)
        {
            this.gui = new GUI()
        }

        if(this.test)
        {
            if(!this.testFlag) window.location.reload
            this.testFlag = true
        }
    }
}
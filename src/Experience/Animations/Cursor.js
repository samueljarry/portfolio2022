export default class Cursor
{
    constructor()
    {
        this.instance = document.querySelector('.cursor')

        this.cursorSize = 25
    }

    mousemove()
    {
        window.addEventListener('mousemove', (e) =>
        {
            this.instance.style.left = (e.clientX + .5*this.cursorSize) + 'px'
            this.instance.style.top = (e.clientY + .5*this.cursorSize) + 'px'
        })
    }
}
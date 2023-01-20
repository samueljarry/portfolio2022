const projects = 
[
    {
        name: 'lasource',
        banner: 'images/projects/lasource/banner.jpg',
        url : 'https://mmi21c10.mmi-troyes.fr/lasource/lasource.php',
        images:
        [
            'images/projects/lasource/1.jpg',
            'images/projects/lasource/2.jpg'
        ],
        text:
        {
            roles:
            [
                'UX/UI',
                'Developer'
            ],
            date: 'January 2022',
            techs:
            [
                'PHP',
                'Javascript'
            ],
            description: [`Just a basic CRUD i've made when i started developing personal projects last year.`, `Buildt for a friend project`]
        }
    },
    {
        name: 's phone',
        banner: 'images/projects/phone/banner.jpg',
        url: 'https://phone-display.vercel.app/',
        images:
        [
            'images/projects/phone/1.png',
            'images/projects/phone/2.png',
        ],
        text:
        {
            roles:
            [
                'Developer',
                'UI/UX'
            ],
            date: 'July 2022',
            techs:
            [
                'Three.js',
                'Javascript'
            ],
            description: [`A website showcasing a fictional phone product page.`, `The use of Three.js permit a cool user interaction on the rotation and color of the 3D model`]
        }
    },
    {
        name: 'runner',
        banner: 'images/projects/runner/banner.jpg',
        color: '#ECECEC',
        images: 
        [
            'images/projects/runner/1.png',
            'images/projects/runner/2.png',
            'images/projects/runner/3.png'
        ],
        url: 'https://mmi21c10.mmi-troyes.fr/mmiverse/',
        text:
        {
            roles:
            [
                'UI Designer',
                'Developer'
            ],
            date: 'June 2022',
            techs:
            [
                'Three.js',
                'PHP'
            ],
            description: [`This website was made as a final project of my first year at MMI recreating the Chrome Dino game in 3D.`,`Besides game functionalities this project has a connexion system in order to display a scoreboard of the best scores.`]
        }
    },
    {
        name: 'Arte Lookbook',
        color:"#ECECEC",
        banner: 'images/projects/arte/banner.jpeg',
        images:
        [

        ],
        text:
        {
            roles:
            [
                'Developer'
            ],
            date: 'November 2022',
            techs:
            [
                'webGL',
                'Express.js'
            ],
            description: [`This project is still work in progress but might be over mid november`]
        }
    },
    {
        name: 'data visualization',
        banner: 'images/projects/dataviz/banner.png',
        url: 'https://sae303.vercel.app',
        style: '',
        images:
        [
            'images/projects/dataviz/1.png',
            'images/projects/dataviz/2.png',
            'images/projects/dataviz/3.png'
        ],
        text:
        {
            roles:
            [
                'UX/UI',
                'Developer'
            ],
            date: 'October 2022',
            techs:
            [
                'Charts.js',
                'ApexCharts'
            ],
            description: [`A school project where we were given a set of datas from a fictional agency. We had to build an interactive website based on an a data analysis to improve the online sales income of the company.`]
        }
    }
]

export default projects
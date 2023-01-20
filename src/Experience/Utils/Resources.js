import * as THREE from 'three'
import { TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.items = {}

        this.sources = sources
        this.toLoad = sources.length
        this.loaded = 0

        this.setLoader()
        this.startLoading()
    }

    setLoader()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new TextureLoader()
    }

    startLoading()
    {
        for(const source of this.sources)
        {
            if(source.type == 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type == 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}
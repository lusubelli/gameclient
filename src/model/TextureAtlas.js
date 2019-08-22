
export default class TextureAtlas {

    textures: {[key: string]: string};

    constructor() {
        this.textures = {};
    }

    loadTexture(key: string, source: string) {
        this.textures[key] = source;
    }

    getTexture(key: string): string {
        return this.textures[key];
    }

}
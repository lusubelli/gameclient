import TextureAtlas from "./TextureAtlas";
import SpriteDefinition from "./SpriteDefinition";
import AnimatedSpriteDefinition from "./AnimatedSpriteDefinition";

export default class SpriteAtlas {

    sprites: {[key: string]: SpriteDefinition | AnimatedSpriteDefinition};
    textureAtlas: TextureAtlas;

    constructor(textureAtlas: TextureAtlas) {
        this.textureAtlas = textureAtlas;
        this.sprites = {};
    }

    loadSprite(key: string, sprite: SpriteDefinition) {
        this.sprites[key] = sprite;
    }

    loadSprite(key: string, sprite: AnimatedSpriteDefinition) {
        this.sprites[key] = sprite;
    }

    getSprite(key: string, time: number = 0): SpriteDefinition {

        let def = this.sprites[key];

        if (def instanceof AnimatedSpriteDefinition) {
            return def.getSprite(time);
        }

        return def;
    }

}
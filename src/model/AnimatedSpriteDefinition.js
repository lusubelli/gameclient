import SpriteDefinition from "./SpriteDefinition";

export default class AnimatedSpriteDefinition {

    totalAnimationTime: number;
    sprites: SpriteDefinition[];

    constructor(totalAnimationTime: number, sprites: SpriteDefinition[]) {
        this.totalAnimationTime = totalAnimationTime;
        this.sprites = sprites;
    }

    getSprite(ellapsed: number): SpriteDefinition {
        let spriteCount = this.sprites.length; // 4
        let totalAnimationTime = this.totalAnimationTime; // 4000 (4s)
        let timePerSprite = totalAnimationTime / spriteCount; // 1000 (1s)
        let currentSpriteIndex = ellapsed % timePerSprite // ellapsed 1500 => 1
        return this.sprites[currentSpriteIndex];
    }

}
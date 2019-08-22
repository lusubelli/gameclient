export default class SpriteDefinition {

    texture: string;
    flipH: boolean = false;
    flipV: boolean = false;
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(texture: string, flipH: boolean = false, flipV: boolean = false, x: number, y: number, w: number, h: number) {
        this.texture = texture;
        this.flipH = flipH;
        this.flipV = flipV;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }


}
class Sprite {
    texture;
    coords;
    constructor(texture: number, coords: Coords) {
        this.texture = texture;
        this.coords = coords;
    }

}

class Coords {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

export default class GameMapper {

    textures = {
        "world": require('../../resources/world-sprite/world/world.png'),

        "mage-sw-any-0": require('../../resources/world-sprite/mage/sw/any/0.png'),
        "mage-se-any-0": require('../../resources/world-sprite/mage/se/any/0.png'),
        "mage-nw-any-0": require('../../resources/world-sprite/mage/nw/any/0.png'),
        "mage-ne-any-0": require('../../resources/world-sprite/mage/ne/any/0.png'),

        "mage-sw-walking-0": require('../../resources/world-sprite/mage/sw/walking/0.png'),
        "mage-sw-walking-1": require('../../resources/world-sprite/mage/sw/walking/1.png'),
        "mage-se-walking-0": require('../../resources/world-sprite/mage/se/walking/0.png'),
        "mage-se-walking-1": require('../../resources/world-sprite/mage/se/walking/1.png'),
        "mage-nw-walking-0": require('../../resources/world-sprite/mage/nw/walking/0.png'),
        "mage-nw-walking-1": require('../../resources/world-sprite/mage/nw/walking/1.png'),
        "mage-ne-walking-0": require('../../resources/world-sprite/mage/ne/walking/0.png'),
        "mage-ne-walking-1": require('../../resources/world-sprite/mage/ne/walking/1.png')
    };

    worldMap = new Map();

    toWorld(game) {

        this.worldMap.set("world", new Sprite(
            this.textures["world"],
            { x: 0, y: 0, w: game.world.width, h: game.world.height}));
        game.world.buildings.forEach(building => {
            let texture = this.calculateBuildingTexture(building);
            this.createOrUpdateSprite(building.id.id, {
                x: building.x,
                y: building.y,
                w: building.width,
                h: building.height
            }, this.textures[texture]);
        });
        game.world.units.forEach(unit => {
            let texture = this.calculateUnitTexture(unit);
            this.createOrUpdateSprite(unit.id.id, {
                x: unit.x,
                y: unit.y,
                w: unit.width,
                h: unit.height
            }, this.textures[texture]);
        });

        return {
            sprites: Array.from( this.worldMap.values() )
        };
    }

    createOrUpdateSprite(id, coords, texture) {
        let sprite: Sprite;
        if (this.worldMap.has(id)) {
            // update
            sprite = this.worldMap.get(id);
            sprite.texture = texture;
            sprite.coords = coords;
        } else {
            // create
            sprite = new Sprite(texture, coords)
            this.worldMap.set(id, sprite);
        }
    }

    calculateBuildingTexture(building) {
        return "mage-sw-walking-0";
    }

    calculateUnitTexture(unit) {
        var index = 0;
        let direction = this.direction(unit.direction);
        let action = unit.walking === true ? "walking" : "any";
        if (action === "walking") {
            index++;
            if (index === 2) {
                index = 0;
            }
        }
        return unit.type + "-" + direction + "-" + action + "-" + index;
    }

    direction(direction) {
        if (direction >= 0 && direction <= 90) {
            return "se";
        } else if (direction > 90 && direction <= 180) {
            return "sw";
        } else if (direction > 180 && direction <= 270) {
            return "nw";
        } else {
            return "ne";
        }
    }

}
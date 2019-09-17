import TexturedSprite from "./TexturedSprite";
import React from "react";

class Sprite {
    text;
    texture;
    coords;
    constructor(texture: number, coords: Coords, text: string = "") {
        this.text = text;
        this.texture = texture;
        this.coords = coords;
    }

    render(index) {
        return (<TexturedSprite key={index} text={this.text} texture={this.texture} coords={this.coords}/>)
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
        "building": require('../../resources/world-sprite/building.png'),
        "minerals": require('../../resources/world-sprite/minerals.png'),

        "worker-se-0": require('../../resources/world-sprite/mage/se/0.png'),
        "worker-s-0": require('../../resources/world-sprite/mage/s/0.png'),
        "worker-sw-0": require('../../resources/world-sprite/mage/sw/0.png'),
        "worker-w-0": require('../../resources/world-sprite/mage/w/0.png'),
        "worker-nw-0": require('../../resources/world-sprite/mage/nw/0.png'),
        "worker-n-0": require('../../resources/world-sprite/mage/n/0.png'),
        "worker-ne-0": require('../../resources/world-sprite/mage/ne/0.png'),
        "worker-e-0": require('../../resources/world-sprite/mage/e/0.png')
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
        game.world.resources.forEach(resource => {
            let texture = this.calculateResourceTexture(resource);
            this.createOrUpdateSprite(resource.id.id, {
                x: resource.x,
                y: resource.y,
                w: resource.width,
                h: resource.height
            }, this.textures[texture], resource.quantity);
        });
        game.world.units.forEach(unit => {
            let texture = this.calculateUnitTexture(unit);
            this.createOrUpdateSprite(unit.id.id, {
                x: unit.x,
                y: unit.y,
                w: unit.width,
                h: unit.height
            }, this.textures[texture], unit.mineral === true ? "1" : "0");
        });

        return {
            sprites: Array.from( this.worldMap.values() )
        };
    }

    createOrUpdateSprite(id, coords, texture, text) {
        let sprite: Sprite;
        if (this.worldMap.has(id)) {
            // update
            sprite = this.worldMap.get(id);
            sprite.texture = texture;
            sprite.text = text;
            sprite.coords = coords;
        } else {
            // create
            sprite = new Sprite(texture, coords, text)
            this.worldMap.set(id, sprite);
        }
    }

    calculateResourceTexture(resource) {
        return "minerals";
    }

    calculateBuildingTexture(building) {
        return "building";
    }

    calculateUnitTexture(unit) {
        let direction = this.direction(unit.azimuth);
        return unit.type + "-" + direction + "-0";
    }

    direction(direction) {
        if (direction > 22.5 && direction <= 67.5) {
            return "se";
        } else if (direction > 67.5 && direction <= 112.5) {
            return "e";
        } else if (direction > 112.5 && direction <= 157.5) {
            return "ne";
        } else if (direction > 157.5 && direction <= 202.5) {
            return "n";
        } else if (direction > 202.5 && direction <= 247.5) {
            return "nw";
        } else if (direction > 247.5 && direction <= 292.5) {
            return "w";
        }  else if (direction > 292.5 && direction <= 337.5) {
            return "sw";
        } else {
            return "s";
        }
    }

}
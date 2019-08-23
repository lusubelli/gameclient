import React from "react";
import {View} from "react-native";
import SpriteLayer from "./SpriteLayer";

export default class WorldRenderer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let layers = [];
        layers[0] = this.worldLayer(this.props.textures, this.props.world);
        layers[1] = this.unitLayer(this.props.textures, this.props.world);

        return (
            <View>
                {layers.map((layer, index) => {
                    return (<SpriteLayer key={index} sprites={layer.sprites}/>)
                })}
            </View>
        )

    }

    worldLayer(textures, world) {
        return {
            sprites: [
                {
                    texture: textures[world.level],
                    coords: world.coords
                }
            ]
        };
    }

    unitLayer(textures, world) {

        let sprites = [];
        world.units.forEach(unit => {
            let unitActionSpriteIndex = unit.action.totalTime % unit.action.currentTime;
            let unitTexture = unit.type + "-" +
                unit.direction + "-" +
                unit.action.name + "-" +
                (isNaN(unitActionSpriteIndex) ? 0 : unitActionSpriteIndex);
            sprites[sprites.length] = {
                texture: textures[unitTexture],
                coords: unit.coords
            }
        });

        return {sprites: sprites};
    }
}
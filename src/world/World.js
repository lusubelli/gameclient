import React from "react";
import {ImageBackground, ScrollView, View} from "react-native";
import Building from "./Building";
import Unit from "./Unit";

import TextureAtlas from "../model/TextureAtlas";
import SpriteAtlas from "../model/SpriteAtlas";
import AnimatedSpriteDefinition from "../model/AnimatedSpriteDefinition";
import SpriteDefinition from "../model/SpriteDefinition";

export default class World extends React.Component {

    textureAtlas: TextureAtlas;
    spriteAtlas: SpriteAtlas;

    constructor(props) {
        super(props)
        this.textureAtlas = new TextureAtlas();
        this.textureAtlas.loadTexture("A", require('../../resources/world/27445.png'));
        this.textureAtlas.loadTexture("cid", require('../../resources/world/32515.png'));

        this.spriteAtlas = new SpriteAtlas(this.textureAtlas);
        this.spriteAtlas.loadSprite("cid-sw", new SpriteDefinition("cid", false, false, 0, 0, 33, 49));
        this.spriteAtlas.loadSprite("cid-walking-sw", new AnimatedSpriteDefinition(4000, [
            new SpriteDefinition("cid", false, false, 0, 0, 33, 49)]));
    }

    render() {
        return (
            <ScrollView>
                <ScrollView horizontal>
                    <ImageBackground
                        source={this.textureAtlas.getTexture(this.props.world.texture)}
                        style={{width: this.props.world.width, height: this.props.world.height}}>
                        <View style={{width: this.props.world.width, height: this.props.world.height}}>
                            {this.props.world.buildings.map(building => {
                                return (<Building key={building.color} building={building}/>)
                            })}
                            {this.props.world.units.map(unit => {
                                return (<Unit key={unit.color} unit={unit} spriteAtlas={this.spriteAtlas}/>)
                            })}
                        </View>
                    </ImageBackground>
                </ScrollView>
            </ScrollView>
        )
    }

}
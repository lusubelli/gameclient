import React from "react";
import {View} from "react-native";
import Sprite from "./Sprite";

export default class SpriteLayer extends React.Component {

    render() {
        return (
            <View>
                {this.props.sprites.map((sprite, index) => {
                    return (<Sprite key={index} texture={sprite.texture} coords={sprite.coords}/>)
                })}
            </View>
        )

    }

}
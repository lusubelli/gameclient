import React from "react";
import {View} from "react-native";
import Sprite from "../gui/Sprite";

export default class SpriteRenderer extends React.Component {

    render() {

        let definition = {
            source: {
                texture: require('../../resources/world/32515.png'),
                w: 529,
                h: 295
            },
            x: 0,
            y: 0,
            w: 33,
            h: 49
        };

        let u = {
            x: 166,
            y: 55,
            w: 50,
            h: 50
        };

        let style = {
            flex: 1,
            flexDirection: 'column-reverse',
            position: "absolute",

            top: u.y,
            left: u.x,
            width: u.w,
            height: u.h,
            backgroundColor: 'red'
        };

        return (
            <Sprite definition={definition} data={u}>
                <View style={style}>

                </View>
            </Sprite>
        )

    }

}
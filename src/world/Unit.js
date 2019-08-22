import {Animated, View, Image, ImageBackground} from "react-native";
import React from "react";
import HealthBar from "./HealthBar";
import Sprite from "../gui/Sprite";

export default class Unit extends React.Component {

    constructor(props) {
        super(props)
        this.moveAnimation = new Animated.ValueXY({x: this.props.unit.x, y: this.props.unit.y})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.unit.x !== this.props.unit.x
            || prevProps.unit.y !== this.props.unit.y) {
            this.moveTo(this.props.unit.x, this.props.unit.y)
        }
    }

    moveTo(x, y) {
        Animated.spring(this.moveAnimation, {
            toValue: {x: x, y: y}
        }).start();
    }

    render() {

        let definition = {
            source: {
                texture: require('../../resources/world/32515.png'),
                w: 529,
                h: 295
            },
            flipV: false,
            flipH: true,
            x: 33,
            y: 0,
            w: 33,
            h: 49
        };

        let unit = this.props.unit;

        return (
            <Animated.View key={unit.color} style={[this.unitStyle(
                unit.color,
                unit.width,
                unit.height), this.moveAnimation.getLayout()]}>
                <Sprite definition={definition}>
                    <View>
                        <HealthBar width={unit.width} health={unit.health}/>
                    </View>
                </Sprite>
            </Animated.View>
        )
    }

    unitStyle = function (color, width, height) {
        return {
            flex: 1,
            flexDirection: 'column-reverse',
            position: "absolute",

            width: width,
            height: height,
            backgroundColor: color.toLowerCase()
        }
    }

}

const styles = {};
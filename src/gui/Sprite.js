import React from "react";
import {Animated, Image} from "react-native";

export default class Sprite extends React.Component {

    constructor(props) {
        super(props);
        this.moveAnimation = new Animated.ValueXY({x: this.props.coords.x, y: this.props.coords.y});
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("previous:");
        console.log(prevProps.coords);
        console.log("current:");
        console.log(this.props.coords);
        if (prevProps.coords.x !== this.props.coords.x
            || prevProps.coords.y !== this.props.coords.y) {
            this.moveTo(this.props.coords.x, this.props.coords.y)
        }
    }

    moveTo(x, y) {
        Animated.spring(this.moveAnimation, {
            toValue: {x: x, y: y}
        }).start();
    }

    render() {
        return (
            <Animated.Image source={this.props.texture} style={[this.styleFromCoords(this.props.coords), this.moveAnimation.getLayout()]}/>
        )
    }

    styleFromCoords(coords) {
        return {
            flex: 1,
            flexDirection: 'column-reverse',
            position: "absolute",

            top: coords.y,
            left: coords.x,
            width: coords.w,
            height: coords.h
        };
    }

}
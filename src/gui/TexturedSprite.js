import React from "react";
import {Animated, View, Easing, Image, ImageBackground, Text, StyleSheet} from "react-native";

export default class TexturedSprite extends React.Component {

    constructor(props) {
        super(props);
        this.moveAnimation = new Animated.ValueXY({x: this.props.coords.x, y: this.props.coords.y});
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.coords.x !== this.props.coords.x
            || prevProps.coords.y !== this.props.coords.y) {
            this.moveTo(this.props.coords.x, this.props.coords.y)
        }
    }

    moveTo(x, y) {
        Animated.timing(this.moveAnimation, {
            toValue: {x: x, y: y},
            duration: 250,
            easing: Easing.linear
        }).start();
    }

    render() {
        return (
            <Animated.View style={[this.styleFromCoords(this.props.coords), this.moveAnimation.getLayout()]}>
                <ImageBackground source={this.props.texture} style={[this.styleFromCoords(this.props.coords)]}>
                    <Text style={style.text}>
                        {this.props.text}
                    </Text>
                </ImageBackground>
            </Animated.View>
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


const style = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
import React from "react";
import {View, Image, ImageBackground} from "react-native";

export default class Sprite extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let source = this.props.definition.source.texture;

        let imageStyle = {
            top: -this.props.definition.y,
            left: -this.props.definition.x,
            width: this.props.definition.source.w,
            height: this.props.definition.source.h
        };

        let style = {
            top: -this.props.definition.y,
            left: -this.props.definition.x,
            width: this.props.definition.w,
            height: this.props.definition.h
        };

        console.log(style);
        console.log(imageStyle);

        return (
            <ImageBackground
                source={source}
                imageStyle={imageStyle}
                style={style}>
                    {this.props.children}
            </ImageBackground>
        )
    }

}
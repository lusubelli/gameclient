import React, { Component } from "react";
import { View, Animated } from "react-native";


export default class HealthBar extends Component {

    constructor(props) {
        super(props);
        this.healthAnimation = new Animated.Value(this.props.health);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.health !== this.props.health) {
            Animated.timing(this.healthAnimation, {
                duration: 200,
                toValue: this.props.health
            }).start();
        }
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={this.railStyle(this.props.width)}>
                        <Animated.View style={[this.getCurrentHealthStyles()]} />
                    </View>
                </View>
            </View>
        );
    }

    getCurrentHealthStyles = () => {

        let lifeMax = 500
        let borderSize = 2;
        let width = this.props.width - borderSize

        let animated_width = this.healthAnimation.interpolate({
            inputRange: [0, lifeMax / 2, lifeMax],
            outputRange: [0, width / 2, width]
        });

        let color_animation = this.healthAnimation.interpolate({
            inputRange: [0, 250, 500],
            outputRange: [ "#fa5252", "#fcc419", "#5db56d"]
        });

        return {
            width: animated_width,
            height: 8, // height of the health bar
            backgroundColor: color_animation
        };
    };

    railStyle = function(width) {
        return {
            width: width,
            height: 12,
            borderWidth: 2,
            borderRadius: 3,
            borderColor: "#000000",
            backgroundColor: "#616161"
        }
    }

}

const styles = {
    container: {
        height: 10,
        marginTop: 5
    }
};

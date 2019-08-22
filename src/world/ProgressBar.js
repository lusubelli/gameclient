import React, {Component} from "react";
import {View, Animated} from "react-native";


export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.progressionAnimation = new Animated.Value(this.props.progression);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.progression !== this.props.progression) {
            Animated.timing(this.progressionAnimation, {
                duration: 200,
                toValue: this.props.progression
            }).start();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={this.railStyle(this.props.width)}>
                    <Animated.View style={[this.getCurrentHealthStyles()]}/>
                </View>
            </View>
        );
    }

    getCurrentHealthStyles = () => {

        let lifeMax = 500
        let borderSize = 2;
        let width = this.props.width - borderSize

        let animated_width = this.progressionAnimation.interpolate({
            inputRange: [0, lifeMax / 2, lifeMax],
            outputRange: [0, width / 2, width]
        });

        let color_animation = this.progressionAnimation.interpolate({
            inputRange: [0, 250, 500],
            outputRange: ["#170ea2", "#170ea2", "#170ea2"]
        });

        return {
            width: animated_width,
            height: 8, // height of the health bar
            backgroundColor: color_animation
        };
    };

    railStyle = function (width) {
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
        height: 10
    }
};

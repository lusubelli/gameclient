import {Animated, StyleSheet, View} from "react-native";
import React from "react";

export default class Progression extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.inner,{width: this.props.progression +"%"},
                    ]}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 12,
        borderColor: "#000000",
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor:"#000000"
    },
    inner:{
        width: "100%",
        height: 8,
        backgroundColor:"#275a7f"
    }
});
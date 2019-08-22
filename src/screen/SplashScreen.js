import {StyleSheet, Text, View} from "react-native";
import React from "react";

export default class SplashScreen extends React.Component {
    render() {
        return (
            <View style={style.splashscreen}>
                <Text style={style.text}>
                    Welcome
                </Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    splashscreen: {
        position: 'absolute',
        textAlignVertical: 'center',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    text: {
        fontFamily: 'game-font',
        fontSize: 24,
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
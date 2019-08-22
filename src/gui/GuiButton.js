import React from "react";
import {ImageBackground, TouchableOpacity, View} from "react-native";

export default class GuiButton extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()}>
                <ImageBackground style={{width: '100%'}}
                                 imageStyle={{resizeMode: 'contain'}}
                                 source={require('../../resources/icons/button.png')}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 50}}>
                        {this.props.children}
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

}
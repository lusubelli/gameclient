import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Actions} from "react-native-router-flux";
import GuiButton from "../gui/GuiButton";
import Network from "../service/Network";

export default class MenuScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{width: '90%'}}>
                    <GuiButton onPress={() => this.soloGame()}>
                        <Text style={{
                            fontFamily: 'game-font',
                            fontSize: 24,
                        }}>Solo Game</Text>
                    </GuiButton>
                </View>
                <View style={{width: '90%'}}>
                    <GuiButton onPress={() => Actions.multiplayers()}>
                        <Text style={{
                            fontFamily: 'game-font',
                            fontSize: 24,
                        }}>Multi Payers Game</Text>
                    </GuiButton>
                </View>
                <View style={{width: '90%'}}>
                    <GuiButton onPress={() => Actions.parameters()}>
                        <Text style={{
                            fontFamily: 'game-font',
                            fontSize: 24,
                        }}>Parameters</Text>
                    </GuiButton>
                </View>
            </View>
        )
    }

    soloGame() {
        new Network().createGame('SOLO', 2)
            .then((game) => {
                Actions.game({
                    gameId: game.id
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    }
});
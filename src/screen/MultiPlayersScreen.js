import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native'

import {Actions} from 'react-native-router-flux';
import GuiButton from "../gui/GuiButton";
import Network from "../service/Network";

class GameResume extends React.Component {

    constructor(props) {
        super(props)
        this.state = {game: props.game}
    }

    render() {
        return (
            <View>
                <Text>{this.state.game.id}</Text>

                <View style={{width: '100%'}}>
                    <GuiButton onPress={() => Actions.game({ gameId: this.state.game.id })}>
                        <Text style={{
                            fontFamily: 'game-font',
                            fontSize: 24,
                        }}>Rejoindre</Text>
                    </GuiButton>
                </View>
            </View>
        )
    }
}

export default class MultiPlayersScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isCreatingGame: false };
    }

    componentDidMount() {
        return new Network()
            .listGames()
            .then((responseJson) => {
                this.setState({
                    games: responseJson
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    createGame() {
        new Network()
            .createGame("MULTI", 2)
            .then((game) => {
                Actions.game({
                    gameId: game.id
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isCreatingGame) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.games}
                    renderItem={({item}) => <GameResume game={item}/>}
                    keyExtractor={({id}) => id}
                />

                <View style={{width: '100%'}}>
                    <GuiButton onPress={() => this.createGame()}>
                        <Text style={{
                            fontFamily: 'game-font',
                            fontSize: 24,
                        }}>Creer</Text>
                    </GuiButton>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
});

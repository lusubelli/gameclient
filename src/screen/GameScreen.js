import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Actions} from "react-native-router-flux";
import World from "../world/World";
import Network from "../service/Network";

export default class GameScreen extends React.Component {

    color;

    constructor(props) {
        super(props)
        this.state = {
            gameId: props.gameId,
            game: {
                status: 'WAITING_FOR_OPPONENT',
                time: '00:00',
                world: {
                    buildings: []
                }
            }
        }

        setTimeout(() => {
                let game = {...this.state.game};
                game.status = 'INITIALIZING'
                this.setState({game})
                setTimeout(() => {
                    let game = {...this.state.game};
                    game.status = 'STARTING'
                    this.setState({game})
                    setTimeout(() => this.connection(props.gameId),
                        500
                    )
                }, 1000)
            },
            1000
        )

    }

    connection(gameId) {
        let network = new Network();
        network.joinGame(gameId, gameId);
        network.onmessage((message) => {
            if (message.action === "player-joined") {
                console.log("A player has joined the game");
                this.color = JSON.parse(message.payload);
            } else if (message.action === "player-left") {
                console.log("A player has left the game");
            } else if (message.action === "game-updated") {
                //console.log(JSON.parse(message.payload))
                this.setState({game: JSON.parse(message.payload)})
            } else {
                console.log("Je connais pas ce message " + message.action);
                console.log(message.message);
            }
        });
    }

    leftGame() {
        this.websocket.close()
        Actions.games()
    }

    render() {

        if (this.state.game.status !== 'STARTED') {
            let text;
            if (this.state.game.status === 'WAITING_FOR_OPPONENT'
                || this.state.game.status === 'INITIALIZING') {
                text = 'Ready For Battle ?';
            } else if (this.state.game.status === 'STARTING') {
                text = 'Fight !';
            } else {
                text = 'je ne connais pas cet etat';
            }
            return (
                <View style={styles.overlay}>
                    <Text style={styles.time}>{text}</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>

                <View style={styles.world}>
                    <World world={this.state.game.world} color={this.color}/>
                </View>

                <View style={{ position: 'absolute', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={{width: 20, height: 20, backgroundColor: '#000000', resizeMode: 'stretch'}}
                            source={require('../../resources/icons/minerals.png')}
                        />
                        <Text style={{fontFamily: 'game-font', fontSize: 24}}>{ this.state.game.world.players.filter(p => p.color === this.color)[0].minerals }</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={{width: 20, height: 20, backgroundColor: '#000000', resizeMode: 'stretch'}}
                            source={require('../../resources/icons/gas.png')}
                        />
                        <Text style={{fontFamily: 'game-font', fontSize: 24}}>{ this.state.game.world.players.filter(p => p.color === this.color)[0].gas }</Text>
                    </View>
                </View>

                <View style={styles.menu}>
                    <Text style={styles.time}>{this.state.game.time}</Text>
                    <TouchableOpacity onPress={() => this.leftGame()}>
                        <Image
                            style={styles.control}
                            source={require('../../resources/icons/menu.png')}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    overlay: {
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
    menu: {
        position: 'absolute',
        textAlign: 'center',
        top: '1%',
        right: '1%',
        bottom: '1%',
        height: '98%',
    },
    time: {
        fontFamily: 'game-font',
        fontSize: 24,
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    bigSeparator: {
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 20
    },
    separator: {
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 10
    },
    control: {
        justifyContent: 'flex-end',
        width: 70,
        height: 70,
        margin: 2
    }
});
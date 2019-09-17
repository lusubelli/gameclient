import React from "react";
import TexturedSprite from "./TexturedSprite";
import ReactNative, {Dimensions, StyleSheet, Animated, View, SafeAreaView, ScrollView, Text} from "react-native";
import Network from "../service/Network";
import GameMapper from "./GameMapper";


export default class GameRenderer extends React.Component {
    MAP_WIDTH: number = 1200;
    MAP_HEIGHT: number = 600;

    constructor(props) {
        super(props);

        let network = new Network();
        let gameMapper = new GameMapper();
        network.createGame("SOLO", 1)
            .then((game) => {
                network.joinGame(game.id);
                network.onmessage((message) => {
                    if (message.action === "game-updated") {
                        let newGame = JSON.parse(message.payload);
                        //console.log(newGame);
                        let world = gameMapper.toWorld(newGame);
                        //console.log(world);
                        this.setState({game: {world: world}})
                        this.scrollToItem(this.state.game.world.sprites[4])
                    }
                });
            });
        this.state = {
            game: {
                world: {
                    sprites: []
                }
            }
        };
    }


    scrollToItem(item) {
        if (item) {
            if (this.scrollViewHorizontal && this.scrollViewVertical) {
                let x = item.coords.x * 2 - (Dimensions.get('window').width / 2);
                let y = item.coords.y * 2 - (Dimensions.get('window').height / 2);
                console.log(x)
                this.scrollViewHorizontal.scrollTo({x: x, y: 0, animated: true});
                this.scrollViewVertical.scrollTo({x: 0, y: y, animated: true});
            }
        }
    }

    render() {
        return (

            <SafeAreaView>
                <ScrollView ref={ref => { this.scrollViewVertical = ref; }}>
                    <ScrollView horizontal ref={ref => { this.scrollViewHorizontal = ref; }}>
                        <View style={{ width: this.MAP_WIDTH, height: this.MAP_HEIGHT }}>
                            {this.state.game.world.sprites.map((sprite, index) => {
                                return sprite.render(index)
                            })}
                        </View>
                    </ScrollView>
                </ScrollView>
            </SafeAreaView>
        )
    }

}


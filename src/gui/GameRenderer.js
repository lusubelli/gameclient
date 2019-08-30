import React from "react";
import Sprite from "./Sprite";
import {Animated} from "react-native";
import Network from "../service/Network";
import GameMapper from "./GameMapper";


export default class GameRenderer extends React.Component {

    constructor(props) {
        super(props);

        let network = new Network();
        let gameMapper = new GameMapper();
        network.createGame("SOLO", 2)
            .then((game) => {
                network.joinGame(game.id);
                network.onmessage((message) => {
                    if (message.action === "game-updated") {
                        let newGame = JSON.parse(message.payload);
                        let world = gameMapper.toWorld(newGame);
                        this.setState({game: { world: world}})
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

    render() {
        return (
            <Animated.View>
                {this.state.game.world.sprites.map((sprite, index) => {
                    return (<Sprite key={index} texture={sprite.texture} coords={sprite.coords}/>)
                })}
            </Animated.View>
        )
    }

}
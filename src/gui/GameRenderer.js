import React from "react";
import Sprite from "./Sprite";
import {Animated, Easing, View} from "react-native";
import Network from "../service/Network";


export default class GameRenderer extends React.Component {

    constructor(props) {
        super(props);

        let textures = {
            "world": require('../../resources/world-sprite/world/world.png'),
            "mage-sw-walking-0": require('../../resources/world-sprite/mage/sw/walking/0.png'),
            "mage-sw-walking-1": require('../../resources/world-sprite/mage/sw/walking/1.png'),
            "mage-se-walking-0": require('../../resources/world-sprite/mage/se/walking/0.png'),
            "mage-se-walking-1": require('../../resources/world-sprite/mage/se/walking/1.png'),
            "mage-nw-walking-0": require('../../resources/world-sprite/mage/nw/walking/0.png'),
            "mage-nw-walking-1": require('../../resources/world-sprite/mage/nw/walking/1.png'),
            "mage-ne-walking-0": require('../../resources/world-sprite/mage/ne/walking/0.png'),
            "mage-ne-walking-1": require('../../resources/world-sprite/mage/ne/walking/1.png')
        };

        let network = new Network();
        network.createGame("SOLO", 2)
            .then((game) => {
                network.joinGame(game.id);
                network.onmessage((message) => {
                    if (message.action === "game-updated") {
                        let newGame = JSON.parse(message.payload);
                        console.log(newGame);
                        newGame.world.sprites.forEach(s => {
                            s.texture = textures[s.texture]
                        });
                        this.setState({game: newGame})
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
        this.shakingAnimation = new Animated.ValueXY({x: 0, y: 0})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.game.world.shaking !== this.state.game.world.shaking) {
            console.log("shaking");
            this.shake()
        }
    }

    render() {
        return (
            <Animated.View style={[ this.shakingAnimation.getLayout()]}>
                {this.state.game.world.sprites.map((sprite, index) => {
                    return (<Sprite key={index} texture={sprite.texture} coords={sprite.coords}/>)
                })}
            </Animated.View>
        )
    }



    shake() {
        Animated.loop(
            // Animation consists of a sequence of steps
            Animated.sequence([
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 10, y: 0},
                    duration: 150
                }),
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 10, y: 10},
                    duration: 150
                }),
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 0, y: 10},
                    duration: 150
                }),
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 10, y: 0},
                    duration: 150
                }),
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 10, y: 10},
                    duration: 150
                }),
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 10, y: 0},
                    duration: 150
                }),
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 0, y: 10},
                    duration: 150
                }),
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 10, y: 0},
                    duration: 150
                }),
                Animated.spring(this.shakingAnimation, {
                    toValue: {x: 0, y: 0},
                    duration: 150
                })
            ])
        ).start();
    }
}
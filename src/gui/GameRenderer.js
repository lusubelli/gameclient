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
                var index = 0;
                network.joinGame(game.id);
                network.onmessage((message) => {
                    if (message.action === "game-updated") {
                        let newGame = JSON.parse(message.payload);

                        let world = {
                            sprites: []
                        };

                        world.sprites[world.sprites.length] = {
                            texture: textures["world"],
                            coords: { x: 0, y: 0, w: newGame.world.width, h: newGame.world.height}
                        };

                        newGame.world.buildings.forEach(building => {
                            world.sprites[world.sprites.length] = {
                                texture: textures["mage-sw-walking-0"],
                                coords: { x: building.x, y: building.y, w: building.width, h: building.height}
                            }
                        });

                        newGame.world.units.forEach(unit => {
                            index++;
                            if(index === 2) {
                                index = 0;
                            }
                            let direction = this.direction(unit.direction);
                            let action = unit.walking === true ? "walking" : "any";
                            world.sprites[world.sprites.length] = {
                                texture: textures[unit.type + "-" + direction + "-" + action + "-" + index],
                                coords: { x: unit.x, y: unit.y, w: unit.width, h: unit.height}
                            }
                        });
                        console.log(world);
                        /*
                        newGame.world.sprites.forEach(s => {
                            s.texture = textures[s.texture + "-" + index]
                            index++;
                            if(index === 2) {
                                index = 0;
                            }
                        });*/
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

    direction(direction) {
        if (direction >= 0 && direction <= 90) {
            return "se";
        } else if (direction > 90 && direction <= 180) {
            return "sw";
        } else if (direction > 180 && direction <= 270) {
            return "nw";
        } else {
            return "ne";
        }
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
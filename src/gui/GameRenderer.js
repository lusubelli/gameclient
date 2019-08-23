import React from "react";
import WorldRenderer from "./WorldRenderer";


export default class GameRenderer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            world: {
                level: 'world',
                units: [
                    {
                        type: 'mage',
                        direction: 'sw',
                        action: {
                            name: 'walking',
                            totalTime: 0,
                            currentTime: 0
                        },
                        coords: {
                            x: 166,
                            y: 55,
                            w: 33,
                            h: 49
                        }
                    }
                ],
                coords: {
                    x: 0,
                    y: 0,
                    w: 1200,
                    h: 709
                }
            }
        };
        setInterval(() => {
            let world = {...this.state.world};
            world.units.forEach(unit => {
                unit.coords.x = this.randomMoveX(unit.coords.x, this.state.world.coords.w);
                unit.coords.y = this.randomMoveY(unit.coords.y, this.state.world.coords.h);
            });
            this.setState({world});
        }, 1000);
    }

    render() {

        let textures = {};
        textures["mage-sw-walking-0"] = require('../../resources/world-sprite/mage/sw/walking/0.png');
        textures["world"] = require('../../resources/world-sprite/world/world.png');

        return (<WorldRenderer textures={textures} world={this.state.world}/>)
    }

    randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    randomMoveX(x, maxX) {
        let range = [-50, 50];
        let newX = x + range[this.randomIntFromInterval(0, 1)];
        if (newX <= 0) {
            newX += 50;
        } else if (newX >= maxX) {
            newX -= 50;
        }
        return newX;
    }

    randomMoveY(y, maxY) {
        let range = [-50, 50];
        let newY = y + range[this.randomIntFromInterval(0, 1)];
        if (newY <= 0) {
            newY += 50;
        } else if (newY >= maxY) {
            newY -= 50;
        }
        return newY;
    }

}
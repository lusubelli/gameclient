import {Dimensions, View} from "react-native";
import React from "react";
import HealthBar from "./HealthBar";
import ProgressBar from "./ProgressBar";

export default class Building extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let building = this.props.building;

        return (
            <View key={building.color}  style={this.buildingStyle(
                building.color,
                building.x - (building.width/2),
                building.y - (building.height/2),
                building.width,
                building.height)}>
                <View>
                    <HealthBar width={building.width} health={building.health} />
                    <ProgressBar width={building.width} progression={building.progression} />
                </View>
            </View>
        )
    }

    buildingStyle = function(color, x, y, width, height) {
        return {
            flex: 1,
            flexDirection: 'column-reverse',
            position: "absolute",

            top: y,
            left: x,
            width: width,
            height: height,
            backgroundColor: color.toLowerCase()
        }
    }

}

const styles = {
};
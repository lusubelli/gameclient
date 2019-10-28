import React from 'react';

import {YellowBox} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import LoginScreen from "./src/screen/LoginScreen";
import MultiPlayersScreen from "./src/screen/MultiPlayersScreen";
import GameScreen from "./src/screen/GameScreen";
import Orientation from "react-native-orientation";
import SplashScreen from "./src/screen/SplashScreen";
import MenuScreen from "./src/screen/MenuScreen";
import ParametersScreen from "./src/screen/ParametersScreen";
import GameRenderer from "./src/gui/GameRenderer";

Orientation.lockToLandscape();

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result')
                },
                2000
            )
        );
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        /*const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.setState({loading: false});
        }*/
    }

    render() {
/*
        if (this.state.loading) {
            return <SplashScreen/>;
        }
*/
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="gamerenderer"
                        component={GameRenderer}
                        hideNavBar={true}/>
                    <Scene
                        key="login"
                        component={LoginScreen}
                        hideNavBar={true}/>
                    <Scene
                        key="menu"
                        component={MenuScreen}
                        hideNavBar={true}/>
                    <Scene
                        key="multiplayers"
                        component={MultiPlayersScreen}
                        hideNavBar={true}/>
                    <Scene
                        key="parameters"
                        component={ParametersScreen}
                        hideNavBar={true}/>
                    <Scene
                        key="game"
                        component={GameScreen}
                        hideNavBar={true}/>
                </Scene>
            </Router>
        )
    }
}

YellowBox.ignoreWarnings([
    'Warning: Async Storage has been extracted from react-native core',
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

export default App;

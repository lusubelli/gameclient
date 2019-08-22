import {StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {LoginManager} from 'react-native-fbsdk';
import React from "react";
import {Actions} from "react-native-router-flux";
import GuiButton from "../gui/GuiButton";
//import { GoogleSignin } from "react-native-google-signin";

export default class LoginScreen extends React.Component {

    componentDidMount() {
        //this.setupGoogleSignin();
    }

    async setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure({
                iosClientId: settings.iOSClientId,
                webClientId: settings.webClientId,
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();
            console.log(user);
        } catch (err) {
            console.log("Google signin error", err.code, err.message);
        }
    }

    anonymousLogin() {
        try {
            AsyncStorage.setItem('playerId', 'anonymous');
            Actions.menu()
        } catch (error) {
            // Error saving data
        }
    }

    facebookLogin() {
        LoginManager.logInWithPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login was cancelled');
                } else {
                    console.log('Login was successful with permissions: '
                        + result.grantedPermissions.toString());
                    try {
                        AsyncStorage.setItem('playerId', 'newbie');
                        Actions.games()
                    } catch (error) {
                        // Error saving data
                    }
                }
            },
            function (error) {
                console.log('Login failed with error: ' + error);
            }
        );

    }

    googleLogin() {
        GoogleSignin.signIn()
            .then((user) => {
                console.log(user);
                try {
                    AsyncStorage.setItem('playerId', 'newbie');
                    Actions.games()
                } catch (error) {
                    // Error saving data
                }
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{width: '90%'}}>
                    <GuiButton onPress={() => this.anonymousLogin()}>
                        <Text style={{
                            fontFamily: 'game-font',
                            fontSize: 24,
                        }}>Login with Facebook</Text>
                    </GuiButton>
                </View>
                <View style={{width: '90%'}}>
                    <GuiButton onPress={() => this.anonymousLogin()}>
                        <Text style={{
                            fontFamily: 'game-font',
                            fontSize: 24,
                        }}>Login with Google</Text>
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
    }
});
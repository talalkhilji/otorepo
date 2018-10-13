import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

const FBSDK = require('react-native-fbsdk');

const {
  LoginManager
} = FBSDK;

class SignOut extends Component {
  componentWillMount() {
    LoginManager.logOut();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    // AsyncStorage.clear().then(this.props.navigation.popToTop());
    AsyncStorage.setItem("isLogin",JSON.stringify(false));
    AsyncStorage.setItem("staySignedIn",JSON.stringify(false));

    this.props.navigation.popToTop()
  }
  render() {
    return (
      <View />
    );
  }
}
export default SignOut;

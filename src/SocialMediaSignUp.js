import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
const globleString = require('./language/languageText');

const strings = globleString.default.strings;

const icLogo = require('./Image/ic_logo.png');
const icFacebook = require('./Image/ic_facebook.png');
const icGooglePlus = require('./Image/ic_google_plus.png');
const FBSDK = require('react-native-fbsdk');
const {
  AccessToken,
  LoginManager
} = FBSDK;

export default class SocialMediaSignUp extends React.Component {
  state={
    socialUserId: '',
    socilaUserEmail: '',
    socialUserName: '',
    socilaUserMobile: '',
    socialMediaType: ''
  }
  componentDidMount() {
    GoogleSignin.configure();
  }

  onButtonPressfacebook() {
    LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(result => {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log('Login success with permissions');
        console.log(result);
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            console.log(data);
            // console.log(data.accessToken.toString());
            // const { accessToken } = data
            this.initUser(data.accessToken.toString())
            // this.onPressGetAPNSTokenBeforeFB(data.accessToken.toString());
          }
        );
      }
    },
    error => {
      console.log(error);
    });
  }
  openSignUpScreen(socialId, socialName, socialEmail, socialType) {
    const { navigate } = this.props.navigation;
    navigate('SignUp', { socialId, socialName, socialEmail, socialType });
  }
  initUser(token) {
    console.log('initUser call');
  axios({
      method: 'get',
      url: `https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=${token}`,
  })
  .then(responseFB => {
    console.log(responseFB);
    console.log(responseFB.data.id);
    console.log(responseFB.data.email);
    console.log(responseFB.data.name);
    console.log(responseFB.data.mobile);
    // response.json()
    this.setState({ socilaUserId: responseFB.data.id });
    this.setState({ socialUserName: responseFB.data.name });
    this.setState({ socilaUserEmail: responseFB.data.email });
    this.setState({ socialMediaType: 'facebook' });
    this.openSignUpScreen(this.state.socilaUserId, this.state.socialUserName, this.state.socilaUserEmail, this.state.socialMediaType)
  })
  .catch(error => {
    console.log(error);
    // reject('ERROR GETTING DATA FROM FACEBOOK')
  })
}
  googleAuth() {
    GoogleSignin.signIn()
    .then((responseGoogle) => {
      console.log(responseGoogle.user);
      console.log(responseGoogle.user.email);
      console.log(responseGoogle.user.id);
      console.log(responseGoogle.user.name);
      this.setState({ socilaUserId: responseGoogle.user.id });
      this.setState({ socialUserName: responseGoogle.user.name });
      this.setState({ socilaUserEmail: responseGoogle.user.email });
      this.setState({ socialMediaType: 'google-plus' });
      this.openSignUpScreen(this.state.socilaUserId, this.state.socialUserName, this.state.socilaUserEmail, this.state.socialMediaType)
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={icLogo} style={{ height: 85, width: 85 }} />
        </View>
        <View style={styles.bottomContainer}>
          <View style={[styles.textContainer, { justifyContent: 'flex-end', fontFamily: 'Montserrat-Bold' }]}>
            <Text style={{ color: '#42B6D2', fontSize: 13 }}>
              {strings.signUpWith}
            </Text>
          </View>
          <TouchableOpacity onPress={this.onButtonPressfacebook.bind(this)}>
            <View style={[styles.btnContainer, { backgroundColor: '#447CC6', marginTop: 30, }]}>
            <Image source={icFacebook} style={styles.socialIconContainer} />
            <Text style={styles.facebookText}>
              Facebook
            </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.googleAuth.bind(this)}>
            <View style={[styles.btnContainer, { backgroundColor: '#E06C5C', marginTop: 30, }]}>
            <Image source={icGooglePlus} style={styles.socialIconContainer} />
            <Text style={styles.facebookText}>
              Google
            </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <View style={[styles.textContainer, { justifyContent: 'flex-start', fontFamily: 'SF-Pro-Display-Medium' }]}>
            <TouchableOpacity onPress={() => this.openSignUpScreen('', '', '', '')}>
              <Text style={{ color: '#828282', fontSize: 13, }}>
                {strings.skipThisStepMessage}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialIconContainer: {
    width: 25,
    height: 25,
  },
  btnContainer: {
    flexDirection: 'row',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
    },
  facebookText: {
      color: '#fff',
      textAlign: 'center',
      marginLeft: 10,
      fontFamily: 'Roboto-Regular'
  },
});

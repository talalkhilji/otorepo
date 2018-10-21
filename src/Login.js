import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { Input, AlbumDetail, AlbumDetailSection, Button, Loader } from './common';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import CheckBox from 'react-native-check-box';
import TouchID from 'react-native-touch-id'

const icLogo = require('./Image/ic_logo.png');
const icCheck = require('./Image/ic_check.png');
const icTouch = require('./Image/ic_touch.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;
const optionalConfigObject = {
  title: "Authentication Required", // Android
  color: "#e00606", // Android
  sensorDescription: "Touch sensor", // Android
  cancelText: "Cancel", // Android
  fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
  unifiedErrors: false // use unified error messages (default false)
}
export default class Login extends React.Component {
  state = {
      email: '',
      password: '',
      loading: false,
      staySignedIn: false,
      isVisibleTouchId: false
  }
  componentWillMount(){
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        console.log("biometryType",biometryType);
          if (biometryType) {
            this.setState({ isVisibleTouchId : true});
          }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }

  openBasicScreen() {
     const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
     if (this.state.email.length === 0) {
        Toast.show('Please enter email.');
     } else if (!re.test(this.state.email)) {
        Toast.show('Please enter valid email address.');
     } else if (this.state.password.length === 0) {
        Toast.show('Please enter password.');
     } else {
       this.setState({ loading: true });
       const payload = {
         // email: 'shahidsarvani@hotmail.com',
         // password: 'tzz6xa',
         email: this.state.email.toLowerCase(),
         password: this.state.password,
       };
       console.log(payload);
       axios({
        method: 'post',
        url: 'signin',
        data: JSON.stringify(payload)
      })
      .then(response => {
        console.log(response);
        this.setState({ loading: false })
        console.log(response.data.status);
        setTimeout(function(){
          Toast.show(response.data.message);
        }, 2000);
        if (response.data.status == 1) {
          AsyncStorage.setItem('staySignedIn', JSON.stringify(this.state.staySignedIn));
          AsyncStorage.setItem('userData', JSON.stringify(response.data.contents[0]));
          AsyncStorage.setItem("isLogin",JSON.stringify(true));
          AsyncStorage.setItem("isTouchID",JSON.stringify(false));

          AsyncStorage.getItem('userData', (err, result) => {
              console.log(JSON.parse(result).id);
          });
          const { navigate } = this.props.navigation;
          navigate('Home');
        }
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log(error.response);
        setTimeout(function(){
          Toast.show(error.response.data.message);
        }, 2000);
      });
     }
  }
  openForgotPasswordScreen() {
     const { navigate } = this.props.navigation;
     navigate('ForgotPassword');
  }
  openSocialMediaSignUpScreen() {
     const { navigate } = this.props.navigation;
     navigate('SignUp');
  }

  pressHandler() {
    TouchID.authenticate('Place your finger on the fingerprint scanner to login', optionalConfigObject)
      .then(success => {
        // AlertIOS.alert('Authenticated Successfully');

        AsyncStorage.getItem('isTouchID', (err, result) => {
            // this.setState({ userName: `${JSON.parse(result).first_name} ${JSON.parse(result).last_name}` });
            // console.log(this.state.userName);

            // console.log("result",result);
            if (JSON.parse(result)) {
              AsyncStorage.setItem('staySignedIn', JSON.stringify(this.state.staySignedIn));
              const { navigate } = this.props.navigation;
              navigate('Basic');
            }else {
                Toast.show('First time you need to login OR not enable touch id');
            }
        });

      })
      .catch(error => {
        // AlertIOS.alert('Authentication Failed');
        Toast.show('Authentication Failed');
        console.log("error",error);
      });
  }


  render() {
    const { container, logoContainer, forgotPasswordContainer, textContainer, touchContainer, transperantContainer, transperantButtonText } = styles;

    return (
      <View style={container}>
        <Loader loading={this.state.loading} message='Please wait..' />
          <ScrollView style={{ flex: 1, }}>
            <View style={logoContainer}>
              <Image source={icLogo} style={{ width: 84, height: 82 }} />
            </View>
            <View style={{ flex: 4 }}>
              <AlbumDetail>
                <AlbumDetailSection>
                  <Input
                    placeholder={strings.email}
                    onChangeText={email => this.setState({ email })}
                    autoCapitalize="none"
                  />
                </AlbumDetailSection>
                <AlbumDetailSection>
                  <Input
                    placeholder={strings.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry={true}
                  />
                </AlbumDetailSection>
              </AlbumDetail>
              <View style={forgotPasswordContainer}>
                <CheckBox
                  style={{flex: 1 }}
                  checkedCheckBoxColor	='#2B95B3'
                  uncheckedCheckBoxColor='#E9ECF2'
                  onClick={()=>{
                    this.setState({ staySignedIn:!this.state.staySignedIn });
                  }}
                  isChecked={this.state.staySignedIn}
                  rightText={strings.staySignedIn}
                  rightTextStyle={textContainer}
                />
                <TouchableOpacity onPress={this.openForgotPasswordScreen.bind(this)}>
                 <Text style={textContainer}> {strings.forgotPassword} </Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 20, paddingLeft: 40, paddingRight: 40 }}>
                <Button
                  label={strings.login}
                  onPress={this.openBasicScreen.bind(this)}
                />
              </View>
              {this.state.isVisibleTouchId && (
                <TouchableOpacity onPress={() => this.pressHandler()} >
                <View style={touchContainer}>
                  <Image source={icTouch} />
                  <Text style={[textContainer, { padding: 10 }]}>{strings.loginWithTouchID}</Text>
                </View>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.openSocialMediaSignUpScreen.bind(this)}>
            <View style={[transperantContainer, { margin: 25 }]}>
                <Text style={[transperantButtonText, { color: '#707070', marginRight: 10 }]} >{strings.newHere}</Text>
                <Text style={[transperantButtonText, { marginLeft: 10, fontSize: 14 }]} >{strings.signUp}</Text>
            </View>
            </TouchableOpacity>
          </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0
  },
  textContainer: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#707070'
  },
  touchContainer: {
    padding: 20,
    alignItems: 'center'
  },
  transperantContainer: {
    flexDirection: 'row',
    marginLeft: 40,
    marginRight: 40,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#42B6D2',
    borderWidth: 1,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  transperantButtonText: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: '#42B6D2',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  }
});

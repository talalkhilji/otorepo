import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, AlbumDetail, AlbumDetailSection, Button, Loader } from './common';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const globleString = require('./language/languageText');

const strings = globleString.default.strings;

const icLogo = require('./Image/ic_logo.png');
const icCheck = require('./Image/ic_check.png');
const icBack = require('./Image/ic_back.png');

export default class ForgotPassword extends React.Component {
  state = {
      email: '',
      loading: false
  }
  openLoginScreen() {


     var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
     if (this.state.email.length == 0) {
        Toast.show('Please enter email.');
     }else if (!re.test(this.state.email)) {
        Toast.show('Please enter valid email address.');
     }else {
       this.setState({ loading: true });
       const payload = {
         email: this.state.email,
       };
       axios({
        method: 'post',
        url: 'signin',
        data: JSON.stringify(payload)
      })
      .then(response => {
        this.setState({ loading: false })
        console.log(response.data.message);
        setTimeout(function(){
          Toast.show(''+response.data.message);
          const { navigate } = this.props.navigation;
          navigate('Login');
        }, 2000);
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log(error.response.data);
        setTimeout(function(){
          Toast.show(error.response.data.message);
        }, 2000);

        // this.setState({ errorMsg: error.toString(), loading: false });
      });
     }
 }
  render() {
    const { container, logoContainer, textContainer, transperantButtonText } = styles;
    return (
      <View style={container}>
        <Loader loading={this.state.loading} message='Please wait..' />
        <View style={logoContainer}>
          <Image source={icLogo} style={{ width: 84, height: 82 }} />
        </View>
        <View style={{ flex: 2, justifyContent: 'space-between' }}>
          <Text style={[textContainer, { marginLeft: 10, }]}>{strings.forgotPasswordMessage}</Text>
          <AlbumDetail>

            <AlbumDetailSection>
              <Input
                placeholder={strings.email}
                onChangeText={email => this.setState({ email })}
              />
            </AlbumDetailSection>
          </AlbumDetail>
          <View style={{ padding: 20, paddingLeft: 40, paddingRight: 40 }}>
            <Button
              label={strings.resetPassword}
              onPress={this.openLoginScreen.bind(this)}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image source={icBack} style={{ tintColor: '#828282', height: 15, width: 20 }} />
              <Text style={[transperantButtonText, { color: '#828282', marginLeft: 10, fontSize: 14 }]} >{strings.back}</Text>
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
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#707070',
    textAlign: 'center'
  },
  transperantButtonText: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: '#42B6D2',
  }
});

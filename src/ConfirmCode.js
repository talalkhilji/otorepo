import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AlbumDetail, AlbumDetailSection, Input, Button, Loader } from './common';
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const imgLogo = require('./Image/ic_logo.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class ConfirmCode extends React.Component {
  state = {
    code: '',
    loading: false,
  }
  openBasicScreen() {
      console.log(this.state.code);
      if (this.state.code.length < 4) {
         Toast.show('Need to enter 4 digit verification code.');
      }else {
        this.setState({ loading: true });
        const payload = {
          smscode: this.state.code,
        };
      axios({
         method: 'post',
         url: 'smscode',
         data: JSON.stringify(payload)
       })
       .then(response => {
         this.setState({ loading: false })
         setTimeout(function(){
           Toast.show(''+response.data.message);
         }, 2000);

         if (parseInt(response.data.status == 1)) {
           const { navigate } = this.props.navigation;
           navigate('Home');
         }
       })
       .catch(error => {
         this.setState({ loading: false })
         console.log(error.response.data);
         setTimeout(function(){
           Toast.show(error.response.data.message);
         }, 2000);
       });
      }
    }
  render() {
    const { imageViewContainer, imageContainer, secondViewContainer, textContainer, thirdContainer, resendText } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <Loader loading={this.state.loading} message='Please wait..' />
        <View style={imageViewContainer}>
            <Image source={imgLogo} style={imageContainer} />
        </View>
        <View style={secondViewContainer}>
          <Text style={textContainer}>{strings.enterVerificationCode}</Text>
          <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
            <CodeInput
              ref="codeInputRef1"
              keyboardType="numeric"
              codeLength={4}
              secureTextEntry
              className={'border-b'}
              space={10}
              activeColor='rgba(185, 190, 209, 1)'
              inactiveColor='rgba(185, 190, 209, 1.3)'
              autoFocus={false}
              ignoreCase={true}
              size={70}
              inputPosition='left'
              onFulfill={(code) => this.setState({ code })}
            />
          </View>
        </View>
        <View style={thirdContainer}>
          <Button
            label={strings.confirm}
            onPress={this.openBasicScreen.bind(this)}
          />
          <Text style={resendText}>{strings.resendCode}</Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  imageViewContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
      height: 82,
      width: 84,
  },
  secondViewContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textContainer: {
    color: '#42B6D2',
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
  },
  thirdContainer: {
    flex: 2,
    margin: 20,
    justifyContent: 'center'
  },
  resendText: {
    color: '#707070',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 30,
    fontFamily: 'Montserrat-Regular',
  },
});

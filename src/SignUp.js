import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, Linking } from 'react-native';
import { AlbumDetail, AlbumDetailSection, Input, CustomStatusBar, Button, Loader } from './common';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';

const icBack = require('./Image/ic_back.png');
const icDownArrow = require('./Image/ic_down_arrow.png');
const icQuestionMark = require('./Image/ic_question.png');
const globleString = require('./language/languageText');

const strings = globleString.default.strings;
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
  }
  state = {
    socialId: '',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    city: null,
    invitationCode: '',
    socialType: '',
    loading: false,
    items: [
              {
                label: 'Abu Dhabi',
                value: 'Abu Dhabi',
              },
              {
                label: 'Ajman',
                value: 'Ajman',
              },
              {
                label: 'Dubai',
                value: 'Dubai',
              },
              {
                label: 'Fujairah',
                value: 'Fujairah',
              },
              {
                label: 'Ras Al Khaimah',
                value: 'Ras Al Khaimah',
              },
              {
                label: 'Sharjah',
                value: 'Sharjah',
              },
              {
                label: 'Umm al-Quwain',
                value: 'Umm al-Quwain',
              },
          ],
  }
  componentDidMount() {
    /*this.setState({ socialId: this.props.navigation.state.params.socialId });
    this.setState({ socialId: this.props.navigation.state.params.socialName });
    this.setState({ socialId: this.props.navigation.state.params.socialEmail });
    this.setState({ socialType: this.props.navigation.state.params.socialType });*/
  }
  openConfirmCodeScreen() {
    const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    console.log(this.state.socialId);
    console.log(this.state.socialType);
    if (this.state.firstName.length === 0) {
       Toast.show('Please enter first name.');
    } else if (this.state.lastName.length === 0) {
       Toast.show('Please enter last name.');
    } else if (this.state.mobile.length === 0) {
       Toast.show('Please enter mobile number.');
    } else if (this.state.email.length === 0) {
       Toast.show('Please enter email.');
    } else if (!re.test(this.state.email)) {
       Toast.show('Please enter valid email address.');
    }else if (this.state.password.length === 0) {
       Toast.show('Please enter password.');
    }else if (this.state.password.length < 6) {
       Toast.show('Entered password must be 6 chars long.');
    }else if (this.state.city === null) {
       Toast.show('Please select city.');
    } else {
      this.setState({ loading: true });
      const payload = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        mobile_no: this.state.mobile,
        city: this.state.city,
        invitation_code: this.state.invitationCode,
        social_media_account_id: this.state.socialId,
        social_media_type: this.state.socialType
      };

      console.log(JSON.stringify(payload));
      axios({
       method: 'post',
       url: 'signup',
       data: JSON.stringify(payload)
     })
     .then(response => {
       console.log(response.data);
       this.setState({ loading: false })
       setTimeout(function(){
         Toast.show(response.data.message);
       }, 2000);

       if (parseInt(response.data.status == 1)) {
         AsyncStorage.setItem('userData', JSON.stringify(response.data.contents[0]));
         const { navigate } = this.props.navigation;
         navigate('ConfirmCode');
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
  const { mainContainer, privacyText } = styles;
    return (
      <View style={mainContainer}>
        <Loader loading={this.state.loading} message='Please wait..' />
        <CustomStatusBar
          firstIcon={icBack}
          title='SIGN UP'
          onPressFirstIcon={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <AlbumDetail>
            <AlbumDetailSection>
              <Input
                placeholder={strings.firstName}
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
              />
              <Input
                placeholder={strings.lastName}
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
              />
            </AlbumDetailSection>
            <AlbumDetailSection>
              <Input
                placeholder={strings.mobile}
                onChangeText={mobile => this.setState({ mobile })}
                keyboardType='phone-pad'
                value={this.state.mobile}
              />
            </AlbumDetailSection>
            <AlbumDetailSection>
              <Input
                placeholder={strings.email}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                keyboardType='email-address'
              />
            </AlbumDetailSection>
            <AlbumDetailSection>
              <Input
                placeholder={strings.password}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                secureTextEntry={true}
              />
            </AlbumDetailSection>
            <RNPickerSelect
              placeholder={{
                  label: 'SELECT A CITY..',
                  value: null,
              }}
              placeholderTextColor='#666666'
              items={this.state.items}
              onValueChange={(value) => {
                  this.setState({
                      city: value,
                  });
              }}
            >
              <AlbumDetailSection>
                <Input
                  imageSource={icDownArrow}
                  placeholder={strings.city}
                  value={this.state.city}
                />
              </AlbumDetailSection>
            </RNPickerSelect>
            <AlbumDetailSection>
              <Input
                imageSource={icQuestionMark}
                placeholder={strings.invitationCode}
                onChangeText={invitationCode => this.setState({ invitationCode })}
              />
            </AlbumDetailSection>
            <View style={{ margin: 20 }}>
              <Text style={privacyText}>{strings.bySigningUpMessage} <Text onPress={() => {  Linking.openURL('https://www.otoserv.ae/privacy-policy/').catch(()=>alert('Something went wrong')) }} style={[privacyText, { textDecorationLine: 'underline' }]} > {strings.TermsPrivacyPolicy} </Text></Text>
            </View>
            <View>
              <Button label={strings.signUpSmall} onPress={this.openConfirmCodeScreen.bind(this)} />
            </View>
          </AlbumDetail>
        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  privacyText: {
    color: '#707070',
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  }

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 11,
        padding: 10,
        paddingLeft: 15,
        fontFamily: 'Montserrat-Bold',
        color: '#666666',
    },
    inputAndroid :  {
      fontSize: 11,
      padding: 10,
      paddingLeft: 15,
      fontFamily: 'Montserrat-Bold',
      color: '#666666',
    }
});

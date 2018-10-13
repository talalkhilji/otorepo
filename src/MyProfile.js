import React from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import { AlbumDetail, AlbumDetailSection, Input, CustomStatusBar, Button, Loader } from './common'
import axios from 'axios';
import CheckBox from 'react-native-check-box';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';

const icEditProfile = require('./Image/ic_edit_profile.png');
const icDownArrow = require('./Image/ic_down_arrow.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class MyProfile extends React.Component {
  state = {
    notEditable : true,
    userId: '',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    city: null,
    invitationCode: '',
    loading: false,
    isTouchID: false,
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

componentWillMount() {
  AsyncStorage.getItem('isTouchID', (err, result) => {
    this.setState({ isTouchID: JSON.parse(result) });
    console.log("touch_id",this.state.isTouchID);
  });
  AsyncStorage.getItem('userData', (err, result) => {
      console.log(JSON.parse(result).id);
      this.setState({ userId: JSON.parse(result).id });
      this.setState({ firstName: JSON.parse(result).first_name });
      this.setState({ lastName: JSON.parse(result).last_name });
      this.setState({ email: JSON.parse(result).email });
      this.setState({ mobile: JSON.parse(result).mobile_no });
      this.setState({ city: JSON.parse(result).city });
  });
}
profileEdit(){
  if (this.state.firstName.length == 0) {
     Toast.show('Please enter first name.');
  }else if (this.state.lastName.length == 0) {
     Toast.show('Please enter last name.');
  }else if (this.state.city == null) {
     Toast.show('Please select city.');
  }else {
    this.setState({ loading: true });
    const payload = {
      user_id: this.state.userId,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      mobile_no: this.state.mobile,
      city: this.state.city,
      invitation_code: this.state.invitationCode,
    };
    console.log(payload);
    axios({
     method: 'post',
     url: 'profile',
     data: JSON.stringify(payload)
   })
   .then(response => {
     console.log(response.data);
     this.setState({ loading: false })
     setTimeout(function(){
       Toast.show(''+response.data.message);
     }, 2000);

     if (response.data.status == 1) {
       AsyncStorage.setItem('userData', JSON.stringify(response.data.contents[0]));

       AsyncStorage.setItem('isTouchID', JSON.stringify(this.state.isTouchID));

       componentWillMount();
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
console.log("touch_id",this.state.isTouchID);
  const { mainContainer, privacyText } = styles;
    return (
      <View style={mainContainer}>
        <Loader loading={this.state.loading} message='Please wait..' />
        <CustomStatusBar
          title='MY PROFILE'
          secondIcon={icEditProfile}
          onPressSecondIcon={() => this.setState({ notEditable: !this.state.notEditable})}
        />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <ScrollView >
            <AlbumDetail>
              <AlbumDetailSection>
                <Input
                  placeholder='FIRST NAME'
                  inputTitle={strings.firstName}
                  onChangeText={firstName => this.setState({ firstName })}
                  value={this.state.firstName}
                  notEditable={this.state.notEditable}
                />
              </AlbumDetailSection>
              <AlbumDetailSection>
                <Input
                  placeholder='LAST NAME'
                  inputTitle={strings.lastName}
                  onChangeText={lastName => this.setState({ lastName })}
                  value={this.state.lastName}
                  notEditable={this.state.notEditable}
                />
              </AlbumDetailSection>
              <AlbumDetailSection>
                <Input
                  placeholder='EMAIL'
                  inputTitle={strings.email}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  notEditable={true}
                />
              </AlbumDetailSection>
              <AlbumDetailSection>
                <Input
                  placeholder='MOBILE'
                  inputTitle={strings.mobile}
                  onChangeText={mobile => this.setState({ mobile })}
                  value={this.state.mobile}
                  notEditable={true}
                />
              </AlbumDetailSection>

              <RNPickerSelect
                placeholder={{
                    label: 'SELECT A CITY..',
                    value: null,
                }}
                placeholderTextColor= '#666666'
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
                    placeholder='CITY'
                    inputTitle={strings.city}
                    onChangeText={city => this.setState({ city })}
                    value={this.state.city}
                    notEditable={this.state.notEditable}
                  />
                </AlbumDetailSection>
              </RNPickerSelect>
              <View style={styles.forgotPasswordContainer}>
                <CheckBox
                  style={{flex: 1 }}
                  checkedCheckBoxColor	='#2B95B3'
                  uncheckedCheckBoxColor='#E9ECF2'
                  onClick={()=>{
                    this.setState({ isTouchID:!this.state.isTouchID });
                  }}
                  isChecked={this.state.isTouchID}
                  rightText={strings.loginWithTouchID}
                  rightTextStyle={styles.textContainer}
                />
                </View>
            </AlbumDetail>
          </ScrollView>
          <View style={{ padding: 20 }}>
            <Button
              label={strings.save}
              onPress={() => this.profileEdit()}
            />
          </View>
        </View>
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

});

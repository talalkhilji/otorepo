import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomStatusBar, Button } from './common';
import GSideMenu from './GSideMenu';

const icLogo = require('./Image/ic_logo_1.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class Contact extends React.Component {

openAddNewCardScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewCard');
}
render() {
  const { mainContainer, textContainer } = styles;
  const { navigate } = this.props.navigation;
    return (
      <GSideMenu
        title='CONTACT'
        navigation={this.props.navigation}
      >
        <View style={mainContainer}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={icLogo} />
            </View>
            <View style={{ flex: 5, justifyContent: 'space-between', padding: 20 }}>
              <Text style={textContainer} >{strings.forAnyInquiryMessage}</Text>
              <View>
                <Button label='support@otoserv.ae' />
                <Button label='800 OTO' />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => navigate('TermsAndConditions')}>
                <Text style={textContainer} >{strings.tearmsCondition}</Text>
              </TouchableOpacity>  
              <Text style={textContainer} >|</Text>
              <TouchableOpacity onPress={() => navigate('PrivacyPolicy')}>
                <Text style={textContainer} >{strings.privacyPolicy}</Text>
              </TouchableOpacity>  
            </View>

          </View>
        </View>
        
      </GSideMenu>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  colorDot: {
    backgroundColor: 'red',
    width: 44,
   height: 44,
   borderRadius: 44 / 2
 },
 textContainer: {
   padding: 10,
   fontSize: 13,
   fontFamily: 'Montserrat-Regular',
   color: '#5F7290',
   textAlign: 'center'
  }

});

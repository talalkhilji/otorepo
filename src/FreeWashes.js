import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CustomStatusBar, Button } from './common'

const icFreeWash = require('./Image/ic_free_wash.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class FreeWashes extends React.Component {

render() {
  const { mainContainer } = styles;
    return (
      <View style={mainContainer}>
        <CustomStatusBar
          title='FREE WASHES'
        />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ flex: 1, justifyContent: 'center', marginLeft: 50, marginRight: 50, }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }} >
              <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'Montserrat-Bold', color: '#5F7290', padding: 5 }}>{strings.getFreeWashes}</Text>
              <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Montserrat-Regular', color: '#5F7290', padding: 5 }}>{strings.inviteFriendMessage}</Text>
            </View>
            <View style={{ marginTop: 50, marginBottom: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={icFreeWash} />
            </View>
            <View style={{ marginLeft: 30, marginRight: 30, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 11, fontFamily: 'Montserrat-Bold', color: '#42B6D2', padding: 5 }}>{strings.invitationCode}</Text>
              <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular', color: '#5F7290', padding: 5 }}>ALPA69X-FREE-WASH</Text>
            </View>
          </View>
          <View style={{ padding: 20, paddingTop: 0 }}>
            <Button label={strings.inviteFriends} />
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
  textContainer: {
    textAlign: 'center',
    color: '#5F7290',
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
  }

});

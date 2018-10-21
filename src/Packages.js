import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PackagesCard, CustomStatusBar, Button, } from './common';
import GSideMenu from './GSideMenu';

const icWatch = require('./Image/ic_watch.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class Packages extends React.Component {
  openChooseServicesScreen() {
    const { navigate } = this.props.navigation;
    navigate('ChooseService');
  }
  openScheduleWashScreen() {
    const { navigate } = this.props.navigation;
    navigate('ScheduleWash');
  }
render() {
  const { mainContainer } = styles;
    return (
      <GSideMenu
        title='MY PACKAGES'
        navigation={this.props.navigation}
      >
      <View style={mainContainer}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ScrollView>
          <View style={{ flex: 1, padding: 15, paddingTop: 25 }}>
            <PackagesCard
              packageName='NORMAL WASH'
              validUntil='October 20, 2018'
              packagesNumber="1/3"
            />
            <PackagesCard
              packageName='NORMAL WASH'
              validUntil='October 20, 2018'
              packagesNumber="2/3"
            />
            <PackagesCard
              packageName='SUPER WASH'
              validUntil='October 20, 2018'
              packagesNumber='3/3'
            />
          </View>
        </ScrollView>
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <View style={{ flex: 4 }}>
            <Button label={strings.subscribeAgain} onPress={() => this.props.navigation.popToTop()}/>
          </View>
          <View style={{ flex: 3 }}>
            <Button label={strings.washNow} onPress={() => this.openChooseServicesScreen()} />
          </View>
          <View style={{ flex: 2 }}>
            <Button imgSource={icWatch} onPress={() => this.openScheduleWashScreen()} />
          </View>
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
    backgroundColor: '#ffffff',
  },
  marginStyle: {
    margin: 0
  }
});

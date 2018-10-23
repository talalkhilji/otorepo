import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Dash from 'react-native-dash';
import { CustomStatusBar, WhiteButton, Button, ButtonSmall, } from '../common'

import GSideMenu from '../GSideMenu';

const icCorrect = require('../Image/ic_correct.png');
const icBackArrow = require('../Image/ic_back.png');
const icClose = require('../Image/ic_close.png');
const globleString = require('../language/languageText');
const strings = globleString.default.strings;

export default class WasherServiceStatus extends React.Component {
  openSummaryScreen() {
    const { navigate } = this.props.navigation;
    navigate('Summary');
  }
  render() {
    const { mainContainer } = styles;
    return (
      <GSideMenu
        title='Services Status'
        navigation={this.props.navigation}
        firstIcon={icBackArrow}
        onPressFirstIcon={() => this.props.navigation.goBack()}
      >
      <View style={mainContainer}>
        <View style={{ flex: 1, justifyContent: 'space-between', }}>
          <View style={{ padding: 20, paddingTop: 50 }}>
          <View style={{ flexDirection: 'row', }} >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={styles.imageViewContainer} >
                <Image source={icCorrect} style={{ tintColor: '#FFFFFF' }} />
              </View>
              <Dash dashColor='#B2BAC5' style={styles.dashContainer} />
              <View style={styles.imageViewContainer} >
                <Image source={icCorrect} style={{ tintColor: '#FFFFFF' }} />
              </View>
              <Dash dashColor='#B2BAC5' style={[styles.dashContainer, { height: 72 }]} />
              <View style={styles.imageViewContainer} >
                <Image source={icCorrect} style={{ tintColor: '#FFFFFF' }} />
              </View>
              <Dash dashColor='#B2BAC5' style={styles.dashContainer} />
              <View style={styles.imageViewContainer} >
                <Image source={icCorrect} style={{ tintColor: '#FFFFFF' }} />
              </View>
            </View>
            <View style={{ flex: 5 }}>
              <Text style={styles.textContainer}>{strings.receivingJob}</Text>
              <Text style={[styles.textContainer, { marginTop: 48 }]}>{strings.acceptingJob}</Text>
              <Text style={styles.extraTextContainer}>{strings.estimatedArrivalTime} Time: 45 mins</Text>
              <Text style={[styles.textContainer, { color: '#5F7290', marginTop: 48 }]}>{strings.startingJob}</Text>
              <Text style={[styles.textContainer, { color: '#5F7290', marginTop: 48 }]}>{strings.finishJob}</Text>
            </View>
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
    backgroundColor: '#FFFFFF'
  },
  imageViewContainer: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: '#42B6D2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#42B6D2',
    padding: 3
  },
  extraTextContainer: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
    padding: 3
  },
  dashContainer: {
    width: 1,
    height: 50,
    flexDirection: 'column',
  }
});

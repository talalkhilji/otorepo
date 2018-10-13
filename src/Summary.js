import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CustomStatusBar, Button } from './common';

const icBeforeImage = require('./Image/ic_before_car.png');
const icAfterImage = require('./Image/ic_after_car.png');
const icStar = require('./Image/ic_star.png');
const icStarFill = require('./Image/ic_star_fill.png');
const icBack = require('./Image/ic_back.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class Summary extends React.Component {
render() {
  const { mainContainer } = styles;
    return (
      <View style={mainContainer}>
        <CustomStatusBar
          firstIcon={icBack}
          title='SUMMARY'
          onPressFirstIcon={() => this.props.navigation.goBack()}
        />
        <View style={{ flex: 1, alignItems: 'center', padding: 20 }} >
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={styles.textContainer}>{strings.before}</Text>
            <Image source={icBeforeImage} style={{ marginTop: 10 }} />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={styles.textContainer}>{strings.after}</Text>
            <Image source={icAfterImage} style={{ marginTop: 10 }} />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={styles.textContainer}>{strings.rateUs}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
              <Image source={icStarFill} style={styles.starContainr} />
              <Image source={icStarFill} style={styles.starContainr} />
              <Image source={icStarFill} style={styles.starContainr} />
              <Image source={icStar} style={styles.starContainr} />
              <Image source={icStar} style={styles.starContainr} />
            </View>
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <Button label={strings.submit} />
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
   padding: 10,
   fontSize: 11,
   fontFamily: 'Montserrat-Bold',
   color: '#666666',
   textAlign: 'center'
 },
 starContainr: {
   margin: 5
 }
});

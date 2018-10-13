import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WhiteBg, ButtonSmall } from '../common';
import Dash from 'react-native-dash';

const icCorrect = require('../Image/ic_correct.png');
const icQuestion = require('../Image/ic_question.png');
const globleString = require('../language/languageText');
const strings = globleString.default.strings;

const SubscriptionToPackagesCard = ({
    month,
    normalWashes,
    superWashes,
    price,
    onPress
  }) => (
      <WhiteBg>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.RectangleShapeView} />
        </View>
        <View style={{ flex: 5, flexDirection: 'column', padding: 10 }} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.monthContainer}>{month}</Text>
            <Image source={icQuestion} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
            <Image source={icCorrect} />
            <Text style={styles.washesTextContainer}>{normalWashes}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
            <Image source={icCorrect} />
            <Text style={styles.washesTextContainer}>{superWashes}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, marginTop: 10 }}>
            <ButtonSmall label={strings.subscribe} onPress={onPress} />
            </View>
            <View style={{ flex: 1 }} />

          </View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={styles.topOval} />
          <Dash dashColor='#E3E8F0' style={styles.dashContainer} />
          <View style={styles.bottomOval} />
        </View>
        <View style={{ flex: 2, flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'center' }} >
          <Text style={styles.packagesNumberContainer}>AED <Text >{price}</Text></Text>
        </View>
      </WhiteBg>
);

const styles = StyleSheet.create({
  RectangleShapeView: {
    width: 5,
    height: 30,
    backgroundColor: '#F2B86E',
    justifyContent: 'center',
    marginTop: 10
  },
  monthContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#42B6D2' },
  washesTextContainer: {
    padding: 3,
    marginLeft: 10,
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290'
  },
  packagesNumberContainer: {
    padding: 3,
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    color: '#5F7290',
    justifyContent: 'center',
  },
  dashContainer: {
    width: 1,
    flex: 1,
    flexDirection: 'column',
  },
  topOval: {
        height: 12,
        width: 26,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#f2f1f2'
  },
  bottomOval: {
        height: 12,
        width: 26,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#f2f1f2'
  },
});
export { SubscriptionToPackagesCard };

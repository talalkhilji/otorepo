import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WhiteBg } from '../common';
import Dash from 'react-native-dash';

const icCorrectYellow = require('../Image/ic_correct_yellow.png');
const icDelete = require('../Image/ic_delete.png');
const globleString = require('../language/languageText');
const strings = globleString.default.strings;

const PackagesCard = ({
    packageName,
    validUntil,
    packagesNumber
  }) => (
      <WhiteBg>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ padding: 10, flex: 8, flexDirection: 'row'}}>
            <Image style={{ margin: 5, height: 26, width: 26, }} source={icCorrectYellow} />
            <View style={{ flex: 5, Direction: 'column', justifyContent: 'center', }}>
              <Text style={[styles.packageNameContainer, { color: '#42B6D2' }]}>{packageName}</Text>
              <Text style={[styles.packageNameContainer, { color: '#5F7290' }]}>{strings.validUntil} <Text style={styles.validUntilDateContainer}>{validUntil}</Text></Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={styles.topOval} />
            <Dash dashColor='#E3E8F0' style={styles.dashContainer} />
            <View style={styles.bottomOval} />
          </View>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
            <Text style={styles.packagesNumberContainer}>{packagesNumber}</Text>
          </View>
        </View>
      </WhiteBg>
);

const styles = StyleSheet.create({
  packageNameContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#42B6D2' },
  validUntilDateContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: '#F2B568'
  },
  packagesNumberContainer: {
    padding: 3,
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    color: '#5F7290',
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
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#f2f2f2'
  },
  bottomOval: {
        height: 12,
        width: 26,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#f2f2f2'
  },
});
export { PackagesCard };

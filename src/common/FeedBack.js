import React from 'react';
import { View, Text, Image } from 'react-native';
import { WhiteBgTwoCorner } from '../common'

const icBeforeImage = require('../Image/ic_before_car.png');
const icAfterImage = require('../Image/ic_after_car.png');
const icStar = require('../Image/ic_star.png');
const icStarFill = require('../Image/ic_star_fill.png');
const globleString = require('../language/languageText');
const strings = globleString.default.strings;

const FeedBack = ({
  beforeImage,
  afterImage
}) => (

  <WhiteBgTwoCorner>
    <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }} >
      <Text style={[styles.textContainer, { color: '#42B6D2' }]}>{strings.feedBackTitle}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={styles.textContainer}>{strings.before}</Text>
          <Image source={icBeforeImage} style={{ marginTop: 10 }} />
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={styles.textContainer}>{strings.after}</Text>
          <Image source={icAfterImage} style={{ marginTop: 10 }} />
        </View>
      </View>
      <Text style={styles.textContainer}>{strings.rateUs}</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
        <Image source={icStarFill} style={styles.starContainr} />
        <Image source={icStarFill} style={styles.starContainr} />
        <Image source={icStarFill} style={styles.starContainr} />
        <Image source={icStar} style={styles.starContainr} />
        <Image source={icStar} style={styles.starContainr} />
      </View>
    </View>
</WhiteBgTwoCorner>
);
const styles = {
  textContainer: {
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#666666',
    paddingTop: 15,
    textAlign: 'center'
  },
  starContainr: {
    margin: 5
  }
};

export { FeedBack };

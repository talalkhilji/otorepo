import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WhiteBg } from '../common';
import Dash from 'react-native-dash';

const icEdit = require('../Image/ic_edit.png');
const icDelete = require('../Image/ic_delete.png');

const PaymentCard = ({
    cardName,
    cardType
  }) => (
      <WhiteBg>
        <View style={{ flex: 1, flexDirection: 'row', }} >
          <View style={{ flex: 1, Direction: 'column', padding: 10 }}>
            <Text style={styles.cardNameContainer}>{cardName}</Text>
            <Text style={styles.cardTypeContainer}>{cardType}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={styles.topOval} />
            <Dash dashColor='#E3E8F0' style={styles.dashContainer} />
            <View style={styles.bottomOval} />
          </View>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Image style={{ margin: 5 }} source={icEdit} />
            <Image style={{ margin: 5 }} source={icDelete} />
          </View>
        </View>
    </WhiteBg>
);
const styles = StyleSheet.create({
  cardNameContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#42B6D2'
  },
  cardTypeContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: '#A1AAB9'
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
export { PaymentCard };

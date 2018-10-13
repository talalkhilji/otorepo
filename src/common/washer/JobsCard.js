import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WhiteBg } from '../../common';
import Dash from 'react-native-dash';

const icCar = require('../../Image/ic_car.png');

const JobsCard = ({
    cardName,
    cardType,
    carName
  }) => (
      <WhiteBg>
        <View style={{ flex: 1, flexDirection: 'row', }} >
          <View style={{ flex:0.5,justifyContent: 'center', alignItems: 'center' }}>
           
              <Image style={{ marginTop: 10, marginBottom: 10}} source={icCar} />
            
              <Text style={styles.carNameContainer}>{carName}</Text>
            
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={styles.topOval} />
            <Dash dashColor='#E3E8F0' style={styles.dashContainer} />
            <View style={styles.bottomOval} />
          </View>
          <View style={{ flex: 1, Direction: 'column', padding: 10 }}>
            <Text style={styles.cardNameContainer}>{cardName}</Text>
            <Text style={styles.cardTypeContainer}>{cardType}</Text>
          </View>
          
          
        </View>
    </WhiteBg>
);
const styles = StyleSheet.create({
  carNameContainer: {
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    color: '#5F7290',
    justifyContent: 'center',
  },
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
export { JobsCard };

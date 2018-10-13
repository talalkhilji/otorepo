import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button, WhiteBgTwoCorner } from '../common'

const icLogo = require('../Image/ic_logo.png');

const OrderDone = ({
  dateTime,
  orderNo
}) => (

  <WhiteBgTwoCorner>
    <View style={{ alignItems: 'center', marginTop: 30, marginLeft: 30, marginRight: 30 }} >
      <Image source={icLogo} style={{ height: 103, width: 105 }} />
      <Text style={styles.thankYouContainer}>THANK YOU</Text>
      <Text style={[styles.thankYouContainer, { fontSize: 13, fontFamily: 'Montserrat-Regular' }]}>Our team will be there at</Text>
      <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Regular', color: '#F2B568', paddingTop: 10 }}>{dateTime}</Text>
      <Text style={[styles.thankYouContainer, { fontSize: 13 }]}><Text style={{ fontFamily: 'Montserrat-Regular' }}>ORDER NO.: </Text>{orderNo}</Text>
      <Text style={styles.messageContainer}>Press the button below to track the service status.</Text>
    </View>
  <View style={{ padding: 20 }}>
    <Button label='Service Status' />
  </View>
</WhiteBgTwoCorner>
);
const styles = {
  mainContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-between',
  },
  thankYouContainer: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#5F7290',
    paddingTop: 15,
    textAlign: 'center'
  },
  messageContainer: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
    paddingTop: 10,
    textAlign: 'center'
  },
};

export { OrderDone };

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WhiteBg, WhiteButtonSmall } from '../common';
import Dash from 'react-native-dash';

const icCorrect = require('../Image/ic_correct.png');
const globleString = require('../language/languageText');
const strings = globleString.default.strings;

const MyOrdersCard = ({
    carName,
    washType,
    paymentType,
    orderNo,
    dateTime,
    status,
    paymentMethod,
    paymentMethodIcon,
    price,
    onPress
  }) => (
    <WhiteBg>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.RectangleShapeView} />
      </View>

      <View style={{ flex: 5, flexDirection: 'column', padding: 15 }} >
        <Text style={styles.monthContainer}>{carName}<Text> </Text></Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icCorrect} />
          <Text style={styles.washesTextContainer}>{washType}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icCorrect} />
          <Text style={styles.washesTextContainer}>{paymentType}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icCorrect} />
          <Text style={styles.washesTextContainer}>{orderNo}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icCorrect} />
          <Text style={styles.washesTextContainer}>{dateTime}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
          <Text style={styles.packagesNumberContainer}>{strings.status}</Text>
          <Text style={[styles.washesTextContainer, { color: '#F2B568' }]}>{status}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3, marginTop: 10 }}>
          <WhiteButtonSmall label={strings.cancelOrder} onPress={onPress}/>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={styles.topOval} />
        <Dash dashColor='#E3E8F0' style={styles.dashContainer} />
        <View style={styles.bottomOval} />
      </View>
      <View style={{ flex: 3, paddingTop: 20, paddingBottom: 20, alignItems: 'center', justifyContent: 'space-between' }} >
        <View >
            <Text style={styles.packagesNumberContainer}>AED <Text >{price}</Text></Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.packagesNumberContainer}>{strings.payment}</Text>
            <Image source={paymentMethodIcon} style={{ marginTop: 10, marginBottom: 10 }} />
            <Text style={[styles.washesTextContainer, { marginLeft: 0 }]}>{paymentMethod}</Text>
        </View>
      </View>
    </WhiteBg>
);

const styles = StyleSheet.create({
  RectangleShapeView: {
    width: 5,
    height: 60,
    backgroundColor: '#F2B86E',
    justifyContent: 'center',
    marginTop: 10
  },
  monthContainer: {
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#42B6D2'
  },
  washesTextContainer: {
    padding: 3,
    marginLeft: 10,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290'
  },
  packagesNumberContainer: {
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
        height: 14,
        width: 30,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#f2f1f2'
  },
  bottomOval: {
        height: 14,
        width: 30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#f2f1f2'
  },
});
export { MyOrdersCard };

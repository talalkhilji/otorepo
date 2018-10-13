import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
const icForwardArrow = require('../Image/ic_forward_arrow.png');

const FAQsCard = ({
    title,
    onPress,
  }) => (

      <View style={{ flex: 1}} >
          <View style={styles.mainContainer}>
            <Text style={styles.textContainer}>{title}</Text>
            <Image source={icForwardArrow} style={styles.imageContainer} />
          </View>
          <View style={{ backgroundColor: '#E3E8F0', height: 1.5, marginLeft: 10 }} />
      </View>
  );

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  textContainer: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#546889',
    padding: 10
  },
  imageContainer: {
    margin: 10
  },
});
export { FAQsCard };

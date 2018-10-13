import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const icRightArrow = require('../Image/ic_right_arrow.png');
const icCardSelected = require('../Image/ic_card_selected.png');
const icCardUnSelected = require('../Image/ic_card_unselected.png');

const CreditCardList = ({
  title,
  description,

}) => {
  const { container, imageViewContainer, textViewContainer, textContainer } = styles;
  return (
    <View>
      <View style={container}>
        <View style={imageViewContainer}>
          <Image source={icRightArrow} />
        </View>
        <View style={{ flex: 8, }}>
          <View style={textViewContainer}>
            <Text style={textContainer}>{title}</Text>
            <Text style={[textContainer, { fontSize: 9, }]}>{description}</Text>
          </View>
        </View>
        <View style={imageViewContainer}>
          <Image source={icCardSelected} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 7, backgroundColor: '#E3E8F0', height: 1 }} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center'
  },
  textViewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imageViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
    padding: 3
  }
});
export { CreditCardList };

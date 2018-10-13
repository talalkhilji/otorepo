import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import FlipToggle from 'react-native-flip-toggle-button';

const icSwitchSelected = require('../Image/ic_switch_selected.png');
const icSwitchUnSelected = require('../Image/ic_switch_selected.png');
const icQuestion = require('../Image/ic_question.png');

const ServiceType = (props) => {
  const { viewStyle, textContainer } = styles;
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
      <View style={viewStyle}>
        <FlipToggle
          value={props.value}
          buttonWidth={50}
          buttonHeight={28}
          buttonRadius={50}
          sliderWidth={25}
          sliderHeight={25}
          sliderRadius={50}
          sliderOnColor='#72D5F3'
          sliderOffColor='#8A9DBF'
          buttonOnColor='#EAEDF3'
          buttonOffColor='#EAEDF3'
          margin={10}
          onToggle={props.onPress}
        />
          <Text style={textContainer}>{props.title}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ backgroundColor: '#E3E8F0', height: 1 }} />
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  textContainer: {
    fontSize: 13,
    paddingLeft: 20,
    color: '#546889',
    fontFamily: 'Montserrat-Regular'
  },
};

export { ServiceType };

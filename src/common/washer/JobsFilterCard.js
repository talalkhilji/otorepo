import React from 'react';
import { View, Text, Image } from 'react-native';
import { AlbumDetail, AlbumDetailSection, Input,WhiteBgTwoCorner,Button } from '../../common'
import RNPickerSelect from 'react-native-picker-select';

const icBeforeImage = require('../../Image/ic_before_car.png');
const icAfterImage = require('../../Image/ic_after_car.png');
const icStar = require('../../Image/ic_star.png');
const icStarFill = require('../../Image/ic_star_fill.png');
const globleString = require('../../language/languageText');
const icDownArrow = require('../../Image/ic_down_arrow.png');
const strings = globleString.default.strings;

const items = [
              {
                label: 'Abu Dhabi',
                value: 'Abu Dhabi',
              },
              {
                label: 'Ajman',
                value: 'Ajman',
              },
              {
                label: 'Dubai',
                value: 'Dubai',
              },
              {
                label: 'Fujairah',
                value: 'Fujairah',
              },
              {
                label: 'Ras Al Khaimah',
                value: 'Ras Al Khaimah',
              },
              {
                label: 'Sharjah',
                value: 'Sharjah',
              },
              {
                label: 'Umm al-Quwain',
                value: 'Umm al-Quwain',
              },
          ];
const JobsFilterCard = ({
  beforeImage,
  afterImage
}) => (

  <WhiteBgTwoCorner>
    <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }} >
      <Text style={[styles.textContainer, { color: '#42B6D2' }]}>{strings.jobsFilterTitle}</Text>
      
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10 }}>

              <Input
                    imageSource={icDownArrow}
                    placeholder='OLDEST FIRST'
                    inputTitle={''}
                    onChangeText={console.log('changed text')}
                    value={''}
                    notEditable={false}
                  />
          
      </View>       
      
    </View>
    <View style={{ padding: 20 }}>
        <Button label={strings.jobsFilterDoneBtn} onPress={console.log('pressed')} />
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

export { JobsFilterCard };

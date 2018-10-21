import React from 'react';
import { View, Text, Image } from 'react-native';
import { AlbumDetail, AlbumDetailSection, Input,WhiteBgTwoCorner,Button } from '../../common'

const icBeforeImage = require('../../Image/ic_before_car.png');
const icAfterImage = require('../../Image/ic_after_car.png');
const icStar = require('../../Image/ic_star.png');
const icStarFill = require('../../Image/ic_star_fill.png');
const globleString = require('../../language/languageText');
const strings = globleString.default.strings;

const CarPlate = ({
  beforeImage,
  afterImage
}) => (

  <WhiteBgTwoCorner>
    <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }} >
      <Text style={[styles.textContainer, { color: '#42B6D2' }]}>{strings.carPlateTitle}</Text>
      
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
            <Input
              placeholder='ENTER CAR PLATE NO.'
              onChangeText={console.log("changed text")}
              value={""}
              notEditable={false}
              textAlign={'center'}
            />
      </View>       
      
    </View>
    <View style={{ padding: 20 }}>
        <Button label={strings.carPlateContinueBtn} onPress={console.log('pressed')} />
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

export { CarPlate };

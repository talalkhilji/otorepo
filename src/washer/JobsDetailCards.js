import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { CustomStatusBar, WhiteBg, PaymentCard,JobsCard,CarPlate } from '../common';

import GSideMenu from '../GSideMenu';

const icAddNewVehicle = require('../Image/ic_add_new_vehicle.png');
const icCar = require('../Image/ic_car.png');
const icCarSuv = require('../Image/suv_2x.png');
const icCarVan = require('../Image/van_2x.png');
const icCarTraler = require('../Image/traler_2x.png');
const imgWash = require('../Image/img_wash.png');
const icPin = require('../Image/ic_pin.png');
const icCheck = require('../Image/ic_check.png');
const globleString = require('../language/languageText');
const { width } = Dimensions.get('window');
const strings = globleString.default.strings;
export default class JobsDetailCards extends React.Component {
constructor(props) {
    super(props);
}
openAddNewCardScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewCard');
}
render() {
  const { mainContainer,viewContainer,textContainer } = styles;
    return (
      <GSideMenu 
        navigation={this.props.navigation}
        title='Jobs Details'
      >
      <View style={mainContainer}>
        {/*<CustomStatusBar
          title='Jobs CARDS'
          secondIcon={icAddNewVehicle}
          onPressSecondIcon={this.openAddNewCardScreen.bind(this)}
        />*/}
        <ScrollView>
          <View style={{ padding: 15, paddingTop: 25 }}>
            <JobsCard
              cardName='Extensive Deep Wash'
              cardType='Exterior Steam Wash, Interior Steam Wash, Perfume'
              carName='SEDAN'
              icCar={icCar}
            />

            
          </View>
          <View style={{ flex: 0, justifyContent: 'center', padding: 10, marginLeft: 30, marginRight: 30 }} >
                <WhiteBg>
                  <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <View style={styles.RectangleShapeView} />
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <View style={[styles.RectangleShapeView, { height: 5, width: 15 }]} />
                        <View style={{ width: 10 * 20 }} />
                      <View style={[styles.RectangleShapeView, { height: 5, width: 15 }]} />
                    </View>
                    <View style={{ height: 70, paddingLeft: 20, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.plateTextContainer}>
                        <Text style={styles.plateText}>{'F'}</Text>
                      </View>  
                        <Text style={{ fontSize: 30, fontFamily: 'Montserrat-Bold', color: '#42B6D2', justifyContent: 'flex-end', }}>DUBAI</Text>
                      <View style={styles.plateTextContainer}>
                        <Text style={styles.plateText}>{'12928'}</Text>
                      </View>
                    </View>
                  </View>
                </WhiteBg>
              </View>

          <View style={mainContainer}>
            
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                <View style={viewContainer}>
                  <View style={textContainer}>
                    <Image source={imgWash} />
                  </View>
                  <View>
                    <Text style={textContainer}>Normal Wash</Text>
                  </View>  
                </View>
                <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                <View style={viewContainer}>
                  <View style={textContainer}>
                    <Image source={icCar} style={{ height: 11, width: 32 }} />
                  </View>
                  <View>  
                    <Text style={textContainer}>Nissan Maxima</Text>
                  </View>  
                </View>
                <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                <View style={viewContainer}>
                  <View style={textContainer}>
                    <Image source={icPin} />
                  </View>
                  <View>  
                    <Text >44-A, Street 69-B</Text>
                  </View>  
                </View>
                <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
              </View>
            
          </View>    
        </ScrollView>
      </View>
      </GSideMenu>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  colorDot: {
    backgroundColor: 'red',
    width: 44,
   height: 44,
   borderRadius: 44 / 2
 },
 cone: {
    width: 0,
    height: 0,
    borderLeftWidth: 55,
    borderLeftColor: 'transparent',
    borderRightWidth: 55,
    borderRightColor: 'transparent',
    borderTopWidth: 100,
    borderTopColor: 'red',
    borderRadius: 55
  },
  RectangleShapeView: {
      width: 10 * 15,
      height: 15,
      backgroundColor: '#E2E8EF',
      justifyContent: 'center',
    },
    plateTextContainer: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#77D5F2',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 10
    },
    plateText: {
      color: '#666666',
      fontSize: 18,
      fontFamily: 'Montserrat-Bold',
      textAlign: 'center'
    },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  textContainer: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
  },
  transperantContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 10
  }

});

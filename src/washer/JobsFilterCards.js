import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CustomStatusBar, WhiteBg, PaymentCard,JobsCard,JobsFilterCard } from '../common';

const icAddNewVehicle = require('../Image/ic_add_new_vehicle.png');
const icCar = require('../Image/ic_car.png');
const icCarSuv = require('../Image/suv_2x.png');
const icCarVan = require('../Image/van_2x.png');
const icCarTraler = require('../Image/traler_2x.png');
export default class JobsFilterCards extends React.Component {

openAddNewCardScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewCard');
}
render() {
  const { mainContainer } = styles;
    return (

      <View style={mainContainer}>
        <CustomStatusBar
          title='Jobs CARDS'
          secondIcon={icAddNewVehicle}
          onPressSecondIcon={this.openAddNewCardScreen.bind(this)}
        />
        <ScrollView>
          <View style={{ padding: 15, paddingTop: 25 }}>
            <JobsCard
              cardName='Extensive Deep Wash'
              cardType='Exterior Steam Wash, Interior Steam Wash, Perfume'
              carName='SEDAN'
              icCar={icCar}
            />
            <JobsCard
              cardName='Deep Wash'
              cardType='Exterior Steam Wash, Interior Steam Wash, Perfume'
              carName='SUV'
              icCar={icCarSuv}
            />
            <JobsCard
              cardName='Deep Wash'
              cardType='Exterior Steam Wash, Interior Steam Wash, Perfume'
              carName='VAN'
              icCar={icCarVan}
            />
            <JobsCard
              cardName='Normal Wash'
              cardType='Exterior Steam Wash, Interior Steam Wash, Perfume'
              carName='TRAILER'
              icCar={icCarTraler}
            />
            <JobsCard
              cardName='Deep Wash'
              cardType='Exterior Steam Wash, Interior Steam Wash, Perfume'
              carName='SEDAN'
              icCar={icCar}
            />
          </View>
        </ScrollView>
        <JobsFilterCard />
      </View>

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
  }

});

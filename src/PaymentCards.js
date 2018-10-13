import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CustomStatusBar, WhiteBg, PaymentCard } from './common'

const icAddNewVehicle = require('./Image/ic_add_new_vehicle.png');

export default class PaymentCards extends React.Component {

openAddNewCardScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewCard');
}
render() {
  const { mainContainer } = styles;
    return (

      <View style={mainContainer}>
        <CustomStatusBar
          title='PAYMENT CARDS'
          secondIcon={icAddNewVehicle}
          onPressSecondIcon={this.openAddNewCardScreen.bind(this)}
        />
        <ScrollView>
          <View style={{ padding: 15, paddingTop: 25 }}>
            <PaymentCard
              cardName='Card 1'
              cardType='Debit Card'
            />
            <PaymentCard
              cardName='Card 2'
              cardType='Credit Card'
            />
          </View>
        </ScrollView>
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

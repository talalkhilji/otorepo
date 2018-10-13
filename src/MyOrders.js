import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CustomStatusBar, MyOrdersCard } from './common';
import DialogBox from 'react-native-dialogbox';
const icCash = require('./Image/ic_cash.png');
const icCreditCard = require('./Image/ic_credit_card.png');

export default class MyOrders extends React.Component {

openAddNewCardScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewCard');
}

openDialog(){
  // alert
  this.dialogbox.confirm({
    content: 'Are you sure, you want to cancel this order?',
    // content: ['come on!', 'go!'],
    ok: {
      text: 'OK',
      style: {
        color: '#40B4D0'
      },
      // callback: () => {
      //   this.dialogbox.alert('Good!');
      // },
    },
    cancel: {
      text: 'CANCEL',
      style: {
        color: '#40B4D0'
      },
      // callback: () => {
      //   this.dialogbox.alert('Hurry up！');
      // },
    },
  });
}
render() {
  const { mainContainer } = styles;
    return (
      <View style={mainContainer}>
        <CustomStatusBar
          title='MY ORDERS'
        />
        <ScrollView>
          <View style={{ flex: 1, padding: 15, paddingTop: 25 }}>
            <MyOrdersCard
              carName='SILVER MAXIMA'
              washType='Extensive Deep Wash'
              paymentType='Cash on Delivery'
              orderNo='Order No.: AD8090101'
              dateTime='Saturday, 1st Sept. 2018 @ 7:15 pm'
              status='STARTING JOB'
              paymentMethod='CASH'
              paymentMethodIcon={icCash}
              price='220'
              onPress={() => {this.openDialog()}}
            />
            <MyOrdersCard
              carName='NISSAN MAXIMA'
              washType='Super Wash'
              paymentType='Package'
              orderNo='Order No.: AD8090101'
              dateTime='Saturday, 1st Sept. 2018 @ 7:15 pm'
              status='RESERVED'
              paymentMethod='CREDIT CARD'
              paymentMethodIcon={icCreditCard}
              price='220'
            />
            <MyOrdersCard
              carName='SILVER MAXIMA'
              washType='Extensive Deep Wash'
              paymentType='Cash on Delivery'
              orderNo='Order No.: AD8090101'
              dateTime=''
              status='RESERVED'
              paymentMethod='CREDIT CARD'
              paymentMethodIcon={icCreditCard}
              price='220'
            />
          </View>
        </ScrollView>
        <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
});

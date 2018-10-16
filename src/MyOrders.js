import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import { CustomStatusBar, MyOrdersCard, getCustomerOrders } from './common';
import DialogBox from 'react-native-dialogbox';
const icCash = require('./Image/ic_cash.png');
const icCreditCard = require('./Image/ic_credit_card.png');

export default class MyOrders extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      customerOrders: []
    };
  }

  async componentDidMount(){
    let customerOrders = await getCustomerOrders();

    //console.log(customerOrders);
    this.setState({customerOrders});
  }

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

          {this.state.customerOrders.map((order) => 
            <View key={order.id}>
               <MyOrdersCard
                carName={`${order.make_name} ${order.model_name} ${order.model_years}`.toUpperCase()}
                washType={order.service_title}
                paymentType={`${order.payment_mode === 'Cash' ? 'Cash on Delivery' : 'Credit Card'}`}
                orderNo={`Order No.: ${order.id}`}
                dateTime={`${moment(order.washing_date).format('dddd, Do MMM, YYYY')} @ ${order.washing_time}`}
                status='STARTING JOB'
                paymentMethod={`${order.payment_mode.toUpperCase() || 'CASH'}`}
                paymentMethodIcon={icCash}
                price={order.price}
                onPress={() => {this.openDialog()}}
              />
            </View>  
          )}
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

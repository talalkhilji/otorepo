import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import { CustomStatusBar, MyOrdersCard, getCustomerOrders, SimpleLoader, cancelOrder, orderStatusLabels } from './common';
import GSideMenu from './GSideMenu';
import DialogBox from 'react-native-dialogbox';
const icCash = require('./Image/ic_cash.png');
const icCreditCard = require('./Image/ic_credit_card.png');

export default class MyOrders extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      customerOrders: [],
      loading: true
    };
  }

  async componentDidMount(){
    let customerOrders = await getCustomerOrders();

    //console.log(customerOrders);
    this.setState({customerOrders, loading: false});
  }

  openDialog(order_index, order_id){
    // alert
    this.dialogbox.confirm({
      content: 'Are you sure, you want to cancel this order?',
      // content: ['come on!', 'go!'],
      ok: {
        text: 'OK',
        style: {
          color: '#40B4D0'
        },
         callback: () => {
           this.cancelOrder(order_index, order_id);
        },
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

  async cancelOrder(order_index, order_id){
    let response = await cancelOrder(order_id);

   //console.log('response: ', response);

    let customerOrders = this.state.customerOrders;
    customerOrders.splice(order_index, 1);
    this.setState({customerOrders});
  }


  serviceStatus(order){
    this.props.navigation.navigate({
      kye: 'ServiceStatus',
      routeName: 'ServiceStatus',
      params: {
        order: order
      }
    });
  }

  render() {
    const { mainContainer } = styles;
      return (
        <GSideMenu 
          navigation={this.props.navigation}
          title='MY ORDERS'
        >
        <View style={mainContainer}>
          {this.state.loading ? 
              <SimpleLoader />
              :
              <ScrollView>
                <View style={{ flex: 1, padding: 15, paddingTop: 25 }}>

                {this.state.customerOrders.map((order, index) => 
                  <View key={order.id}>
                     <MyOrdersCard
                      carName={`${order.make_name} ${order.model_name}`.toUpperCase()}
                      washType={order.service_title}
                      paymentType={`${order.payment_mode === 'Cash' ? 'Cash on Delivery' : 'Credit Card'}`}
                      orderNo={`Order No.: ${order.id}`}
                      dateTime={`${moment(order.washing_date).format('dddd, Do MMM, YYYY')} @ ${order.washing_time}`}
                      status={orderStatusLabels[parseInt(order.status)]}
                      paymentMethod={`${order.payment_mode || 'Cash'}`}
                      paymentMethodIcon={order.payment_mode === 'Cash' ? icCash : icCreditCard }
                      price={order.price}
                      orderStatus={order.status}
                      onPressCancel={() => {this.openDialog(index, order.id)}}
                      onPressStatus={() => {this.serviceStatus(order)}}
                    />
                  </View>  
                )}
                </View>
                {this.state.customerOrders.length === 0 && 
                      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                          <Text style={styles.text}>No Order Found</Text>
                      </View>
                }
              </ScrollView>
          }
          <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/>
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
  text: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: "left",
    color: "#5f7290"
  }
});

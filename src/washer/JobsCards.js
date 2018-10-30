import React from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { CustomStatusBar, WhiteBg, PaymentCard,JobsCard,CarPlate, getWasherOrders, vehicleIcon, ORDER_STATUS_ON_WAY, ORDER_STATUS_IN_PROGRESS } from '../common';
import GSideMenu from '../GSideMenu';


const globleString = require('../language/languageText');
const strings = globleString.default.strings;

export default class JobsCards extends React.Component {
constructor(props) {
    super(props);

    this.state = {
      orders: [],
      loading: false
    };
}


componentDidMount(){
  this.getOrders();
}


async getOrders(){
  this.setState({loading: true});
  let orders = await getWasherOrders();
  //console.log({orders});
  this.setState({orders, loading: false});
}

openAddNewCardScreen() {
  const { navigate } = this.props.navigation;
  navigate('AddNewCard');
}

openJobDetailScreen(orderId, status){

  const { navigate } = this.props.navigation;

  let screen = 'JobsDetailCards';

  status = parseInt(status);

  if(status === ORDER_STATUS_ON_WAY){
    screen = 'BeforeWash';
  }
  else if(status === ORDER_STATUS_IN_PROGRESS){
    screen = 'AfterWash';
  }
  
  navigate({id: screen, routeName: screen, params: { id: orderId}});
}

jobServices(services){
  //console.log({services});
  let jobService = [];

  services.map((service) => {
    jobService.push(service.sub_service_title)
  });

  return jobService.join(', ');
}

render() {
  const { mainContainer } = styles;
    return (
      <GSideMenu 
        navigation={this.props.navigation}
        title='TODAY JOBS'
      >
      <View style={mainContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.getOrders.bind(this)}
            />
          }
        >
          <View style={{ padding: 15, paddingTop: 25 }}>
            {this.state.orders.length > 0 && 
                <View style={{marginBottom: 5}}><Text style={styles.jobsCountText}>{this.state.orders.length} {strings.jobs}</Text></View>
            }
            {this.state.orders.map((order, key) => {
              return (
                <TouchableOpacity key={key} onPress={() => this.openJobDetailScreen(order.id, order.current_status)}>
                  <JobsCard
                    cardName={order.service_title}
                    cardType={this.jobServices(order.sub_services)}
                    carName={order.vehicle_type.toUpperCase()}
                    icon={vehicleIcon[order.vehicle_type]}
                    location={order.location_title ? `${order.location_title.substr(0, 15)}...` : 'N/A'}
                    arrivalTime={moment(`${order.washing_date} ${order.washing_time}`).fromNow()}
                  />
                </TouchableOpacity>  
              )
            })}

            {(this.state.orders.length === 0 && !this.state.loading) &&
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.text}>No Job Found</Text>
                </View>
            }
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
  jobsCountText:{
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 12,
    letterSpacing: 0.55,
    textAlign: "center",
    color: "#90a8c8",
    textTransform: 'uppercase'
  }

});

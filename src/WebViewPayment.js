import React from 'react';
import { View, WebView, StyleSheet, AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import {DOMParser} from 'xmldom';
import Toast from 'react-native-simple-toast';

import { Post, SimpleLoader, addLocation, placeOrder } from './common';
import GSideMenu from './GSideMenu';

const icBackArrow = require('./Image/ic_back.png');

var processing = false;

export default class WebViewPayment extends React.Component {
  constructor(props) {
    super(props);


    let userDetails = 'userDetails' in props.navigation.state.params ? 
                                                         props.navigation.state.params.userDetails :
                                                         {};

                                                         console.log('userDetails : ', userDetails);

    let service = 'service' in props.navigation.state.params ? 
                                                         props.navigation.state.params.service :
                                                         {};      


    let services = 'services' in props.navigation.state.params ? 
                                                         props.navigation.state.params.services :
                                                         {};                                                                                                          


    let vehicleDetails = 'vehicleDetails' in props.navigation.state.params ? 
                                                         props.navigation.state.params.vehicleDetails :
                                                         {};


    let price = 'price' in props.navigation.state.params ? 
                                                         props.navigation.state.params.price :
                                                         0;   

    let washDate =  props.navigation.state.params ? 
                                                  (props.navigation.state.params.washDate ? moment(props.navigation.state.params.washDate) : moment()) :
                                                   moment();  

    let washTime =  props.navigation.state.params ? 
                                                  (props.navigation.state.params.washTime ? moment(props.navigation.state.params.washTime) : moment().add('1', 'hour')) :
                                                   moment().add('1', 'hour');  

    let villApartmentNo = 'villApartmentNo' in props.navigation.state.params ? 
                                                         props.navigation.state.params.villApartmentNo :
                                                         0;  

    let remarks = 'remarks' in props.navigation.state.params ? 
                                                         props.navigation.state.params.remarks :
                                                         null;  
                                                         
    let specialRequest = 'specialRequest' in props.navigation.state.params ? 
                                                         props.navigation.state.params.specialRequest :
                                                         null;                                                                                                                                                           



    this.state = {
      userDetails: userDetails,
      service: service,
      services: services,
      vehicleDetails: vehicleDetails,
      price: price,
      washDate: washDate,
      washTime: washTime,
      villApartmentNo: villApartmentNo,
      remarks: remarks,
      specialRequest: specialRequest,
      storeId: '20943',
      authKey: 'Kjv3B-ZZ2m#R2zjK',
      loading: true,
      webViewCloseUrl: null,
      webViewStartUrl: null,
      transactionCode: null
    };
  }


  componentDidMount(){
    this.webView();
  }


  async webView(){
    let userData =  await AsyncStorage.getItem('userData');
    let user = JSON.parse(userData);

    let cartId = moment().format('X');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
                <mobile>
                  <store>${this.state.storeId}</store>
                  <key>${this.state.authKey}</key>
                  <device>
                    <type>${DeviceInfo.getManufacturer()}</type>
                    <id>${DeviceInfo.getUniqueID()}</id>
                    <agent>${DeviceInfo.getUserAgent()}</agent>
                    <accept>${DeviceInfo.getUserAgent()}</accept>
                  </device>
                  <app>
                    <name>OTO Serv</name>
                    <version>1.0</version>
                    <user>${user.id}</user>
                    <id>${DeviceInfo.getUniqueID()}</id>
                  </app>
                  <tran>
                    <test>1</test>
                    <type>PAYPAGE</type>
                    <class>ECOM</class>
                    <cartid>${cartId}</cartid>
                    <description>Test Transaction</description>
                    <currency>AED</currency>
                    <amount>${this.state.price}</amount>
                    <ref></ref>
                  </tran>
                  <billing>
                    <name>
                      <title>Test</title>
                      <first>${user.first_name}</first>
                      <last>${user.last_name}</last>
                    </name>
                  <address>
                    <line1>abc</line1>
                    <line2>xyz</line2>
                    <line3>123</line3>
                    <city>${user.city}</city>
                    <region>UAE</region>
                    <country>UAE</country>
                    <zip>123</zip>
                  </address>
                  <email>${user.email}</email>
                  </billing>
                </mobile>`;


    //console.log(xml);                 


    let response = await Post({url: 'https://secure.innovatepayments.com/gateway/mobile.xml', data: xml});

    console.log('payment response: ',response.data);

    var doc = new DOMParser().parseFromString(response.data);

    let webViewStartUrl = doc.getElementsByTagName('start').toString().replace('<start>', '').replace('</start>', '');
    let webViewCloseUrl = doc.getElementsByTagName('close').toString().replace('<close>', '').replace('</close>', '');
    let transactionCode = doc.getElementsByTagName('code').toString().replace('<code>', '').replace('</code>', '');
    console.log(webViewStartUrl, webViewCloseUrl, transactionCode);

    this.setState({webViewStartUrl, webViewCloseUrl, transactionCode});
  } 


  async processPayment(url){
    const {navigate} = this.props.navigation;
    //console.log('state: ', this.state);
    if(url === this.state.webViewCloseUrl && !processing){

      processing = true;

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
                  <mobile>
                    <store>${this.state.storeId}</store>
                    <key>${this.state.authKey}</key>
                    <complete>${this.state.transactionCode}</complete>
                  </mobile>`;

      let response = await Post({url: 'https://secure.innovatepayments.com/gateway/mobile_complete.xml', data: xml});

      console.log('payment completion response: ',response.data);

      let doc = new DOMParser().parseFromString(response.data);

      let status = doc.getElementsByTagName('status').toString().replace('<status>', '').replace('</status>', '');

      if(status === 'A'){

        let locationResponse = [];

        if(!this.state.userDetails.location_id){


            let locationData = {
                                  "title": this.state.userDetails.location_name,
                                  "latitude": this.state.userDetails.currentCoordinates.latitude,
                                  "longitude": this.state.userDetails.currentCoordinates.longitude
                               };
            
            locationResponse = await addLocation(locationData);  
        }           

        let data = { 
                    "location_id": this.state.userDetails.location_id ? this.state.userDetails.location_id : locationResponse.data.contents[0].id,
                    "vehicle_id": this.state.userDetails.vehicle_id, 
                    "service_id": this.state.service.id,
                    "services": this.state.services.join(','),
                    "washing_date": moment(this.state.washDate).format('YYYY-MM-DD'), 
                    "washing_time": moment(this.state.washTime).format('hh:mm a'),
                    "price": this.state.price, 
                    "villa_apartment_no": this.state.villApartmentNo, 
                    "remarks": this.state.remarks, 
                    "special_request": this.state.specialRequest,
                    "payment_mode": "Credit Card"
                  };

        let response = await placeOrder(data);

        if(response.status === 201){
            //console.log(JSON.stringify(response.data));
            navigate({key: 'Home', 
                    routeName: 'Home', 
                    params: {
                      newOrderDetails: response.data.contents[0]
                    }
            });
        }
        else{
          Toast.show('Something went wrong with the order');
        }
      }
      else{
        this.setState({
          webViewStartUrl: null,
          loading: true
        }, () => {
          this.webView();
          Toast.show('Your payment was declined please try again');
        });
      }

  }
}

render() {
  const { mainContainer } = styles;
  return (
    <GSideMenu
      navigation={this.props.navigation}
      title="PAYMENT"
      firstIcon={icBackArrow}
      onPressFirstIcon={() => this.props.navigation.goBack()}
      isPayment
    >
      <View style={mainContainer}>
        {this.state.loading &&
          <SimpleLoader />
        }
        {this.state.webViewStartUrl &&
          <WebView
            scalesPageToFit={false}
            source={{uri: this.state.webViewStartUrl}}
            style={{flex: 1}}
            onLoad={() => this.setState({loading: false})}
            onNavigationStateChange={(navEvent)=> this.processPayment(navEvent.url)}
          />
        }
        </View>
      </GSideMenu>  
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});

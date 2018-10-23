import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import { WhiteBg, CustomItemStatusBar, AlbumDetail, AlbumDetailSection, Input, placeOrder, Loader, addLocation, Button} from './common';
import GSideMenu from './GSideMenu';


const icBackArrow = require('./Image/ic_back.png');
const imgWash = require('./Image/img_wash.png');
const icCar = require('./Image/ic_car.png');
const icPin = require('./Image/ic_pin.png');
const icCheck = require('./Image/ic_check.png');
const icCash = require('./Image/ic_cash.png');
const icCreditCard = require('./Image/ic_credit_card.png');
const globleString = require('./language/languageText');
const icCorrect = require('./Image/ic_correct_white.png');
const icClose = require('./Image/ic_close.png');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const { width } = Dimensions.get('window');
const strings = globleString.default.strings;

const vehicleTypes = {
  'Sedan' : require('./Image/ic_car.png'),
  'SUV': require('./Image/suv.png'),
  'Van': require('./Image/van.png'),
  'Trailer': require('./Image/traler.png'),
  'Bus': require('./Image/traler.png'),
  'Bike': require('./Image/ic_car.png')
};

export default class Confirmation extends React.Component {


  constructor(props){
    super(props);


    let userDetails = 'userDetails' in props.navigation.state.params ? 
                                                         props.navigation.state.params.userDetails :
                                                         {};

    let service = 'service' in props.navigation.state.params ? 
                                                         props.navigation.state.params.service :
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

    this.state = {
        userDetails: userDetails,
        service: service,
        price: price,
        vehicleDetails: vehicleDetails, 
        villApartmentNo: '',
        remarks: '',
        specialRequest: '',
        washDate: washDate,
        washTime: washTime,
        loading: false,
        mode: 'Cash',
        cashModeColor: '#f2b568',
        paymentModeColor: '#546889'
    };
  }


  componentDidMount(){
    //console.log(this.state.washDate, this.state.washTime);
  }


  changeMode(mode){
      this.setState({mode});

      if(mode === 'Cash'){
        this.setState({
          cashModeColor: '#f2b568',
          paymentModeColor: '#546889'
        });
      }
      else{
        this.setState({
          cashModeColor: '#546889',
          paymentModeColor: '#f2b568'
        });
      }
  }

  async openPaymentScreen() {

    const { navigate } = this.props.navigation;


    let services = await this.state.service.serviceType.filter(x => x.status).map(({id, serviceName, status}) => id);

    if(!this.state.villApartmentNo){
      Toast.show('Please provide villa/appartment no');
      return;
    }

    if(this.state.mode === 'Cash'){

      this.setState({loading: true});

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
                  "services": services.join(','),
                  "washing_date": moment(this.state.washDate).format('YYYY-MM-DD'), 
                  "washing_time": moment(this.state.washTime).format('hh:mm a'),
                  "price": this.state.price, 
                  "villa_apartment_no": this.state.villApartmentNo, 
                  "remarks": this.state.remarks, 
                  "special_request": this.state.specialRequest,
                  "payment_mode": this.state.mode
                };

     let response = await placeOrder(data);

     this.setState({loading: false});



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
      navigate({
        key: 'WebViewPayment',
        routeName: 'WebViewPayment',
        params: {
          userDetails: this.state.userDetails,
          service: this.state.service,
          services: services,
          price: this.state.price,
          vehicleDetails: this.state.vehicleDetails, 
          villApartmentNo: this.state.villApartmentNo,
          remarks: this.state.remarks,
          specialRequest: this.state.specialRequest,
          washDate: this.state.washDate,
          washTime: this.state.washTime
        }
      });
      //Toast.show('Credit card option is not available');
    }

    //navigate('Payment', { isPopToRoute: true });
  }
  render() {
    const { topContainer, mainContainer, viewContainer, textContainer, transperantContainer, buttonContainer, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer  } = styles;

     return (
      <GSideMenu
        navigation={this.props.navigation}
        title="CONFIRMATION"
        firstIcon={icBackArrow}
        onPressFirstIcon={() => this.props.navigation.goBack()}
        isConfirmation
      >
      <View style={topContainer}>
        <Loader loading={this.state.loading} message='Please wait..' />
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <ScrollView>
          <View style={mainContainer}>
            <WhiteBg>
              <View style={{ flex: 1, }}>
                <View style={viewContainer}>
                  <Text style={textContainer}>{this.state.service.washType}</Text>
                  <Image source={imgWash} />
                </View>
                <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                <View style={viewContainer}>
                  <Text style={textContainer}>{`${this.state.vehicleDetails[0].make_name} ${this.state.vehicleDetails[0].model_name}`}</Text>
                  <Image source={vehicleTypes[this.state.vehicleDetails[0].vehicle_type]} style={{ height: 11, width: 32 }} />
                </View>
                <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                <View style={viewContainer}>
                  <Text style={textContainer}>{this.state.userDetails.location_name}</Text>
                  <Image source={icPin} />
                </View>
              </View>
            </WhiteBg>
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingLeft: 15, paddingRight: 15, }}>
              <Image source={icCheck} />
              <Text style={[textContainer, { marginLeft: 10, }]}>{strings.savedLocationMessage}</Text>
            </View>
          </View>
          <AlbumDetail>
            <AlbumDetailSection>
              <Input
                placeholder={strings.villApartmentNo}
                onChangeText={villApartmentNo => this.setState({ villApartmentNo })}
              />
            </AlbumDetailSection>
            <AlbumDetailSection>
              <Input
                placeholder={strings.remarks}
                onChangeText={remarks => this.setState({ remarks })}
              />
            </AlbumDetailSection>
            <AlbumDetailSection>
              <Input
                placeholder={strings.specialRequest}
                onChangeText={specialRequest => this.setState({ specialRequest })}
              />
            </AlbumDetailSection>
            <Text style={{ fontSize: 12, fontFamily: 'Lato-Italic', color: '#536788', marginLeft: 15, marginRight: 15 }}>{strings.requestMessage}</Text>
          </AlbumDetail>

        </ScrollView>
        </KeyboardAvoidingView>
        <View style={{ padding: 15 }}>
          <View style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5, marginBottom: 20}}>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={[styles.gradientContainer]}>
                <TouchableOpacity onPress={this.changeMode.bind(this, 'Cash')}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                    style={[styles.linearGradient, {borderWidth:1, borderColor: this.state.cashModeColor}]}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icCash} style={{ tintColor: this.state.cashModeColor }} />
                      <Text style={[buttonContainer, {color: this.state.cashModeColor}]}>{strings.cash}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={[styles.gradientContainer]}>
                <TouchableOpacity onPress={this.changeMode.bind(this, 'Credit Card')}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                    style={[styles.linearGradient, {borderWidth:1, borderColor: this.state.paymentModeColor}]}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icCreditCard} style={{ tintColor: this.state.paymentModeColor }} />
                      <Text style={[buttonContainer, {color: this.state.paymentModeColor}]}>{strings.creditCard}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Button label='Continue' onPress={() => this.openPaymentScreen()} />
        </View>
      </View>
      </GSideMenu>
    );
  }
}
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
  },
  buttonContainer: {
    alignItems: 'center',
    fontSize: 10,
    fontFamily: 'Lato-Bold',
    color: '#FFFFFF',
    marginLeft: 10
  },
  linearGradient: {
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  gradientContainer: {
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  viewStyle: {
    backgroundColor: '#f3f6f9',
    height: 85,
  },
  container: {
    height: 70,
  },
  statusTextContainer: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#666666'
  },
  roundTextContainer: {
    fontSize: 10,
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    padding: 2,
    textAlign: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedBgContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#3386a2',
    borderWidth: 1,
    borderColor: '#3386a2',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

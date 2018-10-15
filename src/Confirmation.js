import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import { WhiteBg, CustomItemStatusBar, AlbumDetail, AlbumDetailSection, Input, placeOrder, Loader, addLocation} from './common';


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

    let washingDate = 'washingDate' in props.navigation.state.params ? 
                                                         props.navigation.state.params.washingDate :
                                                         moment();

    let washingTime = 'washingTime' in props.navigation.state.params ? 
                                                         props.navigation.state.params.washingTime :
                                                         moment().add('45', 'minutes');                                                                                                                                                              

    this.state = {
        userDetails: userDetails,
        service: service,
        price: price,
        vehicleDetails: vehicleDetails, 
        villApartmentNo: '',
        remarks: '',
        specialRequest: '',
        washingDate: washingDate,
        washingTime: washingTime,
        loading: false
    };
  }


  componentDidMount(){
    //console.log(this.state.washingDate, this.state.washingTime);
  }

  async openPaymentScreen(mode) {

    const { navigate } = this.props.navigation;


    let services = await this.state.service.serviceType.filter(x => x.status).map(({id, serviceName, status}) => id);

    if(!this.state.villApartmentNo){
      Toast.show('Please provide villa/appartment no');
      return;
    }

    if(mode === 'payment'){

      this.setState({loading: true});


      /*let locationData = {
                            "title": this.state.userDetails.location_name,
                            "latitude": this.state.userDetails.currentCoordinates.latitude,
                            "longitude": this.state.userDetails.currentCoordinates.longitude
                         };

      
      let locationResponse = await addLocation(locationData);    */               

      let data = { 
                  "location_id": 1,
                  "vehicle_id": this.state.userDetails.vehicle_id, 
                  "service_id": this.state.service.id,
                  "services": services.join(','),
                  "washing_date": moment(this.state.washingDate).format('YYYY-MM-DD'), 
                  "washing_time": moment(this.state.washingTime).format('hh:mm a'),
                  "price": this.state.price, 
                  "villa_apartment_no": this.state.villApartmentNo, 
                  "remarks": this.state.remarks, 
                  "special_request": this.state.specialRequest
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
      Toast.show('Credit card option is not available');
    }

    //navigate('Payment', { isPopToRoute: true });
  }
  render() {
    const { topContainer, mainContainer, viewContainer, textContainer, transperantContainer, buttonContainer, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer  } = styles;

     return (
      <View style={topContainer}>
        <CustomItemStatusBar 
          secondIcon={icClose}
          onPressSecondIcon={() => this.props.navigation.goBack()}
          isConfirmation />
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
                  <Image source={icCar} style={{ height: 11, width: 32 }} />
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
          <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={[styles.gradientContainer]}>
                <TouchableOpacity onPress={this.openPaymentScreen.bind(this, 'payment')}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                    style={[styles.linearGradient, {borderWidth:1, borderColor: '#f2b568'}]}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icCash} style={{ tintColor: '#f2b568' }} />
                      <Text style={[buttonContainer, {color: '#f2b568'}]}>{strings.cash}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={[styles.gradientContainer]}>
                <TouchableOpacity onPress={this.openPaymentScreen.bind(this, 'creditCard')}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                    style={[styles.linearGradient, {borderWidth:1, borderColor: '#546889'}]}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icCreditCard} style={{ tintColor: '#546889' }} />
                      <Text style={[buttonContainer, {color: '#546889'}]}>{strings.creditCard}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
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

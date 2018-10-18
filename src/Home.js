import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, StatusBar, AsyncStorage, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { CustomItemStatusBar, Search, FeedBack, OrderDone, Button, ButtonSmall, BlueRoundBg, Get, getCustomerVehicles, SearchAutoComplete, windowHeight, maxHeightChk, OrangeBg, addLocation, Post } from './common';
import FlipToggle from 'react-native-flip-toggle-button';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Dash from 'react-native-dash';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {DOMParser} from 'xmldom';
//import DeviceInfo from 'react-native-device-info';

const mapTemplate = require('./Image/mapTemplate.png');
const icDownArrow = require('./Image/ic_down_arrow.png');
const icUpArrow = require('./Image/ic_up_arrow.png');
const icWatch = require('./Image/ic_watch.png');
const icPlus = require('./Image/ic_plus.png');
const icLocation = require('./Image/ic_location.png');
const icSearch = require('./Image/ic_search.png');
const globleString = require('./language/languageText');
const icCorrect = require('./Image/ic_correct_white.png');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const { width, height } = Dimensions.get('window');
const strings = globleString.default.strings;

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class Home extends React.Component {
  constructor(props) {
    super(props);


    let newOrderDetails = props.navigation.state.params ? 
                                                         (props.navigation.state.params.newOrderDetails ? 
                                                            props.navigation.state.params.newOrderDetails : {}) :
                                                         null;

    this.state = {
      selectVehicleHeight: null,
      mapRegion: {
              latitude: 25.276987,
              longitude: 55.296249,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            },
      currentCoordinates: {
                            latitude: 37.78825,
                            longitude: -122.4324
                          },
      allowMarkers: false,
      vehicles: [],
      vehicle_id: null,   
      location_name: null, 
      googleApiKey: 'AIzaSyCHOJ-y4Q__IMjVQJ4ZKT4n3eO8TS7uGSk',
      newOrderDetails: newOrderDetails,
      modal: true        
    };
  }


  async componentDidMount(){
    let vehicles = await getCustomerVehicles(); 
    this.setState({vehicles: vehicles});


    /*let locationData = {
                            "title": "tesst...",
                            "latitude": 111.222,
                            "longitude": 222.222
                         };

      
      let locationResponse = await addLocation(locationData);

      console.log('location response', locationResponse);*/


      /*let userData =  await AsyncStorage.getItem('userData');
      let user = JSON.parse(userData);

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
                <mobile>
                  <store>20943</store>
                  <key>Kjv3B-ZZ2m#R2zjK</key>
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
                    <type>SALE</type>
                    <class>ECOM</class>
                    <cartid>1</cartid>
                    <description>Test Transaction</description>
                    <currency>AED</currency>
                    <amount>11</amount>
                    <ref></ref>
                  </tran>
                  <card>
                    <number>4000000000000002</number>
                    <expiry>
                      <month>12</month>
                      <year>2018</year>
                    </expiry>
                    <cvv>123</cvv>
                  </card>
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
                </mobile>`;*/


 //console.log(xml);                 


//let response = await Post({url: 'https://secure.innovatepayments.com/gateway/mobile.xml', data: xml});

//console.log('payment response: ',response);


/*var doc = new DOMParser().parseFromString(
    '<xml xmlns="a" xmlns:c="./lite">\n'+
        '\t<child>test</child>\n'+
        '\t<child></child>\n'+
        '\t<child/>\n'+
    '</xml>'
    ,'text/xml');
doc.documentElement.setAttribute('x','y');
doc.documentElement.setAttributeNS('./lite','c:x','y2');
var nsAttr = doc.documentElement.getAttributeNS('./lite','x')
console.info(nsAttr)
console.info(doc)*/
  }

  openServiceStatusScreen() {
    const { navigate } = this.props.navigation;
    navigate('ServiceStatus');
  }
  openSubscriptionToPackagesScreen() {
    const { navigate } = this.props.navigation;
    navigate('Packages');
  }
  openAddNewVehiclesScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewVehicles');
  }
  openScheduleWashScreen() {

    if(!this.state.location_name){
      Toast.show('Please select location');
      return;
    }

    if(!this.state.vehicle_id){
      Toast.show('Please select vehicle');
      return;
    }

    const { navigate } = this.props.navigation;
    navigate({key:'ScheduleWash', 
              routeName:'ScheduleWash', 
              params: { userDetails: { 
                          currentCoordinates: this.state.currentCoordinates,
                          vehicle_id: this.state.vehicle_id,
                          location_name: this.state.location_name,
                          locationDistanceTime: this.state.locationDistanceTime,
                          locationDistanceText: this.state.locationDistanceText
                        }
                      }
            });
  }
  openChooseServiceScreen() {

    if(!this.state.location_name){
      Toast.show('Please select location');
      return;
    }

    if(!this.state.vehicle_id){
      Toast.show('Please select vehicle');
      return;
    }

    const { navigate } = this.props.navigation;
    navigate({key:'ChooseService', 
              routeName:'ChooseService', 
              params: { userDetails: { 
                          currentCoordinates: this.state.currentCoordinates,
                          vehicle_id: this.state.vehicle_id,
                          location_name: this.state.location_name
                        }
                      }
            });
  }


  openServiceStatus(){
    this.setState({modal: false});

    const { navigate } = this.props.navigation;
    navigate('ServiceStatus');
  }


  userCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(
          (position) => {

            this.calculateDistance(position.coords.latitude, position.coords.longitude);

            this.setState({
              locationServiceOn: true,
              allowMarkers: true,
              mapRegion: {
                  latitude:       position.coords.latitude,
                  longitude:      position.coords.longitude,
                  latitudeDelta:  0.015,
                  longitudeDelta: 0.0121
                },
                currentCoordinates: { latitude: position.coords.latitude, longitude: position.coords.longitude }});


            this.setLocation(position);
      },
      (error) => { alert('Error getting location'); },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
  }


 async setLocation(position){
    let responseJson = await Get({url:`https://maps.googleapis.com/maps/api/geocode/json?address=${position.coords.latitude},${position.coords.longitude}&key=${this.state.googleApiKey}`});        
    this.setState({location_name: responseJson.data.results[0].formatted_address ? responseJson.data.results[0].formatted_address : ''});
 }


 selectLocation = (details) => {

    this.calculateDistance(details.geometry.location.lat, details.geometry.location.lng);

    this.setState({allowMarkers: true, 
                                 mapRegion: {
                                  latitude:       details.geometry.location.lat,
                                  longitude:      details.geometry.location.lng,
                                  latitudeDelta:  0.015,
                                  longitudeDelta: 0.0121
                                 },
                                 currentCoordinates: { latitude: details.geometry.location.lat, 
                                                       longitude: details.geometry.location.lng 
                                                     },
                                 location_name: details.formatted_address                    
                                });
  }


  async calculateDistance(lat, lng){
    let responseJson = await Get({url: `https://maps.googleapis.com/maps/api/distancematrix/json?
                                        units=imperial
                                        &origins=25.07557,55.14536
                                        &destinations=${lat},${lng}
                                        &key=${this.state.googleApiKey}`});

    let locationDistance = responseJson.data.rows[0]['elements'][0].duration.text.split(' ');

    console.log(responseJson);

    this.setState({locationDistanceTime: locationDistance[0], locationDistanceText: locationDistance[1]}, () => {
      if(this.marker){
        this.marker.hideCallout();
      }
    });
  }

  render() {
    const { mainContainer, textContainer, buttonStyle, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer } = styles;
    return (
      <View style={mainContainer}>
      {this.state.newOrderDetails &&
          <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.modal}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                  <View>
                    <Image source={require('./Image/ic_logo_new.png')} style={{width: 110, height: 120}} />
                  </View>
                  <View style={{marginTop: 20}}>
                    <Text style={styles.thankYouText}>THANK YOU</Text>

                    <View style={{marginTop: 15}}>
                      <Text style={styles.teamText}>Our team will be there at</Text>
                    </View>

                    <View style={{marginTop: 15}}>
                      <Text style={styles.timeText}>{this.state.newOrderDetails.washing_time} - {moment(this.state.newOrderDetails.washing_date).format('dddd, DD MMMM, YYYY')}</Text>
                    </View>

                    <View style={{marginTop: 15}}>
                      <Text style={styles.orderText}>ORDER NO.: <Text style={{fontWeight: 'bold', letterSpacing: 0.8}}>{this.state.newOrderDetails.id}</Text></Text>
                    </View>

                    <View style={{marginTop: 15}}>
                      <Text style={styles.teamText}>Press the button below to track the service status.</Text>
                    </View>
                    <View style={{marginTop: 5}}>
                      <Button 
                        label={strings.servicestatus} 
                        onPress={this.openServiceStatus.bind(this)} />
                    </View>    

                  </View>  
              </View>
            </View>
          </Modal>
        }
        <CustomItemStatusBar isLocation />
        <View style={{ flex: 0, justifyContent: 'space-between', backgroundColor: '#f3f6f9', height: windowHeight }}>
        <View style={[styles.container]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={this.state.mapRegion}
            onRegionChangeComplete={() => this.marker ? this.marker.showCallout() : ''}
          >
          {this.state.allowMarkers &&
            <Marker identifier='current_location' 
                    ref={marker => (this.marker = marker)}
                    coordinate={this.state.currentCoordinates} 
                    image={require('./Image/ic_logo_1.png')}
                    >

               <Callout tooltip={true}>
               <OrangeBg>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                  <View style={{ padding: 10, flex: 8, flexDirection: 'row'}}>
                    <View style={{ flex: 5, Direction: 'column', justifyContent: 'center', }}>
                      <Text style={[styles.packageNameContainer, { color: '#FFFFFF' }]}>Here I am</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={styles.topOval} />
                    <Dash dashColor='#F2B568' style={styles.dashContainer} />
                    <View style={styles.bottomOval} />
                  </View>
                  <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingLeft: 0, paddingRight: 8 }}>
                    <Text style={styles.packagesNumberContainer}><Text style={{fontSize: 20}}>{this.state.locationDistanceTime || '♾️'}</Text> {this.state.locationDistanceText || 'mins'}</Text>
                  </View>
                </View>  
                </OrangeBg>
               </Callout>
            </Marker>
          }
          </MapView>
        </View>
        {/*
            <Search
              firstIcon={icSearch}
              placeholder='Search..'
            />
          */}
          <View style={{flex: 0}}>
            <GooglePlacesAutocomplete
                    listViewDisplayed={ false }
                    enablePoweredByContainer={false}
                    placeholder={strings.search}
                    minLength={3}
                    autoFocus={false}
                    fetchDetails={true}
                    currentLocation={false}
                    currentLocationLabel="➤ User Current location"
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    //console.log(details.geometry);
                     this.selectLocation(details);
                  }}

                  getDefaultValue={() => {
                      return ''; // text input default value
                    }}
                    query={{
                      //types: '(cities)',
                      key: this.state.googleApiKey,
                      language: 'en'
                    }}
                    styles={{
                      textInputContainer: {
                        marginLeft: 20,
                        marginRight: 20,
                        paddingLeft: 10,
                        height: 45,
                        flexDirection: 'row',
                        borderRadius: 10,
                        backgroundColor: '#FFFFFF',
                        shadowColor: 'rgba(35, 50, 74, 0.12)',
                        borderColor: '#FFFFFF',
                        shadowOffset: {
                          width: 0,
                          height: 9
                        },
                        shadowRadius: 5,
                        shadowOpacity: 1,
                        margin: 5,
                        alignItems: 'center',
                        elevation: 2
                      },
                      textInput: {
                        flex: 1,
                        fontSize: 15,
                        fontFamily: 'Lato-Regular',
                        color: '#BEBEBE',
                        marginTop: -1,
                        borderWidth: 0,
                        backgroundColor: '#FFFFFF'
                      },
                      predefinedPlacesDescription: {
                        color: '#000000',
                        fontFamily: "Lato",
                        fontWeight: 'bold',
                        color: '#666666',
                        backgroundColor: '#FFFFFF'
                      },
                      listView: {
                        borderTopWidth: 1,
                        borderColor: "#d4d3d3",
                        maxHeight: height,
                        position: 'absolute',
                        top: 50,
                        backgroundColor: '#ffffff',
                        margin: 5,
                        marginTop: 0,
                        borderRadius: 10,
                        marginLeft: 20,
                        marginRight: 20,
                      }
                    }}
                    //nearbyPlacesAPI={'GooglePlacesSearch'}
                    //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                    renderLeftButton={()  => <Image source={icSearch} style={{marginLeft: 5}} />}
                  />
          </View>        
            
          <View style={{position: 'absolute', width: width, bottom: 170, left: 0, right: 0}}>
            <View style={{ flexDirection: 'row', paddingLeft: 15, paddingRight: 15, }}>
              <View style={{ flex: 1 }} />
              <View style={{ width: 57 }}>
                <ButtonSmall imgSource={icLocation} onPress={this.userCurrentLocation.bind(this)} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 15, paddingRight: 15, }} >
              <View style={{ flex: 3 }} >
                <BlueRoundBg
                  onPress={this.openAddNewVehiclesScreen.bind(this)}
                >
                  <View style={buttonStyle}>
                    <Image source={icPlus} />
                    <Text style={textContainer}>{strings.addVehicle}</Text>
                  </View>
                </BlueRoundBg>
              </View>
              <View style={{ flex: 4 }} >
                <BlueRoundBg>
                  <View style={buttonStyle}>
                    <Text style={textContainer}>{strings.savedLocation}</Text>
                    <Image source={icDownArrow} style={{ tintColor: '#FFFFFF' }} />
                  </View>
                </BlueRoundBg>
              </View>
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }} >
              <SearchAutoComplete 
                search={false}
                placeholder='Choose Vehicle' 
                secondIcon={icDownArrow} 
                secondAlternateIcon={icUpArrow} 
                data={this.state.vehicles}
                dataProps={{id: 'data.id', 
                            format: ['data.make_name', 'data.model_name', 'data.model_years'],
                            findKeys: ['make_name', 'model_name', 'model_years']
                          }}
                onSelection={vehicle_id => this.setState({vehicle_id})} />
            </View>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <View style={{ flex: 4 }}>
                <Button label={strings.myPackages} onPress={this.openSubscriptionToPackagesScreen.bind(this)} />
              </View>
              <View style={{ flex: 3 }}>
                <Button label={strings.washNow} onPress={this.openChooseServiceScreen.bind(this)} />
              </View>
              <View style={{ flex: 2 }}>
                <Button imgSource={icWatch} onPress={this.openScheduleWashScreen.bind(this)} />
              </View>
            </View>
          </View>
        </View>
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
  textContainer: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: '#007AFF'
  },
  subView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
  },
  buttonStyle: {
    padding: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
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
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject },
  packageNameContainer: {
    padding: 3,
    fontSize: 13,
    fontFamily: 'Roboto',
    color: '#42B6D2',
    paddingLeft: 10 },
  validUntilDateContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: '#F2B568'
  },
  packagesNumberContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Roboto',
    color: '#fbfcfd'
  },
  dashContainer: {
    width: 1,
    flex: 1,
    flexDirection: 'column',
  },
  topOval: {
        height: 6,
        width: 14,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#f2f1f2'
  },
  bottomOval: {
        height: 6,
        width: 14,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#f2f1f2'
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: width,
    height: windowHeight/ (windowHeight > maxHeightChk ? 1.5 : 1.3),
    padding: 25
  },
  thankYouText:{
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.9,
    textAlign: "center",
    color: "#5f7290"
  },
  teamText: {
    fontFamily: "Montserrat",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#5f7290"
  },
  timeText: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#f2b568"
  },
  orderText: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#5f7290"
  }
});

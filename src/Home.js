import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, StatusBar, AsyncStorage, TouchableOpacity } from 'react-native';
import { CustomItemStatusBar, Search, FeedBack, OrderDone, Button, ButtonSmall, BlueRoundBg, Get, getCustomerVehicles, SearchAutoComplete, windowHeight } from './common';
import FlipToggle from 'react-native-flip-toggle-button';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Dash from 'react-native-dash';
import Toast from 'react-native-simple-toast';
import { OrangeBg } from './common';

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
                                                         {};

    this.state = {
      selectVehicleHeight: null,
      mapRegion: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            },
      currentCoordinates: {
                            latitude: 37.78825,
                            longitude: -122.4324
                          },
      allowMarkers: false,
      vehicles: {},
      vehicle_id: null,   
      location_name: null, 
      googleApiKey: 'AIzaSyAlYrDbenRCp4MI3nfekyiawLfCdihXboM',
      newOrderDetails: newOrderDetails          
    };
  }


  async componentDidMount(){
    let vehicles = await getCustomerVehicles(); 
    this.setState({vehicles: vehicles});
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
                          location_name: this.state.location_name
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


  userCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(
          (position) => {

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

  render() {
    const { mainContainer, textContainer, buttonStyle, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer } = styles;
    return (
      <View style={mainContainer}>
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
                    <Text style={styles.packagesNumberContainer}><Text style={{fontSize: 20}}>45</Text> mins</Text>
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
                        paddingLeft: 10,
                        paddingRight: 10,
                        height: 45,
                        flexDirection: 'row',
                        borderRadius: 10,
                        backgroundColor: '#FFFFFF',
                        shadowColor: '#707070',
                        borderColor: '#FFFFFF',
                        shadowOffset: {
                          width: 0,
                          height: 3
                        },
                        shadowRadius: 5,
                        shadowOpacity: 0.3,
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
                        paddingLeft: 10,
                        paddingRight: 20
                      },
                      predefinedPlacesDescription: {
                        color: '#000000',
                        fontFamily: "Lato",
                        fontWeight: 'bold',
                        color: '#666666'
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
                        borderRadius: 10
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
                placeholder='Nissan Maxima' 
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
  }
});

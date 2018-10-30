import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CustomItemStatusBar, Button, WhiteButtonSmall, Get, windowHeight, maxHeightChk, updateOrderStatus, ORDER_STATUS_ON_WAY, Loader } from '../common';
import FlipToggle from 'react-native-flip-toggle-button';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Toast from 'react-native-simple-toast';
import MapViewDirections from 'react-native-maps-directions';

const icDownArrow = require('../Image/ic_down_arrow.png');
const icLocation = require('../Image/ic_location.png');
const globleString = require('../language/languageText');
const { width, height } = Dimensions.get('window');
const strings = globleString.default.strings;

import GSideMenu from '../GSideMenu';

export default class StartJob extends React.Component {
  constructor(props) {
    super(props);

    let id = props.navigation.state.params ? props.navigation.state.params.id : null;

    let customerLocation = props.navigation.state.params ? props.navigation.state.params.customerLocation : null;

    this.state = {
      id: id,
      customerLocation: customerLocation,
      mapRegion: {
              latitude: 25.07557,
              longitude: 55.14536,
              latitudeDelta: 0.285,
              longitudeDelta: 0.2821,
            },
      currentCoordinates: {
                            latitude: 25.197525,
                            longitude: 55.274288
                          },
      allowMarkers: false,
      googleApiKey: 'AIzaSyCHOJ-y4Q__IMjVQJ4ZKT4n3eO8TS7uGSk',
      loading: false
    };
  }


  async componentDidMount(){
    this.userCurrentLocation();
  }

  async openBeforeWashScreen(){

    this.setState({loading: true});

    let data = {
                  "order_id": this.state.id,
                  "status": ORDER_STATUS_ON_WAY
               };

    let response = await updateOrderStatus(data);  

    this.setState({loading: false});

    if(parseInt(response.data.status) === 1){
      const { navigate } = this.props.navigation;
      navigate({key:'BeforeWash', 
              routeName:'BeforeWash', 
              params: { 
                          id: this.state.id
                      }
            });
    } 
    else{
      Toast.show('Something went wrong');
    }      
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
                  latitudeDelta:  0.285,
                  longitudeDelta: 0.2821
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


  async calculateDistance(lat, lng){

    let responseJson = await Get({url: `https://maps.googleapis.com/maps/api/distancematrix/json?
                                        units=imperial
                                        &origins=${this.state.customerLocation.latitude},${this.state.customerLocation.longitude}
                                        &destinations=${lat},${lng}
                                        &key=${this.state.googleApiKey}`});

    let locationDuration = responseJson.data.rows[0]['elements'][0].duration.text.split(' ');

    let locationDistance = responseJson.data.rows[0]['elements'][0].distance.text.split(' ');

    console.log({responseJson});

    this.setState({locationDuration: locationDuration[0], 
                   locationDurationUnit: locationDuration[1],
                   locationDistance: locationDistance[0], 
                   locationDistanceUnit: locationDistance[1]
                  });
  }

  render() {
    const { mainContainer, container } = styles;
    return (
      <GSideMenu
        navigation={this.props.navigation}
        isCustomerLocation
      >
        {this.state.loading &&
          <Loader loading={this.state.loading} message='Please wait..' />
        }
        <View style={mainContainer}>
          <View style={{ flex: 0, justifyContent: 'space-between', backgroundColor: '#f3f6f9', height: windowHeight }}>
          <View style={[styles.container]}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={this.state.mapRegion}
              onRegionChangeComplete={() => { 
                                              this.marker1 ? this.marker1.showCallout() : '';
                                              this.marker2 ? this.marker2.showCallout() : '';
                                            }
                                      }
            >
            {this.state.allowMarkers &&
              <View>
                <Marker 
                    identifier='washer_location'     
                    coordinate={this.state.currentCoordinates} 
                    ref={marker => (this.marker1 = marker)}          
                >
                    <Callout tooltip>
                      <View style={styles.myLocationContainer}>
                        <Text style={styles.myLocationText}>My Location</Text>
                      </View> 
                    </Callout>
                </Marker>

                <Marker 
                  identifier='customer_location' 
                  coordinate={{
                                latitude: parseFloat(this.state.customerLocation.latitude),
                                longitude: parseFloat(this.state.customerLocation.longitude)
                             }} 
                  ref={marker => (this.marker2 = marker)}
                >
                    <Callout tooltip>
                      <View style={[styles.myLocationContainer, {borderColor: '#159de4'}]}>
                        <Text style={[styles.myLocationText, {color: '#159de4'}]}>Customer Location</Text>
                      </View> 
                    </Callout>
                </Marker>          

                <MapViewDirections
                  origin={this.state.currentCoordinates}
                  destination={{
                                latitude: parseFloat(this.state.customerLocation.latitude),
                                longitude: parseFloat(this.state.customerLocation.longitude)
                             }}
                  apikey={this.state.googleApiKey}
                  strokeWidth={3}
                  strokeColors={[
                      '#238C23',
                      '#7F0000'
                    ]}
                />
              </View>
              }
            </MapView>
          </View>
        
            <View style={{position: 'absolute', width: width, bottom: 142, left: 0, right: 0, backgroundColor: '#FFFFFF', opacity: 0.9, paddingTop: 10}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
               <View style={styles.timeTextContainer}>
                <Text style={styles.timeText}>
                    {this.state.locationDuration}
                </Text>
                <Text style={styles.timeTextSmall}>
                  {this.state.locationDurationUnit}
                </Text>
               </View>
               <View style={styles.timeTextContainer}> 
                <Text style={styles.timeText}>
                    {this.state.locationDistance}
                </Text>
                <Text style={styles.timeTextSmall}>
                  {this.state.locationDistanceUnit}
                </Text>
               </View> 
              </View>
              <View style={{paddingLeft: 30, paddingRight: 30}}>
                <Button label={strings.startAJob} customStyles={{margin: 0}} onPress={() => this.openBeforeWashScreen()} />
              </View>
              <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, }}>
                <View style={{ flex: 1 }} />
                <View style={{ width: 57 }}>
                  <WhiteButtonSmall 
                    customStyles={{
                      backgroundColor: '#FFFFFF', 
                      shadowColor: "rgba(54, 39, 40, 0.16)",
                      shadowOffset: {
                        width: 1,
                        height: 3.5
                      },
                      shadowRadius: 3.5,
                      shadowOpacity: 1,
                      elevation: 2,
                      borderWidth: 0
                    }} 
                    imageCustomStyles= {{
                      tintColor: '#159de4'
                    }}
                    imgSource={icLocation} 
                    onPress={this.userCurrentLocation.bind(this)} />
                </View>
              </View>
            </View>
          </View>
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
  container: {
    height: 70,
  },
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject },
  timeTextContainer: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  timeText: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "left",
    color: "#5f7290",
    marginRight: 5
  },
  timeTextSmall: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: "left",
    color: "#5f7290"
  },
  myLocationContainer: {
    borderRadius: 50,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(54, 39, 40, 0.16)",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#55caa9",
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 10
  },
  myLocationText: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "center",
    color: "#56caa9"
  }

});

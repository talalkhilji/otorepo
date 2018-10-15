import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import Dash from 'react-native-dash';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { CustomItemStatusBar, Button, WhiteBg, Search, OrangeBg } from './common';

const mapTemplate = require('./Image/mapTemplate.png');
const icUpDownArrow = require('./Image/ic_up_down_arrow.png');
const icSearch = require('./Image/ic_search.png');
const globleString = require('./language/languageText');
const icCorrect = require('./Image/ic_correct_white.png');
const icClose = require('./Image/ic_close.png');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const { width } = Dimensions.get('window');
const strings = globleString.default.strings;

export default class ScheduleWash extends React.Component {
  constructor(props) {
    super(props);

    let userDetails = 'userDetails' in props.navigation.state.params ? 
                                                         props.navigation.state.params.userDetails :
                                                         {};

    this.state = {
      userDetails: userDetails,
      date: moment(),
      time: moment(),
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      hour: moment().format('hh'),
      minute: moment().format('mm'),
      ampm: moment().format('a'),
      day: moment().format('DD'),
      month: moment().format('MMM'),
      year: moment().format('YYYY'),
      mapRegion: {
          latitude: userDetails.currentCoordinates.latitude,
          longitude: userDetails.currentCoordinates.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
      }
    };
  }
  openChooseServiceScreen() {

    let selectDate = `${moment(this.state.date).format('YYYY-MM-DD')} ${this.state.hour}:${this.state.minute}:00`;

    if(moment() > moment(selectDate)){
       Toast.show('Please select future date for schedule wash');
       return;
    }

    const { navigate } = this.props.navigation;
    navigate({key: 'ChooseService', 
              routeName: 'ChooseService', 
              params: {
                userDetails: this.state.userDetails,
                washDate: moment(this.state.date),
                washTime: moment(this.state.time)
              }
            });
  }
  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = (time) => {
    console.log('A date has been picked: ', time);
    this.setState({ hour: moment(time).format('HH'),
                    minute: moment(time).format('mm'),
                    ampm: moment(time).format('a'),
                    time: moment(time)
                  });
    this._hideTimePicker();
  };

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ day: moment(date).format('DD'), 
                    month: moment(date).format('MMM'),
                    year: moment(date).format('YYYY'),
                    date: moment(date)
                  });
    this._hideDatePicker();
  };
  render() {
    const { mainContainer, datetimeViewContainer, datetimeTextContainer, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer } = styles;
    return (
      <View style={mainContainer}>
        <CustomItemStatusBar 
          secondIcon={icClose}
          onPressSecondIcon={() => this.props.navigation.goBack()}
          isLocation />
        <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#f3f6f9' }}>
         {/* <View>
            
            <View style={{ marginTop: 15 }}>
              <Search
                firstIcon={icSearch}
                placeholder='Search..'
              />
            </View>
          
          </View>*/}
          <View style={[styles.container]}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={this.state.mapRegion}
            onRegionChangeComplete={() => this.marker ? this.marker.showCallout() : ''}
          >
            <Marker identifier='current_location' 
                    ref={marker => (this.marker = marker)}
                    coordinate={this.state.userDetails.currentCoordinates} 
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
          </MapView>
          </View>
          <View style={{ padding: 10, position: 'absolute', bottom: 0, width: width }}>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <WhiteBg>
                <View style={{ flex: 1, }}>
                  <TouchableOpacity onPress={this._showTimePicker}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                      <View style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 11, fontFamily: 'Montserrat-Bold', color: '#666666', marginLeft: 10 }}>{strings.time}</Text>
                      </View>
                      <View style={datetimeViewContainer}>
                        <Text style={datetimeTextContainer}>{this.state.hour}</Text>
                        <Image source={icUpDownArrow} />
                      </View>
                      <View style={styles.colonSeparator}>
                        <Text>:</Text>
                      </View>  
                      <View style={datetimeViewContainer}>
                        <Text style={datetimeTextContainer}>{this.state.minute}</Text>
                        <Image source={icUpDownArrow} />
                      </View>
                      <View style={styles.colonSeparator}>
                        <Text>:</Text>
                      </View>  
                      <View style={datetimeViewContainer}>
                        <Text style={datetimeTextContainer}>{this.state.ampm}</Text>
                        <Image source={icUpDownArrow} />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={{ backgroundColor: '#E3E8F0', height: 1 }} />
                    <TouchableOpacity onPress={this._showDatePicker}>
                      <View style={{ flexDirection: 'row', margin: 10 }}>
                          <View style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
                              <Text style={{ fontSize: 11, fontFamily: 'Montserrat-Bold', color: '#666666', marginLeft: 10 }}>{strings.date}</Text>
                          </View>
                          <View style={datetimeViewContainer}>
                            <Text style={datetimeTextContainer}>{this.state.day}</Text>
                            <Image source={icUpDownArrow} />
                          </View>
                          <View style={datetimeViewContainer}>
                            <Text style={datetimeTextContainer}>{this.state.month}</Text>
                            <Image source={icUpDownArrow} />
                          </View>
                          <View style={datetimeViewContainer}>
                            <Text style={datetimeTextContainer}>{this.state.year}</Text>
                            <Image source={icUpDownArrow} />
                          </View>
                      </View>
                    </TouchableOpacity>    
                </View>
              </WhiteBg>
              <DateTimePicker
                isVisible={this.state.isTimePickerVisible}
                onConfirm={this._handleTimePicked}
                onCancel={this._hideTimePicker}
                mode='time'
              />
              <DateTimePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDatePicker}
                mode='date'
              />
            </View>
            <Button label={strings.continue} onPress={this.openChooseServiceScreen.bind(this)} />
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
  datetimeViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  datetimeTextContainer: {
    fontSize: 13,
    fontFamily: 'Lato-Regular',
    color: '#666666'
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
  colonSeparator: {
    color: '#3b3b3b',
    marginTop: 3
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
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject }
});

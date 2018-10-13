import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { CustomItemStatusBar, Button, WhiteBg, Search } from './common';

const mapTemplate = require('./Image/mapTemplate.png');
const icUpDownArrow = require('./Image/ic_up_down_arrow.png');
const icSearch = require('./Image/ic_search.png');
const globleString = require('./language/languageText');
const icCorrect = require('./Image/ic_correct_white.png');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const { width } = Dimensions.get('window');
const strings = globleString.default.strings;

export default class ScheduleWash extends React.Component {
  constructor(props) {
    super(props);

    let userDetails = 'userDetails' in props.navigation.state.params ? 
                                                         props.navigation.state.params.userDetails :
                                                         {};

                                                         console.log(userDetails);
    this.state = {
      userDetails: userDetails,
      date: '',
      time: '',
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      hour: '',
      minute: '',
      ampm: '',
      day: moment().format('DD'),
      month: moment().format('MMM'),
      year: moment().format('YYYY')
    };
  }
  openChooseServiceScreen() {

    let selectDate = `${this.state.year}-${this.state.month}-${this.state.day} ${this.state.hour}:${this.state.minute}:00`;

    if(moment() > moment(selectDate)){
       Toast.show('Please select future date for schedule wash');
       return;
    }

    const { navigate } = this.props.navigation;
    navigate('ChooseService');
  }
  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = (time) => {
    console.log('A date has been picked: ', time);
    this.setState({ hour: moment(time).format('HH') })
    this.setState({ minute: moment(time).format('mm') })
    this.setState({ ampm: moment(time).format('A') })
    this._hideTimePicker();
  };

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ day: moment(date).format('DD') })
    this.setState({ month: moment(date).format('MMM') })
    this.setState({ year: moment(date).format('YYYY') })
    this._hideDatePicker();
  };
  render() {
    const { mainContainer, datetimeViewContainer, datetimeTextContainer, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer } = styles;
    return (
      <View style={mainContainer}>
        <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#f3f6f9' }}>
          <Image source={mapTemplate} style={{ position: 'absolute', width }} />
          <View>
            <CustomItemStatusBar isLocation />
            <View style={{ marginTop: 15 }}>
              <Search
                firstIcon={icSearch}
                placeholder='Search..'
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
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
  }
});

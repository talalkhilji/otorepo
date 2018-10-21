import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';
import { AlbumDetail, AlbumDetailSection, Input, CustomStatusBar, Button, WhiteBg, Post, AutoComplete, Get, getCities, getVehicleDetails } from './common';

const icClose = require('./Image/ic_close.png');
const icBackArrow = require('./Image/ic_back.png');
const icDownArrow = require('./Image/ic_down_arrow.png');
const icQuestionMark = require('./Image/ic_question.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class LicensePlateDetails extends React.Component {

  constructor(props) {
    super(props);

    let vehicleBesicDetails = 'vehicleBesicDetails' in props.navigation.state.params ? 
                                                         props.navigation.state.params.vehicleBesicDetails :
                                                         {};                                   
                                                         
    this.state = {
      cities: [],
      vehicleBesicDetails,
      city_id: '',
      plate_no: '',
      plate_code: ''
    };
  }


  async componentDidMount(){

    let resCities = await getCities();

    let cities = [];

    await resCities.map(city => 
      cities.push({'label': city.name, 'value': city.id})
    );

    this.setState({cities});


    if(this.state.vehicleBesicDetails.vehicle_id){
      let vehicleDetails = await getVehicleDetails(this.state.vehicleBesicDetails.vehicle_id);

      //console.log('vehicleDetails: ', vehicleDetails);

      this.setState({
        city_name: vehicleDetails[0].plate_city,
        city_id: vehicleDetails[0].plate_city_id,
        plate_code: vehicleDetails[0].plate_place_code,
        plate_no: vehicleDetails[0].plate_number

      });
    }
    
  }

  openAddNewVehiclesScreen() {
    const { navigate } = this.props.navigation;
    navigate('HomeApp');
  }

  async addVehicle(){

    if(!this.state.city_id || !this.state.plate_no || !this.state.plate_code){
      Toast.show('Please provide the necessary information to proceed');
      return;
    }


   let userData =  await AsyncStorage.getItem('userData');
   let userId = JSON.parse(userData).id;

   let data = { 
               "make_id": this.state.vehicleBesicDetails.make_id, 
               "model_id": this.state.vehicleBesicDetails.model_id, 
               "years": this.state.vehicleBesicDetails.year, 
               "vehicle_type_id":this.state.vehicleBesicDetails.type_id, 
               "customer_id": userId, 
               "city_id": this.state.city_id, 
               "plate_number": this.state.plate_no, 
               "plate_place_code": this.state.plate_code, 
               "detail": null, 
               "color_id": this.state.vehicleBesicDetails.color_id 
              };


    let url = 'vehicle';

    if(this.state.vehicleBesicDetails.vehicle_id){
      url = `update_${url}`;
      data.vehicle_id = this.state.vehicleBesicDetails.vehicle_id;
    }       
              //console.log(data); return;

    response = await Post({url: url, data:data});

    //console.log(response);
    //Toast.show('Please provide the necessary information to proceed');
    //return;

    //const { navigate } = this.props.navigation;
    //navigate('Home');

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    
    this.props.navigation.dispatch(resetAction);

  }

  render() {
    const { mainContainer, } = styles;
      return (
        <View style={mainContainer}>
          <CustomStatusBar
            title='LICENSE PLATE DETAILS'
            onPressFirstIcon={() => this.props.navigation.goBack()}
            firstIcon={icBackArrow}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              <AlbumDetail>
                <RNPickerSelect
                  placeholder={{
                      label: strings.selectCity,
                      value: null,
                  }}
                  placeholderTextColor='#666666'
                  items={this.state.cities}
                  onValueChange={(city_id, index) => {
                      this.setState({ city_name: this.state.cities[index-1] ? this.state.cities[index-1].label : strings.selectCity, city_id});
                  }}
                >
                  <AlbumDetailSection>
                    <Input
                      imageSource={icDownArrow}
                      placeholder={strings.selectCity}
                      value={this.state.city_name}
                    />
                  </AlbumDetailSection>
                </RNPickerSelect>
                <AlbumDetailSection>
                  <Input
                    placeholder={strings.enterPlateNo}
                    onChangeText={plate_no => this.setState({ plate_no })}
                    value={this.state.plate_no}
                  />
                </AlbumDetailSection>
                <AlbumDetailSection>
                  <Input
                    placeholder={strings.enterPlateCode}
                    onChangeText={plate_code => this.setState({ plate_code })}
                    value={this.state.plate_code}
                  />
                </AlbumDetailSection>
              </AlbumDetail>
              <View style={{ flex: 0, justifyContent: 'center', padding: 10, marginLeft: 30, marginRight: 30 }} >
                <WhiteBg>
                  <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <View style={styles.RectangleShapeView} />
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <View style={[styles.RectangleShapeView, { height: 5, width: 15 }]} />
                        <View style={{ width: 10 * 20 }} />
                      <View style={[styles.RectangleShapeView, { height: 5, width: 15 }]} />
                    </View>
                    <View style={{ height: 70, paddingLeft: 20, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.plateTextContainer}>
                        <Text style={styles.plateText}>{this.state.plate_code || 'X'}</Text>
                      </View>  
                        <Text style={{ fontSize: 30, fontFamily: 'Montserrat-Bold', color: '#42B6D2', justifyContent: 'flex-end', }}>DUBAI</Text>
                      <View style={styles.plateTextContainer}>
                        <Text style={styles.plateText}>{this.state.plate_no || 'X'}</Text>
                      </View>
                    </View>
                  </View>
                </WhiteBg>
              </View>
            </View>
            <View style={{ padding: 20 }}>
              <Button
                label={strings.submit}
                onPress={this.addVehicle.bind(this)}
              />
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
    RectangleShapeView: {
      width: 10 * 15,
      height: 15,
      backgroundColor: '#E2E8EF',
      justifyContent: 'center',
    },
    plateTextContainer: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#77D5F2',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 10
    },
    plateText: {
      color: '#666666',
      fontSize: 18,
      fontFamily: 'Montserrat-Bold',
      textAlign: 'center'
    }
  });

import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import { AlbumDetail, AlbumDetailSection, Input, CustomStatusBar, Button, WhiteBg, Post, AutoComplete, Get, getCities } from './common';

const icClose = require('./Image/ic_close.png');
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
    let cities = await getCities();
    this.setState({cities});
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
               "vehicle_type_id":"1", 
               "customer_id": userId, 
               "city_id": this.state.city_id, 
               "plate_number": this.state.plate_no, 
               "plate_place_code": this.state.plate_code, 
               "detail": null, 
               "color_id": this.state.vehicleBesicDetails.color_id 
              };


              //console.log(data); return;

    response = await Post({url: 'vehicle', data:data});

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
            onPressSecondIcon={() => this.props.navigation.goBack()}
            secondIcon={icClose}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              <AlbumDetail>
                <AlbumDetailSection>
                  <AutoComplete
                    imageSource={icDownArrow}
                    placeholder={strings.selectCity}
                    onSelection={city_id => this.setState({ city_id })}
                    data={this.state.cities}
                    dataProps={{id: 'data.id'}}
                  />
                </AlbumDetailSection>
                <AlbumDetailSection>
                  <Input
                    placeholder={strings.enterPlateNo}
                    onChangeText={plate_no => this.setState({ plate_no })}
                  />
                </AlbumDetailSection>
                <AlbumDetailSection>
                  <Input
                    placeholder={strings.enterPlateCode}
                    onChangeText={plate_code => this.setState({ plate_code })}
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
                    <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                      <Input placeholder='X' />
                        <Text style={{ fontSize: 24, fontFamily: 'Montserrat-Bold', color: '#42B6D2', justifyContent: 'flex-end', }}>DUBAI</Text>
                      <Input placeholder='X' />
                      <Input placeholder='X' />
                      <Input placeholder='X' />
                      <Input placeholder='X' />
                      <Input placeholder='X' />
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
  });

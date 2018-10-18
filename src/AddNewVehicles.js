import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';
import { AlbumDetail, AlbumDetailSection, Input, CustomStatusBar, Button, Get, AutoComplete, getMakes, getMakeModels, getColors, getVehicleDetails, getVehicleTypes } from './common';

const icClose = require('./Image/ic_close.png');
const icDownArrow = require('./Image/ic_down_arrow.png');
const icUpArrow = require('./Image/ic_up_arrow.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class AddNewVehicles extends React.Component {
  constructor(props) {
    super(props);
    // this.props.setMenuInvisible;

    let vehicle_id = props.navigation.state.params ? props.navigation.state.params.vehicle_id : null;

    this.state = {
      vehicle_id: vehicle_id,
      makes: [],
      models:[],
      types: [],
      colors:[],
      make_id: '',
      model_id: '',
      type_id: '',
      year: '',
      color_id: ''                            
    }
  }


  async componentDidMount(){

    if(this.state.vehicle_id){
      let vehicleDetails = await getVehicleDetails(this.state.vehicle_id);

      this.setState({
        make_name: vehicleDetails[0].make_name,
        model_name: `${vehicleDetails[0].model_name}`,
        year: vehicleDetails[0].model_years,
        color_name: vehicleDetails[0].color_name,
        make_id: vehicleDetails[0].make_id,
        model_id: vehicleDetails[0].model_id,
        color_id: vehicleDetails[0].color_id,
        type_id: vehicleDetails[0].vehicle_type_id,
        type_name: vehicleDetails[0].vehicle_type
      }, () => {
        this.getMakeModels();
      });
    }

    let resMakes = await getMakes();
    let resColors = await getColors();
    let resTypes = await getVehicleTypes();

    let makes = [];

    await resMakes.map(make => 
      makes.push({'label': make.name, 'value': make.id})
    );

    let types = [];

    await resTypes.map(type => 
      types.push({'label': type.title, 'value': type.id})
    );

    let colors = [];

    await resColors.map(color => 
      colors.push({'label': color.name, 'value': color.id})
    );

    this.setState({makes, colors, types});
  }


  async getMakeModels(){
    let resModels = await getMakeModels(this.state.make_id);

    let models = [];

    await resModels.map(model => 
      models.push({'label': `${model.name}`, 'value': model.id})
    );

    this.setState({models});
  }

  openLicensePlateDetailsScreen() {

    console.log(this.state);

    if(!this.state.make_id || !this.state.model_id || !this.state.year || !this.state.color_id || !this.state.type_id){
      Toast.show('Please provide the necessary information to proceed');
      return;
    }

    const { navigate } = this.props.navigation;
    navigate({key: 'LicensePlateDetails', 
              routeName: 'LicensePlateDetails', 
              params: {vehicleBesicDetails: {
                                              vehicle_id: this.state.vehicle_id,
                                              make_id:this.state.make_id, 
                                              model_id:this.state.model_id,
                                              type_id: this.state.type_id,
                                              year:this.state.year,
                                              color_id:this.state.color_id
                                            }
              }
            });
    //navigate('LicensePlateDetails');
  }

  render() {
    const { mainContainer, } = styles;
      return (
        <View style={mainContainer}>
          <CustomStatusBar
            title={this.state.vehicle_id ? 'UPDATE VEHICLE' : 'ADD NEW VEHICLE'}
            onPressSecondIcon={() => this.props.navigation.goBack()}
            secondIcon={icClose}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View >
              <AlbumDetail>
                <RNPickerSelect
                  placeholder={{
                      label: strings.selectManufacturer,
                      value: null,
                  }}
                  placeholderTextColor='#666666'
                  items={this.state.makes}
                  onValueChange={(make_id, index) => {
                      this.setState({ make_name: this.state.makes[index-1] ? this.state.makes[index-1].label : strings.selectManufacturer, make_id, model_id: '', model_name: ''}, () => { this.getMakeModels(); });
                  }}
                >
                  <AlbumDetailSection>
                    <Input
                      imageSource={icDownArrow}
                      placeholder={strings.selectManufacturer}
                      value={this.state.make_name}
                    />
                  </AlbumDetailSection>
                </RNPickerSelect>

                <RNPickerSelect
                  placeholder={{
                      label: strings.selectModel,
                      value: null,
                  }}
                  placeholderTextColor='#666666'
                  items={this.state.models}
                  onValueChange={(model_id, index) => {
                      this.setState({ model_name: this.state.models[index-1] ? this.state.models[index-1].label : strings.selectModel, model_id});
                  }}
                >
                  <AlbumDetailSection>
                    <Input
                      imageSource={icDownArrow}
                      placeholder={strings.selectModel}
                      value={this.state.model_name}
                    />
                  </AlbumDetailSection>
                </RNPickerSelect>

                <RNPickerSelect
                  placeholder={{
                      label: strings.selectVehicleType,
                      value: null,
                  }}
                  placeholderTextColor='#666666'
                  items={this.state.types}
                  onValueChange={(type_id, index) => {
                      this.setState({ type_name: this.state.types[index-1] ? this.state.types[index-1].label : strings.selectVehicleType, type_id});
                  }}
                >
                  <AlbumDetailSection>
                    <Input
                      imageSource={icDownArrow}
                      placeholder={strings.selectVehicleType}
                      value={this.state.type_name}
                    />
                  </AlbumDetailSection>
                </RNPickerSelect>

                <AlbumDetailSection>
                  <Input
                    imageSource={icDownArrow}
                    placeholder={strings.manufacturerYear}
                    onChangeText={year => this.setState({ year })}
                    value={this.state.year}
                  />
                </AlbumDetailSection>

                <RNPickerSelect
                  placeholder={{
                      label: strings.selectVehicleColor,
                      value: null,
                  }}
                  placeholderTextColor='#666666'
                  items={this.state.colors}
                  onValueChange={(color_id, index) => {
                      this.setState({ color_name: this.state.colors[index-1] ? this.state.colors[index-1].label : strings.selectVehicleColor, color_id});
                  }}
                >
                  <AlbumDetailSection>
                    <Input
                      imageSource={icDownArrow}
                      placeholder={strings.selectVehicleColor}
                      value={this.state.color_name}
                    />
                  </AlbumDetailSection>
                </RNPickerSelect>
              </AlbumDetail>  
            </View>
            <View style={{ padding: 20 }}>
              <Button
                label={strings.contiue}
                onPress={this.openLicensePlateDetailsScreen.bind(this)}
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
  });

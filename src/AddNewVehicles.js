import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-simple-toast';
import { AlbumDetail, AlbumDetailSection, Input, CustomStatusBar, Button, Get, AutoComplete, getMakes, getMakeModels, getColors } from './common';

const icClose = require('./Image/ic_close.png');
const icDownArrow = require('./Image/ic_down_arrow.png');
const icUpArrow = require('./Image/ic_up_arrow.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class AddNewVehicles extends React.Component {
  constructor(props) {
    super(props);
    // this.props.setMenuInvisible;
    this.state = {
      makes: [],
      models:[],
      colors:[],
      make_id: '',
      model_id: '',
      year: '',
      color_id: ''                            
    }
  }


  async componentDidMount(){
    let makes = await getMakes();
    let colors = await getColors();

    this.setState({makes, colors});
  }


  async getMakeModels(){
    let models = await getMakeModels(this.state.make_id);

    this.setState({models});
  }

  openLicensePlateDetailsScreen() {

    if(!this.state.make_id || !this.state.model_id || !this.state.year || !this.state.color_id){
      Toast.show('Please provide the necessary information to proceed');
      return;
    }

    const { navigate } = this.props.navigation;
    navigate({key: 'LicensePlateDetails', 
              routeName: 'LicensePlateDetails', 
              params: {vehicleBesicDetails: {make_id:this.state.make_id, 
                                              model_id:this.state.model_id,
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
            title='ADD NEW VEHICLE'
            onPressSecondIcon={() => this.props.navigation.goBack()}
            secondIcon={icClose}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View >
              <AlbumDetail>
                <AlbumDetailSection>
                  <AutoComplete
                    data={this.state.makes}
                    imageSource={icDownArrow}
                    placeholder={strings.selectManufacturer}
                    onSelection={make_id => { this.setState({ make_id, model_id: ''}, () => { this.getMakeModels(); }); }}
                    dataProps={{id: 'data.id'}}
                  />
                </AlbumDetailSection>
                <AlbumDetailSection>
                  <AutoComplete
                    data={this.state.models}
                    imageSource={icDownArrow}
                    placeholder={strings.selectModel}
                    onSelection={model_id => this.setState({ model_id })}
                    dataProps={{id: 'data.id'}}
                  />
                </AlbumDetailSection>
                <AlbumDetailSection>
                  <Input
                    imageSource={icDownArrow}
                    placeholder={strings.manufacturerYear}
                    onChangeText={year => this.setState({ year })}
                  />
                </AlbumDetailSection>
                <AlbumDetailSection>
                  <AutoComplete
                    data={this.state.colors}
                    imageSource={icDownArrow}
                    placeholder={strings.selectVehicleColor}
                    onSelection={color_id => this.setState({ color_id })}
                    dataProps={{id: 'data.id'}}
                  />
                </AlbumDetailSection>
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

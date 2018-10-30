import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, WhiteBg, PaymentCard, JobsCard, CarPlate, vehicleIcon, getWasherOrderDetail, SimpleLoader, getCustomerLocationDetails } from '../common';

import GSideMenu from '../GSideMenu';

const icBackArrow = require('../Image/ic_back.png');

const globleString = require('../language/languageText');
const { width } = Dimensions.get('window');
const strings = globleString.default.strings;

export default class JobsDetailCards extends React.Component {

  constructor(props) {
      super(props);

      let id = props.navigation.state.params ? props.navigation.state.params.id : null;

      this.state = {
        id: id,
        order: {},
        location: {},
        loading: true
      }
  }

  async componentDidMount(){
    let order = await getWasherOrderDetail(this.state.id);
    let location = await getCustomerLocationDetails(order[0].location_id);

    //console.log(order);
    this.setState({order: order[0], loading: false, location: location[0]});
  }

  jobServices(services){
    //console.log({services});
    let jobService = [];

    services.map((service) => {
      jobService.push(service.sub_service_title)
    });

    return jobService;
  }


  openStartJobScreen(){
    const { navigate } = this.props.navigation;
    navigate({
      key:'StartJob',
      routeName: 'StartJob',
      params: {
        id: this.state.id,
        customerLocation: this.state.location
      }
    });
  }

  render() {
    const { mainContainer,viewContainer,textContainer } = styles;
      return (
        <GSideMenu 
          navigation={this.props.navigation}
          title='Jobs Details'
          firstIcon={icBackArrow}
          onPressFirstIcon={() => this.props.navigation.goBack()}
        >
        <View style={mainContainer}>
          {this.state.loading &&
              <SimpleLoader />
          }
          {this.state.order.id &&
            <View style={{flex: 1}}>
              <ScrollView>
                <View style={{ padding: 15, paddingTop: 25 }}>
                  <JobsCard
                    cardName={this.state.order.service_title}
                    cardType={this.jobServices(this.state.order.sub_services)}
                    bulletCardType={true}
                    carName={this.state.order.vehicle_type.toUpperCase()}
                    icon={vehicleIcon[this.state.order.vehicle_type]}
                  />
                  
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                 <View style={{flex: 0, flexDirection: 'column', margin: 30}}>
                    <Text style={styles.label}>{strings.licenseNo}</Text>
                    <WhiteBg customStyles={{margin: 0}}>
                      <View style={{ flex: 0, flexDirection: 'column', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                        <View style={styles.RectangleShapeView} />
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                          <View style={[styles.RectangleShapeView, { height: 2, width: 12 }]} />
                            <View style={{ width: 110 }} />
                          <View style={[styles.RectangleShapeView, { height: 2, width: 12 }]} />
                        </View>
                        <View style={{ height: 45, flexDirection: 'row', alignItems: 'center' }}>
                          <View style={styles.plateTextContainer}>
                            <Text style={styles.plateText}>{`${this.state.order.plate_place_code} ${this.state.order.plate_city} ${this.state.order.plate_number}`}</Text>
                          </View>
                        </View>
                      </View>
                    </WhiteBg>  
                  </View>

                  <View style={{flex: 0, flexDirection: 'column', margin: 30}}>
                    <Text style={styles.label}>{strings.color}</Text>
                    <WhiteBg customStyles={{margin: 0}}>
                      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <Text style={[styles.plateText, {fontWeight: "normal", fontStyle: "normal", fontSize: 12}]}>{this.state.order.color_name}</Text>  
                      </View>
                    </WhiteBg>
                  </View>  
                </View>    

                <View style={mainContainer}>
                  
                    <View style={{ flex: 1 }}>
                      <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                      <View style={viewContainer}>
                        <View style={textContainer}>
                          <Image source={require('../Image/telephone.png')} style={{width: 20, height: 20}} />
                        </View>
                        <View>
                          <Text style={textContainer}>{this.state.order.customer_mobile_no}</Text>
                        </View>  
                      </View>
                      <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                      <View style={viewContainer}>
                        <View style={textContainer}>
                          <Image source={require('../Image/location.png')} style={{width: 18, height: 25}} />
                        </View>
                        <View>  
                          <Text style={textContainer}>{this.state.location.title}</Text>
                        </View>  
                      </View>
                      <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                      <View style={viewContainer}>
                        <View style={textContainer}>
                          <Image source={require('../Image/info.png')} style={{width: 20, height: 20}} />
                        </View>
                        <View>  
                          <Text style={styles.additionalCommentsText}>{strings.additionalComments}</Text>
                          <Text style={textContainer}>
                            {(this.state.order.remarks || this.state.order.special_request) ?
                              `${this.state.order.remarks} ${"\n"} ${this.state.order.special_request}`
                              :
                              'N/A'
                            }
                          </Text>
                        </View>  
                      </View>
                      <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                    </View>
                </View>    
              </ScrollView>
              <View style={styles.button}>
                <Button label={strings.startDriving} onPress={() => this.openStartJobScreen()} /> 
              </View>
            </View>  
          }
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
  colorDot: {
    backgroundColor: 'red',
    width: 44,
   height: 44,
   borderRadius: 44 / 2
 },
 cone: {
    width: 0,
    height: 0,
    borderLeftWidth: 55,
    borderLeftColor: 'transparent',
    borderRightWidth: 55,
    borderRightColor: 'transparent',
    borderTopWidth: 100,
    borderTopColor: 'red',
    borderRadius: 55
  },
  RectangleShapeView: {
      width: 100,
      height: 8,
      backgroundColor: '#E2E8EF',
      justifyContent: 'center',
    },
    plateTextContainer: {
      flex: 1,
      borderBottomWidth: 0,
      borderColor: '#77D5F2'
    },
    plateText: {
      color: '#5e718f',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      textTransform: 'uppercase',
      textAlign: 'center'
    },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15
  },
  textContainer: {
    flex: 0,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
    marginRight: 20
  },
  transperantContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 10
  },
  button: {
    padding: 25, 
    backgroundColor: '#f4f7fa'
  },
  label: {
    fontFamily: "Lato",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: "left",
    color: "#42b6d2",
    marginBottom: 10
  },
  additionalCommentsText: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 14,
    letterSpacing: 0.6,
    textAlign: "left",
    color: "#5f7290",
    marginBottom: 5
  }
});

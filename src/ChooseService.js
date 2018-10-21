import React from 'react';
import { StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar } from 'react-native';
import Panel from './Panel/Panel';
import { ServiceType, Button, CustomItemStatusBar, Get, getServices, getVehicleDetails, SimpleLoader } from './common';
import DialogBox from 'react-native-dialogbox';
import moment from 'moment';
import GSideMenu from './GSideMenu';

const icBackArrow = require('./Image/ic_back.png');
const icRefresh = require('./Image/ic_refresh.png');
const icCorrect = require('./Image/ic_correct_white.png');
const icClose = require('./Image/ic_close.png');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const { width } = Dimensions.get('window');

export default class ChooseService extends React.Component {
  constructor(props) {
    super(props);

    let userDetails = 'userDetails' in props.navigation.state.params ? 
                                                         props.navigation.state.params.userDetails :
                                                         {};


    let washDate =  props.navigation.state.params ? 
                                                  (props.navigation.state.params.washDate ? moment(props.navigation.state.params.washDate) : moment()) :
                                                   moment();  

    let washTime =  props.navigation.state.params ? 
                                                  (props.navigation.state.params.washTime ? moment(props.navigation.state.params.washTime) : moment().add('45', 'minutes')) :
                                                   moment().add('45', 'minutes');                                                                                                  


    this.state = {
      loading: true,
      isActive: false,
      userDetails: userDetails,
      vehicleDetails: [],
      washDate: washDate,
      washTime: washTime,
      Data: [] /*[{
        id: 0,
        washType: 'NORMAL WASH',
        price: '45',
        serviceType: [
          { id: 0, serviceName: 'Perfume', status: true },
          { id: 1, serviceName: 'Exterior Steam Wash', status: true },
          { id: 2, serviceName: 'Air Pressure', status: true },
          { id: 3, serviceName: 'Interior Steam Wash', status: true },
          { id: 4, serviceName: 'Engine Steam Wash & Detaling', status: true },
          { id: 5, serviceName: 'Tire Polish', status: true },
          { id: 6, serviceName: 'Steaming Below Car', status: true },
          { id: 7, serviceName: 'A/C Cleaning', status: true },
        ],
        averageTime: 50
      },
      {
        id: 1,
        washType: 'SUPER WASH',
        price: '80',
        serviceType: [
          { id: 0, serviceName: 'Perfume', status: true },
          { id: 1, serviceName: 'Exterior Steam Wash', status: true },
          { id: 2, serviceName: 'Air Pressure', status: true },
          { id: 3, serviceName: 'Interior Steam Wash', status: true },
          { id: 4, serviceName: 'Engine Steam Wash & Detaling', status: true },
          { id: 5, serviceName: 'Tire Polish', status: true },
          { id: 6, serviceName: 'Steaming Below Car', status: true },
          { id: 7, serviceName: 'A/C Cleaning', status: true },
        ],
        averageTime: 20
      },
      {
        id: 2,
        washType: 'EXTENSIVE DEEP WASH',
        price: '120',
        serviceType: [
          { id: 0, serviceName: 'Perfume', status: true },
          { id: 1, serviceName: 'Exterior Steam Wash', status: true },
          { id: 2, serviceName: 'Air Pressure', status: true },
          { id: 3, serviceName: 'Interior Steam Wash', status: true },
          { id: 4, serviceName: 'Engine Steam Wash & Detaling', status: true },
          { id: 5, serviceName: 'Tire Polish', status: true },
          { id: 6, serviceName: 'Steaming Below Car', status: true },
          { id: 7, serviceName: 'A/C Cleaning', status: true },
        ],
        averageTime: 30
      }]*/
    };
  }


  async componentDidMount(){
    let vehicleDetails = await getVehicleDetails(this.state.userDetails.vehicle_id);
    let services = await getServices();

    this.setState({Data: services, vehicleDetails, loading: false});
  }

  updateMenuState(typeId, serviceTypeId, status) {
    const Data = [...this.state.Data];
    Data[typeId].serviceType[serviceTypeId].status = status;
    this.setState({ Data });
  }
  openConfirmationScreen(service, price) {
    const { navigate } = this.props.navigation;
    navigate({key: 'Confirmation', routeName: 'Confirmation', params: {
                                                        userDetails: this.state.userDetails,
                                                        vehicleDetails: this.state.vehicleDetails,
                                                        service: service,
                                                        price:price,
                                                        washDate: moment(this.state.washDate),
                                                        washTime: moment(this.state.washTime),
                                                   }});
  }


  getVehicleTypePrice(vehicleTypePrices){
    let price = 0;
    let vehicleType = this.state.vehicleDetails[0] ? this.state.vehicleDetails[0].vehicle_type : 'Sedan';

    vehicleTypePrices.map((x) => {
                                  if(x[vehicleType]){
                                    price = x[vehicleType].price;
                                  }
                            });

    return price;
  }

  renderWashData() {
    return this.state.Data.map((type, typeIndex) => (
      <Panel key={type.id} title={type.washType} price={this.getVehicleTypePrice(type.vehicleTypePrices)} openInfoDialog={() => openInfoDialog()}>
        <View style={{ flex: 1 }}>
          {this.renderServiceTypeData(typeIndex, type)}
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, paddingTop: 20 }} >
             <Image source={icRefresh} />
             <Text style={styles.listItem}>Average {type.averageTime} mins</Text>
          </View>
            <Button label='Continue' onPress={() => this.openConfirmationScreen(type, this.getVehicleTypePrice(type.vehicleTypePrices))} />
        </View>
      </Panel>
    ));
  }
  renderServiceTypeData(typeIndex, type) {
    return type.serviceType.map((serviceTypeData, serviceIndex) => (
      <ServiceType key={serviceTypeData.id} title={serviceTypeData.serviceName} value={serviceTypeData.status} onPress={() => {this.updateStatus(typeIndex, serviceIndex, serviceTypeData)}} />
    ));
  }
  updateStatus(typeIndex, serviceIndex, serviceTypeData){
    console.log(typeIndex, serviceIndex, !serviceTypeData.status);
    this.updateMenuState(typeIndex, serviceIndex, !serviceTypeData.status);
  }
  openInfoDialog(){
    this.dialogbox.confirm({
      title: 'title',
      // content: ['come on!', 'go!'],
      ok: {
        text: 'OK',
        style: {
          color: '#40B4D0'
        },
        // callback: () => {
        //   this.dialogbox.alert('Good!');
        // },
      },
      cancel: {
        text: 'CANCEL',
        style: {
          color: '#40B4D0'
        },
        // callback: () => {
        //   this.dialogbox.alert('Hurry up！');
        // },
      },
    });
  }
  render() {
    const { mainContainer, listContainer, listItem, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer } = styles;
    return (
      <GSideMenu
        navigation={this.props.navigation}
        title="CHOOSE SERVICE"
        firstIcon={icBackArrow}
        onPressFirstIcon={() => this.props.navigation.goBack()}
        isService
      >
        <View style={mainContainer}>
        {this.state.loading ? 
            <SimpleLoader />
            :
            <ScrollView style={listContainer}>
              {this.renderWashData()}
            </ScrollView>
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
  listContainer: {
    flex: 1,
    margin: 3,
    padding: 10,
    marginTop: 15
  },
  listItem: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: '#546889',
    marginLeft: 10
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
});

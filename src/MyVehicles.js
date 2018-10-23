import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import DialogBox from 'react-native-dialogbox';
import Toast from 'react-native-simple-toast';
import { CustomStatusBar, VehicleComponent, getCustomerVehicles, SimpleLoader, deleteVehicle } from './common'
import AddNewVehicles from './AddNewVehicles';
import GSideMenu from './GSideMenu';


const icAddNewVehicle = require('./Image/ic_add_new_vehicle.png');

export default class MyVehicles extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      vehicles: [],
      loading: true
    };

  }

 async componentDidMount(){
    let vehicles = await getCustomerVehicles(); 
    this.setState({vehicles, loading: false});

    console.log(vehicles);
}
openAddNewVehicleScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewVehicles', {
      // setMenuInvisible: this.props.setMenuInvisible()
    });
  }
  openDialog(vehicle_index, vehicle_id){
    // alert
    this.dialogbox.confirm({
      //title: 'title',
      content: "Are you sure to delete this vehicle?",
      ok: {
        text: 'OK',
        style: {
          color: '#40B4D0'
        },
        callback: () => {
           this.deleteVehicle(vehicle_index, vehicle_id);
        },
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


editVehicle(vehicle_id){
  this.props.navigation.navigate({key: 'AddNewVehicles', routeName: 'AddNewVehicles', params: {vehicle_id: vehicle_id}});
} 


async deleteVehicle(vehicle_index, vehicle_id){

  let response = await deleteVehicle(vehicle_id);

  if(response.status === 406){
    Toast.show(response.data.message);
  }
  else{
    let vehicles = this.state.vehicles;
    vehicles.splice(vehicle_index, 1);
    this.setState({vehicles});
  }
}

render() {
  const { mainContainer } = styles;
    return (
      <GSideMenu
        navigation={this.props.navigation}
        title="MY VEHICLES"
        secondIcon={icAddNewVehicle}
        onPressSecondIcon={this.openAddNewVehicleScreen.bind(this)}
      >
        <View style={mainContainer}>
          {this.state.loading ? 
            <SimpleLoader />
            :
              <ScrollView>
                <View style={{ padding: 15, paddingTop: 25 }}>
                {this.state.vehicles.map((vehicle, index) =>
                    <VehicleComponent
                      key={vehicle.id}
                      companyName={vehicle.make_name}
                      carName={vehicle.model_name}
                      vehicleType={vehicle.vehicle_type}
                      manufactureYear={vehicle.years}
                      numberPlate={`${vehicle.plate_place_code} ${vehicle.plate_city} ${vehicle.plate_number}`}
                      carColor={vehicle.color_name}
                      onDeletePress={() => {this.openDialog(index, vehicle.id)}}
                      onEditPress={() => {this.editVehicle(vehicle.id)}}
                    />
                )}
                </View>
                {this.state.vehicles.length === 0 && 
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.text}>No Vehicle Found</Text>
                    </View>
                }
              </ScrollView>
          }
          <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/>
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
  text: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: "left",
    color: "#5f7290"
  }
});

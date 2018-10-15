import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DialogBox from 'react-native-dialogbox';
import { CustomStatusBar, VehicleComponent, getCustomerVehicles } from './common'
import AddNewVehicles from './AddNewVehicles';


const icAddNewVehicle = require('./Image/ic_add_new_vehicle.png');

export default class MyVehicles extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      vehicles: []
    };

  }

 async componentDidMount(){
    let vehicles = await getCustomerVehicles(); 
    this.setState({vehicles: vehicles});
}
openAddNewVehicleScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewVehicles', {
      // setMenuInvisible: this.props.setMenuInvisible()
    });
  }
  openDialog(){
    // alert
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
  const { mainContainer } = styles;
    return (
        <View style={mainContainer}>
          <CustomStatusBar
            title='MY VEHICLE'
            secondIcon={icAddNewVehicle}
            onPressSecondIcon={(this.openAddNewVehicleScreen.bind(this))}
          />
          <ScrollView>
            <View style={{ padding: 15, paddingTop: 25 }}>
            {this.state.vehicles.map(vehicle =>
                <VehicleComponent
                  companyName={vehicle.make_name}
                  carName={vehicle.model_name}
                  manufactureYear={vehicle.model_years}
                  numberPlate={`${vehicle.plate_place_code} ${vehicle.plate_city} ${vehicle.plate_number}`}
                  carColor={vehicle.color_name}
                  onDeletePress={() => {this.openDialog()}}
                  onEditPress={() => {this.openDialog()}}
                />
            )}
            </View>
          </ScrollView>
          <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/>
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

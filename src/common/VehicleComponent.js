import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const icCar = require('../Image/ic_car.png');
const icEdit = require('../Image/ic_edit.png');
const icDelete = require('../Image/ic_delete.png');

const VehicleComponent = ({
    companyName,
    carName,
    manufactureYear,
    numberPlate,
    carColor,
    onDeletePress,
    onEditPress
  }) => (
    <View style={styles.gradientContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.companyNameText}>{companyName}</Text>
        <Text style={styles.carNameText}>{carName}</Text>
        <Text style={styles.companyNameText}>{manufactureYear}</Text>
        <Text style={styles.numberPlateText}>{numberPlate}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }} >
        <View style={{ flex: 1, Direction: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 10 }} >
          <Image source={icCar} />
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }} >
            <View style={styles.colorDot} />
            <Text style={[styles.companyNameText, { marginLeft: 5 }]}>
              {companyName}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-around', paddingLeft: 10 }}>
          <TouchableOpacity onPress={onEditPress}>
            <Image style={{ height: 30, width: 30 }} source={icEdit} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress}>
            <Image style={{ height: 30, width: 30 }} source={icDelete} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

const styles = StyleSheet.create({
  colorDot: {
    backgroundColor: '#f00',
    padding: 5,
    borderRadius: 30,
  },
  companyNameText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
    padding: 3
  },
  carNameText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#5F7290',
    padding: 3
  },
  numberPlateText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: '#42B6D2',
    padding: 5,
    paddingLeft: 3
  },
  gradientContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5,
    backgroundColor: '#ffffff',
    shadowColor: 'gray',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    elevation: 7
  }
});
export { VehicleComponent };

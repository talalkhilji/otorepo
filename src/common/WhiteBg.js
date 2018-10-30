import React from 'react';
import { View, StyleSheet, } from 'react-native';


const WhiteBg = (props) => (
    <View style={[styles.gradientContainer, props.customStyles]} >
      {props.children}
    </View>
  );

const styles = StyleSheet.create({
  gradientContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#ffffff',
    shadowColor: 'gray',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 7
  },

});
export { WhiteBg };

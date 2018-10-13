import React from 'react';
import { View, StyleSheet, } from 'react-native';


const OrangeBg = (props) => (
    <View style={styles.gradientContainer} >
      {props.children}
    </View>
  );

const styles = StyleSheet.create({
  gradientContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    margin: 5,
    backgroundColor: '#F2B568',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.3
  },

});
export { OrangeBg };

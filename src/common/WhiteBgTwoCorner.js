import React from 'react';
import { View, StyleSheet, } from 'react-native';


const WhiteBgTwoCorner = (props) => (
    <View style={styles.mainContainer} >
      {props.children}
    </View>
  );

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },

});
export { WhiteBgTwoCorner };

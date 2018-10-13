import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WhiteButtonSmall = ({
    label,
    onPress,
  }) => (
    <TouchableOpacity onPress={onPress}>
    <View style={[styles.transperantContainer]}>
        <Text style={styles.transperantButtonText} >{label}</Text>
    </View>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  transperantContainer: {
    height: 36,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#42B6D2',
    borderWidth: 1,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    margin: 10
  },
  transperantButtonText: {
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: '#42B6D2',
  }
});
export { WhiteButtonSmall };

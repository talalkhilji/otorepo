import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

const icSearch = require('../Image/ic_search.png');

const Search = ({
  label,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
  notEditable,
  firstIcon,
  onPressFirstIcon,
  secondIcon,
  onPressSecondIcon
  }) => (
    <View style={styles.transperantContainer}>
      <TouchableOpacity onPress={onPressFirstIcon}>
        {firstIcon ? <Image source={firstIcon} /> : <View /> }
      </TouchableOpacity>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor='#BEBEBE'
          underlineColorAndroid='rgba(0,0,0,0)'
          keyboardType={keyboardType}
          editable={!notEditable}
          style={styles.transperantButtonText}
        >{label}</TextInput>
      <TouchableOpacity onPress={onPressSecondIcon}>
        {secondIcon ? <Image source={secondIcon} /> : <View /> }
      </TouchableOpacity>
    </View>
  );

const styles = StyleSheet.create({
  transperantContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 45,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    margin: 10,
    alignItems: 'center'
  },
  transperantButtonText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Lato-Regular',
    color: '#BEBEBE',
    paddingLeft: 10,
    paddingRight: 20
  }
});
export { Search };

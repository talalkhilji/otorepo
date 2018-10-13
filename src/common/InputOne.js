import React from 'react';
import { TextInput } from 'react-native';

const InputOne = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
  notEditable
}) => {
  const { inputStyle } = styles;
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      style={inputStyle}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor='#666666'
      underlineColorAndroid='rgba(0,0,0,0)'
      keyboardType={keyboardType}
      editable={!notEditable}
    />
  );
};

const styles = {
  inputStyle: {
    flex: 1,
    color: '#666666',
    fontSize: 15,
  }
};

export { InputOne };

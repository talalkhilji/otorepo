import React from 'react';
import { TextInput, Text, View, Image } from 'react-native';

const Input = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
  notEditable,
  imageSource,
  inputTitle,
  textAlign,
  marginStyle,
  textLength,
  autoCapitalize
}) => {
  const { container, inputStyle, iconContainer, inputTitleContainer } = styles;
  console.log(imageSource);
  return (
    <View style={[container, { margin: marginStyle || 10 }]}>
      {inputTitle ? <Text style={inputTitleContainer} >{inputTitle}</Text> : <Text style={{ height: 0 }} /> }
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={[inputStyle, { textAlign: textAlign || 'left' }]}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor='#666666'
          underlineColorAndroid='rgba(0,0,0,0)'
          keyboardType={keyboardType}
          editable={!notEditable}
          maxLength= {textLength}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'words'}
        />
        {imageSource ? <Image source={imageSource} style={iconContainer} /> : <View style={{ height: 0, width: 0 }} /> }
      </View>
      <View style={{ backgroundColor: '#77D5F2', height: 1 }} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1
  },
  inputStyle: {
    color: '#666666',
    flex: 1,
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    padding: 10
  },
  imageSize: {
    width: 30,
    height: 30,
    marginLeft: 10,
    tintColor: '#5c606b'
  },
  iconContainer: {
    marginRight: 5,
  },
  inputTitleContainer: {
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#333333'
  }

};

export { Input };

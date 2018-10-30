import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonSmall = ({
    label,
    onPress,
    imgSource,
    customStyles,
    imageCustomStyles
  }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.gradientContainer, customStyles]}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#77D8F7', '#5BC6E3', '#3FB4D0']}
          style={styles.linearGradient}
        >
          { label ? <Text style={styles.buttonText}>{label}</Text> : <Image source={imgSource} style={[styles.imageContainer, imageCustomStyles]} />}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  linearGradient: {
    height: 36,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: '#ffffff',
  },
  imageContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  gradientContainer: {
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    margin: 10
  },
});
export { ButtonSmall };

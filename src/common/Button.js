import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
    label,
    onPress,
    imgSource,
  }) => (

      <View style={[styles.gradientContainer]}>
        <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#77D8F7', '#5BC6E3', '#3FB4D0']}
          style={styles.linearGradient}
        >
          { label ?
            <Text style={styles.buttonText}>{label}</Text> :
            <Image source={imgSource} style={styles.imageContainer} />}
        </LinearGradient>
        </TouchableOpacity>
      </View>

  );

const styles = StyleSheet.create({
  linearGradient: {
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 13,
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
    shadowOpacity: 0.5,
    margin: 10
  }
});
export { Button };

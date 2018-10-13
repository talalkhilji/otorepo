import React from 'react';
import { View, StatusBar, Platform, Image, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { windowHeight, maxHeightChk, iphoneXHeight } from './Constants';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const CustomStatusBar = (props) => {
  const { iconContainer, textContainer } = styles;
  return (
    <View style={styles.viewStyle}>
    {/*
      <MyStatusBar backgroundColor="#f3f6f9" />
    */}
      <View style={styles.container} >
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, paddingTop: windowHeight > maxHeightChk ? 10 : 0 }} >
          <TouchableOpacity onPress={props.onPressFirstIcon}>
            {props.firstIcon ? <Image source={props.firstIcon} /> : <View style={iconContainer} /> }
          </TouchableOpacity>
          {props.title ? <Text style={textContainer}>{props.title}</Text> : <View /> }
          <TouchableOpacity onPress={props.onPressSecondIcon} style={iconContainer}>
            {props.secondIcon ? <Image source={props.secondIcon} /> : <View style={iconContainer} /> }
          </TouchableOpacity>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#c2d3ec', '#78ccdf']}
          style={{ padding: 0.5, }}
        />
      </View>
    </View>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = {
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  viewStyle: {
    backgroundColor: '#f3f6f9',
    height:  windowHeight > maxHeightChk ? 90 : 70
  },
  container: {
    height: windowHeight > maxHeightChk ? 90 : 70
  },
  textContainer: {
    color: '#2B95B3',
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    paddingTop: windowHeight > maxHeightChk ? 7 : 0
  },
  iconContainer:{
    position: 'absolute',
    right: 10,
    top: windowHeight > maxHeightChk ? 7 : -10
  }

};

export { CustomStatusBar };

import React from 'react';
import { View, StatusBar, Platform, Dimensions, Text, Image, TouchableOpacity } from 'react-native';

const icCorrect = require('../Image/ic_correct_white.png');
const { width } = Dimensions.get('window');

import { windowHeight, maxHeightChk, iphoneXHeight } from './Constants';


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const CustomItemStatusBar = ({
  isLocation,
  isService,
  isConfirmation,
  isPayment,
  title,
  secondIcon,
  onPressSecondIcon
}) => {
  const { viewStyle, container, textContainer, roundTextContainer, selectedBgContainer, imageContainer } = styles;
  const isUpcomingView = (text) => (
    <View style={[selectedBgContainer, { backgroundColor: '#FFFFFF' }]}>
      <Text style={[roundTextContainer, { color: '#2B95B3' }]}>{text}</Text>
    </View>
  );

  const isSelectedView = (text) => (
    <View style={selectedBgContainer}>
      <Text style={roundTextContainer}>{text}</Text>
    </View>
  );

  const isCompletedView = (
    <View style={selectedBgContainer}>
      <Image source={icCorrect} style={imageContainer} />
    </View>
  );

  return (
    <View style={viewStyle}>
      {/*
      <MyStatusBar backgroundColor="#f3f6f9" />
    */}
      <View style={container} >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: windowHeight > maxHeightChk ? 100 : 70}} >
          <Text style={{ color: '#2B95B3', alignItems: 'center', marginTop: windowHeight > maxHeightChk ? 25 : 10 }}>{title || 'OTOServ'}</Text>   
          <View style={styles.iconContainer}> 
           <TouchableOpacity onPress={onPressSecondIcon}>
              {secondIcon ? <Image source={secondIcon} /> : <View style={styles.iconContainer} /> }
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ justifyContent: 'space-between', height: 50 }}>
          <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={[textContainer,{ color: '#2B95B3' }]}>LOCATION</Text>
            <Text style={[textContainer,{ color: isService ? '#2B95B3' : isConfirmation || isPayment ? '#2B95B3' : '#666666'}]}>SERVICE</Text>
            <Text style={[textContainer,{ color: isConfirmation ? '#2B95B3' : isPayment ? '#2B95B3' : '#666666'}]}>CONFIRMATION</Text>
            <Text style={[textContainer,{ color: isPayment ? '#2B95B3' : '#666666' }]}>PAYMENT</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <View style={{ height: 1, backgroundColor: '#3386a2', position: 'absolute', width,  }} />
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                { isLocation ? isSelectedView('1') : isCompletedView }
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                { isService ? isSelectedView('2') : isConfirmation || isPayment ? isCompletedView : isUpcomingView('2') }
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                { isConfirmation ? isSelectedView('3') : isPayment ? isCompletedView : isUpcomingView('3') }
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                { isPayment ? isSelectedView('4') : isUpcomingView('4') }
              </View>
            </View>
          </View>
        </View>

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
    height: windowHeight > maxHeightChk ? 162 : 130
  },
  container: {
    height: 120
  },
  textContainer: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#666666'
  },
  roundTextContainer: {
    fontSize: 10,
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    padding: 2,
    textAlign: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedBgContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#3386a2',
    borderWidth: 1,
    borderColor: '#3386a2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer:{
    position: 'absolute',
    right: 10,
    bottom: windowHeight > maxHeightChk ? 25 : 16
  }
};

export { CustomItemStatusBar };

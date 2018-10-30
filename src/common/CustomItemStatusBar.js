import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
  firstIcon,
  onPressFirstIcon,
  secondIcon,
  onPressSecondIcon,
  isCustomerLocation,
  isBeforeWash,
  isAfterWash
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
      <View>
        <View style={[styles.container, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: windowHeight > maxHeightChk ? 100 : 70}]} >
          <View style={styles.firstIconContainer}> 
           <TouchableOpacity onPress={onPressFirstIcon}>
              {firstIcon ? <Image source={firstIcon} /> : <View style={styles.iconContainer} /> }
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#2B95B3', alignItems: 'center', marginTop: windowHeight > maxHeightChk ? 25 : 10 }}>{title || 'OTOServ'}</Text>   
          <View style={styles.secondIconContainer}> 
           <TouchableOpacity onPress={onPressSecondIcon}>
              {secondIcon ? <Image source={secondIcon} /> : <View style={styles.iconContainer} /> }
            </TouchableOpacity>
          </View>
        </View>
        {(isLocation || isPayment || isService || isConfirmation) &&
          <View style={{ justifyContent: 'space-between', height: 50 }}>
            <View style={[styles.container, { justifyContent: 'space-between', flexDirection: 'row', height: 50 }]}>
              <Text style={[textContainer,{ color: '#2B95B3' }]}>LOCATION</Text>
              <Text style={[textContainer,{ color: isService ? '#2B95B3' : isConfirmation || isPayment ? '#2B95B3' : '#666666'}]}>SERVICE</Text>
              <Text style={[textContainer,{ color: isConfirmation ? '#2B95B3' : isPayment ? '#2B95B3' : '#666666'}]}>CONFIRMATION</Text>
              <Text style={[textContainer,{ color: isPayment ? '#2B95B3' : '#666666' }]}>PAYMENT</Text>
            </View>
            <View style={{ position: 'absolute', top: 20, justifyContent: 'center', width}}>
              <View style={{ height: 2, backgroundColor: '#3386a2', position: 'absolute', width,  }} />
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
        }

        {(isCustomerLocation || isBeforeWash || isAfterWash) &&
          <View style={{ justifyContent: 'space-between', height: 50 }}>
            <View style={[styles.container, { justifyContent: 'space-between', flexDirection: 'row', height: 50 }]}>
              <Text style={[textContainer,{ color: '#2B95B3', fontSize: 10 }]}>CUSTOMER LOCATION</Text>
              <Text style={[textContainer,{ color: isBeforeWash ? '#2B95B3' : isAfterWash ? '#2B95B3' : '#666666', fontSize: 10}]}>PHOTO BEFORE WASH</Text>
              <Text style={[textContainer,{ color: isAfterWash ? '#2B95B3' : '#666666', fontSize: 10}]}>PHOTO AFTER WASH</Text>
            </View>
            <View style={{ position: 'absolute', top: 20, justifyContent: 'center', width}}>
              <View style={{ height: 2, backgroundColor: '#3386a2', position: 'absolute', width,  }} />
              <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  { isCustomerLocation ? isSelectedView('1') : isCompletedView }
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  { isBeforeWash ? isSelectedView('2') : isAfterWash ? isCompletedView : isUpcomingView('2') }
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  { isAfterWash ? isSelectedView('3') : isUpcomingView('3') }
                </View>
              </View>
            </View>
          </View>
        }
      </View>
      {(!isLocation && !isPayment && !isService && !isConfirmation && !isCustomerLocation && !isBeforeWash && !isAfterWash) &&
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#c2d3ec', '#78ccdf']}
            style={{ padding: 0.5, }}
          />
      }
    </View>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = {
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  viewStyle: {
    backgroundColor: 'transparent'
  },
  container: {
    backgroundColor: '#f3f6f9'
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
    borderWidth: 2,
    borderColor: '#3386a2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstIconContainer:{
    position: 'absolute',
    left: 10,
    bottom: windowHeight > maxHeightChk ? 30 : 20
  },
  secondIconContainer:{
    position: 'absolute',
    right: 10,
    bottom: windowHeight > maxHeightChk ? 30 : 20
  }
};

export { CustomItemStatusBar };

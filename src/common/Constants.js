import React from 'react';
import {Dimensions, Platform} from 'react-native';


const windowHeight = Dimensions.get('window').height;


const iphoneXHeight = 812;
const minHeightChk = 500;
const maxHeightChk = Platform.OS === 'android' ? 750 : 610;

export { windowHeight, minHeightChk, maxHeightChk, iphoneXHeight };

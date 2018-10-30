import React from 'react';
import {Dimensions, Platform} from 'react-native';

const globleString = require('../language/languageText');
const strings = globleString.default.strings;


const windowHeight = Dimensions.get('window').height;


const iphoneXHeight = 812;
const minHeightChk = 500;
const maxHeightChk = Platform.OS === 'android' ? 750 : 610;


const ORDER_STATUS_PENDING = 0;
const ORDER_STATUS_ASSIGNED = 1;
const ORDER_STATUS_ON_WAY = 2;
const ORDER_STATUS_IN_PROGRESS = 3;
const ORDER_STATUS_DONE = 4;

const WASHER = 2;
const CUSTOMER = 3;


const orderStatusLabels = [
	strings.receivingJob,
	strings.acceptingJob,
	strings.onTheWay,
	strings.startingJob,
	strings.finishJob
]; 


const vehicleIcon = {
  'Sedan' : require('../Image/ic_car.png'),
  'SUV': require('../Image/suv.png'),
  'Van': require('../Image/van.png'),
  'Trailer': require('../Image/traler.png'),
  'Bus': require('../Image/bus.png'),
  'Bike': require('../Image/bike.png')
};


export { windowHeight, 
		 minHeightChk, 
		 maxHeightChk, 
		 iphoneXHeight,
		 ORDER_STATUS_PENDING,
		 ORDER_STATUS_ASSIGNED,
		 ORDER_STATUS_IN_PROGRESS,
		 ORDER_STATUS_ON_WAY,
		 ORDER_STATUS_DONE,
		 orderStatusLabels,
		 vehicleIcon,
		 WASHER,
		 CUSTOMER
		};

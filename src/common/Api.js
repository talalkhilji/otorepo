import React from 'react';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

/*
  Params: url:string
*/

const Get = (props) => {
  return axios.get(props.url);
};

/*
  Params: url:string, data:json 
*/

const Post = async (props) => {
  return axios.post(props.url, props.data);
};


const getCustomerVehicles = async () => {
  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;
  let response = await Get({url:`customer_vehicles/customer_id/${userId}`});
  return sendResponse(response);
    
}


const getMakes = async () => {
  let response = await Get({url: 'makes'});
  return sendResponse(response);
}


const getMakeModels = async (make_id) => {
  let response = await Get({url: `make_models/make_id/${make_id}`});
  return sendResponse(response);
}


const getColors = async () => {
  let response = await Get({url: 'colors'}); 
  return sendResponse(response);
}

const getCities = async () => {
  let response = await Get({url: 'cities'}); 
  return sendResponse(response);
}


const getServices = async () => {
  let response = await Get({url: 'services'}); 
  return sendResponse(response);
}


const getVehicleDetails = async (vehicle_id) => {
  let response = await Get({url: `vehicles/${vehicle_id}`}); 
  return sendResponse(response);
}


const sendResponse = (response) => {
  if(response.status === 200){
        return response.data;
  }
  else{
      return [];
  }
}


const placeOrder = async (data) => {

  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;

  data.customer_id = userId;

  console.log(data);

  response = await Post({url:'order', data:data});

  return response;
}


const getCustomerOrders = async () => {

  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;

  let response = await Get({url: `customer_orders/customer_id/${userId}`}); 
  return sendResponse(response);
}

export { Get, Post, getCustomerVehicles, getMakes, getMakeModels, getColors, getCities, getServices, getVehicleDetails, placeOrder, getCustomerOrders };

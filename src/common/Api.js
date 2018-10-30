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
  return axios.post(props.url, props.data).catch(function (error) {
    return error.response;
  });
};


// Washer APIs

const getCustomerVehicles = async () => {
  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;
  let response = await Get({url:`customer_vehicles/customer_id/${userId}`});
  return sendResponse(response);
    
}


const getCustomerLocations = async () => {
  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;
  let response = await Get({url:`customer_locations/customer_id/${userId}`});
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

const getVehicleTypes = async () => {
  let response = await Get({url: 'vehicle_types'}); 
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


const addLocation = async (data) => {

  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;

  data.customer_id = userId;

  let response = await Post({url: `location`, data: data}); 
  return response;
}


const cancelOrder = async (order_id) => {

  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;

  let data = {
    "order_id": order_id,
    "customer_id": userId
  }

  let response = await Post({url: `del_order/`, data: data}); 
  return response;
}


const deleteVehicle = async (vehicle_id) => {

  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;

  let data = {
    "vehicle_id": vehicle_id,
    "customer_id": userId
  }
  
  let response = await Post({url: `del_vehicle`, data: data}); 
  return response;
}


const getFaqs = async () => {
  let response = await Get({url: `faqs`}); 
  return sendResponse(response);
}

// Washer APIs
const getWasherOrders = async () => {
  let userData =  await AsyncStorage.getItem('userData');
  let userId = JSON.parse(userData).id;
  
  let response = await Get({url: `washer_orders/${userId}`}); 
  return sendResponse(response);
}


const getWasherOrderDetail = async (order_id) => {
  let response = await Get({url: `orders/id/${order_id}`}); 
  return sendResponse(response);
}

const getCustomerLocationDetails = async (location_id) => {
  let response = await Get({url: `locations/${location_id}`});
  return sendResponse(response);
}

const updateOrderStatus = async (data) => {
  let response = await Post({url: `update_order_status`, data:data}); 
  return response;
} 

export { Get, 
         Post, 
         getCustomerVehicles, 
         getCustomerLocations,
         getMakes, 
         getMakeModels, 
         getColors, 
         getCities, 
         getServices, 
         getVehicleDetails, 
         placeOrder, 
         getCustomerOrders,
         addLocation,
         cancelOrder,
         getVehicleTypes,
         deleteVehicle,
         getFaqs,
         getWasherOrders,
         getWasherOrderDetail,
         getCustomerLocationDetails,
         updateOrderStatus
       };

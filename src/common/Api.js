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
    //let data = props.data; 
    return axios.post(props.url, props.data);
};


const getCustomerVehicles = async () => {
   let userData =  await AsyncStorage.getItem('userData');
   let userId = JSON.parse(userData).id;
   let response = await Get({url:`customer_vehicles/customer_id/${userId}`});

   if(response.status === 200){
      return response.data;
   }
   else{
      return [];
   }
    
}


const getMakes = async () => {
      let response = await Get({url: 'makes'});

      if(response.status === 200){
          return response.data;
      }
      else{
          return [];
      }

}


const getMakeModels = async (make_id) => {
    let response = await Get({url: `make_models/make_id/${make_id}`});

    if(response.status === 200){
          return response.data;
    }
    else{
        return [];
    }
}


const getColors = async () => {
    let response = await Get({url: 'colors'}); 

    if(response.status === 200){
          return response.data;
    }
    else{
        return [];
    }
}

const getCities = async () => {
    let response = await Get({url: 'cities'}); 

    if(response.status === 200){
          return response.data;
    }
    else{
        return [];
    }
}

export { Get, Post, getCustomerVehicles, getMakes, getMakeModels, getColors, getCities };

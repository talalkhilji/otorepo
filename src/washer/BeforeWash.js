import React from 'react';
import { StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity } from 'react-native';
import { Button, CustomItemStatusBar, Loader, ORDER_STATUS_IN_PROGRESS, updateOrderStatus } from '../common';
import DialogBox from 'react-native-dialogbox';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

import GSideMenu from '../GSideMenu';

const icBackArrow = require('../Image/ic_back.png');
const icCancel = require('../Image/cancel.png');
const icUpload= require('../Image/upload.png');

const { width } = Dimensions.get('window');

const options = {
            storageOptions: {
              skipBackup: true,
              path: 'photos',
            },
          };

export default class BeforeWash extends React.Component {
  constructor(props) {
    super(props);   

    let id = props.navigation.state.params ? props.navigation.state.params.id : null;                                                                                 

    this.state = {
      id: id,
      loading: false,
      photos: []
    };
  }

  launchCamera(){

    if(this.state.photos.length > 0){
      Toast.show('Only one photo is allowed');
      return;
    }

    ImagePicker.launchCamera(options, (response) => {
      //console.log({response});

      if(!response.didCancel){
        let photos = this.state.photos;
        photos.push({path: response.path, uri: response.uri, data: response.data, name: response.fileName});
        this.setState({photos});
      }
    });
  }


  deletePhoto(index){
    let photos = this.state.photos;
    photos.splice(index, 1);
    this.setState({photos});
  }


 async openAfterWashScreen(){
    if(this.state.photos.length === 0){
      Toast.show('Please add photo');
      return;
    }


    this.setState({ loading: true });

    let data = {
                  "order_id": this.state.id,
                  "status": ORDER_STATUS_IN_PROGRESS,
                  "image": this.state.photos[0].data,
                  "name": this.state.photos[0].name
               };

    //console.log(btoa(this.state.photos[0].data));

    //console.log({data});           

    let response = await updateOrderStatus(data);  

    this.setState({ loading: false });

    //console.log('update call response: ', response);

    if(parseInt(response.data.status) === 1){
      const { navigate } = this.props.navigation;
      navigate({
        key: 'AfterWash',
        routeName: 'AfterWash',
        params: {
          id: this.state.id
        }
      });
    } 
    else{
      Toast.show('Something went wrong');
    }

  }

  render() {
    const { mainContainer } = styles;

    return (
      <GSideMenu
        navigation={this.props.navigation}
        firstIcon={icBackArrow}
        onPressFirstIcon={() => this.props.navigation.goBack()}
        isBeforeWash
      >
        {this.state.loading &&
          <Loader loading={this.state.loading} message='Please wait..' />
        }
        <View style={mainContainer}>
        <TouchableOpacity onPress={() => this.launchCamera()}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['rgb(255, 255, 255)', 'rgb(240, 242, 247)']}
                style={styles.linearGradient}
              >
              
                <Text style={styles.title}>TAKE PHOTO BEFORE WASH</Text>
                <View style={styles.photoUploadContainer}>
                  <Image source={icUpload} style={{width: 50, height: 48}} />
                </View>
                <Text style={styles.photoUploadText}>Tap to Upload Photo</Text>
            </LinearGradient>
          </TouchableOpacity>
          <ScrollView>
            {this.state.photos.map((photo, key) =>
              <View key={key} style={styles.photosContainer}> 
                <View> 
                  <Image style={styles.photo} source={{uri: photo.uri}} />
                </View>
                <TouchableOpacity style={styles.deletePhoto} onPress={() => this.deletePhoto(key)}>
                  <Image source={icCancel} style={{width: 40, height: 40}} />
                </TouchableOpacity>
              </View>  
             )
            }
          </ScrollView>
          <View style={{padding: 15}}>
            <Button label="Start Washing" onPress={() => this.openAfterWashScreen()} />
          </View>  
        </View>
      </GSideMenu>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  linearGradient:{
    flex: 0,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 14,
    letterSpacing: 0.55,
    textAlign: "left",
    color: "#42b6d2"
  },
  photosContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  photo: {
    borderRadius: 10,
    width: width - 50, 
    height: width / 2
  },
  deletePhoto: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  photoUploadContainer:{
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoUploadText:{
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: "center",
    color: "#a6b5d9"
  }
});

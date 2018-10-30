import React from 'react';
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { CustomStatusBar, Button, ORDER_STATUS_IN_PROGRESS, ORDER_STATUS_DONE } from './common';

const icBeforeImage = require('./Image/ic_before_car.png');
const icAfterImage = require('./Image/ic_after_car.png');
const icStar = require('./Image/star.png');
const icStarFill = require('./Image/starFilled.png');
const icBack = require('./Image/ic_back.png');
const icClose = require('./Image/ic_close.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

const { width } = Dimensions.get('window');

export default class Summary extends React.Component {

constructor(props){
  super(props);

  let order = this.props.navigation.state.params ? this.props.navigation.state.params.order : {};

  console.log({order});

  this.state = {
    order: order,
    rating: 4,
    ratingScale: 5,
    beforeWashImage: null,
    afterWashImage: null
  }
}


async componentDidMount(){
  let beforeWashImage = null;
  let afterWashImage = null;

  await this.state.order.order_statuses_history.map((status) => {
      if(parseInt(status.status) === ORDER_STATUS_IN_PROGRESS){
        beforeWashImage = status.img_url;
      }
      else if(parseInt(status.status) === ORDER_STATUS_DONE){
        afterWashImage = status.img_url;
      }
  });

  //console.log({beforeWashImage, afterWashImage});

  this.setState({beforeWashImage, afterWashImage});

}

showRating(){
  let ratingView = [];
  let counter = 1;
  for(i=1; i <= this.state.ratingScale; i++){
    
    ratingView.push(<TouchableOpacity key={i} onPress={this.updateRating.bind(this, i)}>
                      <Image source={i <= this.state.rating ? icStarFill : icStar} style={styles.starContainr} />
                    </TouchableOpacity>);
  }

  return ratingView;

}


updateRating(rating){

  console.log({rating});

  this.setState({rating});
}


render() {
  const { mainContainer } = styles;
    return (
      <View style={mainContainer}>
        <CustomStatusBar
          secondIcon={icClose}
          title='SUMMARY'
          onPressSecondIcon={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center', padding: 20 }} >
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={styles.textContainer}>{strings.before}</Text>
              {this.state.beforeWashImage &&
                <Image source={{uri: this.state.beforeWashImage}} style={styles.photo} />
              }
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={styles.textContainer}>{strings.after}</Text>
              {this.state.afterWashImage &&
                <Image source={{uri: this.state.afterWashImage}} style={styles.photo} />
              }
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={styles.textContainer}>{strings.rateUs}</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                {this.showRating()}
              </View>
            </View>
          </View>
        </ScrollView>  
        <View style={{ padding: 15 }}>
          <Button label={strings.submit} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
 textContainer: {
   padding: 10,
   fontSize: 11,
   fontFamily: 'Montserrat-Bold',
   color: '#666666',
   textAlign: 'center'
 },
 starContainr: {
   margin: 5,
   width: 30,
   height: 30
 },
 photo: {
    marginTop: 10,
    borderRadius: 10,
    width: width - 50, 
    height: width / 2
 }
});

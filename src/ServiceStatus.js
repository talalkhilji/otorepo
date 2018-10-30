import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Dash from 'react-native-dash';
import { CustomStatusBar, WhiteButton, Button, ButtonSmall, orderStatusLabels, ORDER_STATUS_ASSIGNED, ORDER_STATUS_DONE } from './common'

const icCorrect = require('./Image/ic_correct.png');
const icBackArrow = require('./Image/ic_back.png');
const icClose = require('./Image/ic_close.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class ServiceStatus extends React.Component {

  constructor(props){
    super(props);

    let order = this.props.navigation.state.params ? this.props.navigation.state.params.order : {};

    this.state = {
      order: order
    }
  }

  openSummaryScreen() {
    const { navigate } = this.props.navigation;
    navigate({
      key: 'Summary',
      routeName: 'Summary',
      params: {
        order: this.state.order
      }
    });
  }
  render() {
    const { mainContainer } = styles;
    return (
      <View style={mainContainer}>
        <CustomStatusBar
          title='SERVICE STATUS'
          firstIcon={icBackArrow}
          onPressFirstIcon={() => this.props.navigation.goBack()}
        />
        <View style={{ flex: 1, justifyContent: 'space-between', }}>
          <View style={{ padding: 40, paddingTop: 50, paddingBottom: 20 }}>
            {orderStatusLabels.map((label, status) => 
              <View style={{flexDirection: 'row'}} key={status}>
                <View style={{ flex: 1}}>
                  <View style={styles.imageViewContainer} >
                    <Image source={icCorrect} style={{ tintColor: '#FFFFFF' }} />
                  </View>
                  {(status !== orderStatusLabels.length - 1) &&
                    <Dash dashColor='#B2BAC5' style={styles.dashContainer} />
                  }
                </View>
                <View style={{ flex: 5}}>
                  <Text style={[styles.textContainer, { color: parseInt(this.state.order.status) >= status ? '#42B6D2' : '#5F7290' }]}>{label}</Text>
                  {(parseInt(this.state.order.status) ===  ORDER_STATUS_ASSIGNED && ORDER_STATUS_ASSIGNED === status) &&
                    <Text style={styles.extraTextContainer}>{strings.estimatedArrivalTime} Time: 45 mins</Text>
                  }
                </View>  
              </View>  
            )} 
            {//parseInt(this.state.order.status) === ORDER_STATUS_DONE &&
              <View style={{ marginLeft: 50, marginRight: 50, marginTop: 20 }}>
                <ButtonSmall label={strings.pleaseInputReview} onPress={this.openSummaryScreen.bind(this)} />
              </View>
            }  
          </View>  
          </View>
          <View style={{ flexDirection: 'row', padding: 20, paddingTop: 0 }}>
            <View style={{ flex: 1 }}>
              <WhiteButton label={strings.home} onPress={() => this.props.navigation.navigate('Home')} />
            </View>
            <View style={{ flex: 1 }}>
              <Button label={strings.myOrders} onPress={() => this.props.navigation.navigate('MyOrders')} />
            </View>
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
  imageViewContainer: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: '#42B6D2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#42B6D2',
    padding: 0
  },
  extraTextContainer: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
    padding: 3
  },
  dashContainer: {
    width: 1,
    height: 50,
    flexDirection: 'column',
    marginLeft: 8
  }
});

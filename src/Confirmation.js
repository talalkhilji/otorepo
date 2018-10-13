import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WhiteBg, CustomItemStatusBar, AlbumDetail, AlbumDetailSection, Input } from './common';


const imgWash = require('./Image/img_wash.png');
const icCar = require('./Image/ic_car.png');
const icPin = require('./Image/ic_pin.png');
const icCheck = require('./Image/ic_check.png');
const icCash = require('./Image/ic_cash.png');
const icCreditCard = require('./Image/ic_credit_card.png');
const globleString = require('./language/languageText');
const icCorrect = require('./Image/ic_correct_white.png');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const { width } = Dimensions.get('window');
const strings = globleString.default.strings;

export default class Confirmation extends React.Component {
  openPaymentScreen() {
    const { navigate } = this.props.navigation;
    navigate('Payment', { isPopToRoute: true });
  }
  render() {
    const { topContainer, mainContainer, viewContainer, textContainer, transperantContainer, buttonContainer, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer  } = styles;

     return (
      <View style={topContainer}>
        <CustomItemStatusBar isConfirmation />

        <ScrollView>
          <View style={mainContainer}>
            <WhiteBg>
              <View style={{ flex: 1, }}>
                <View style={viewContainer}>
                  <Text style={textContainer}>Normal Wash</Text>
                  <Image source={imgWash} />
                </View>
                <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                <View style={viewContainer}>
                  <Text style={textContainer}>Nissan Maxima ( White )</Text>
                  <Image source={icCar} style={{ height: 11, width: 32 }} />
                </View>
                <View style={{ backgroundColor: '#E3E8F0', height: 1, marginLeft: 10, marginRight: 10 }} />
                <View style={viewContainer}>
                  <Text style={textContainer}>44-A, Street 69-B \n Khalifa City, Abu Dhabi</Text>
                  <Image source={icPin} />
                </View>
              </View>
            </WhiteBg>
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingLeft: 15, paddingRight: 15, }}>
              <Image source={icCheck} />
              <Text style={[textContainer, { marginLeft: 10, }]}>{strings.savedLocationMessage}</Text>
            </View>
          </View>
          <AlbumDetail>
            <AlbumDetailSection>
              <Input
                placeholder={strings.villApartmentNo}
                onChangeText={email => this.setState({ email })}
              />
            </AlbumDetailSection>
            <AlbumDetailSection>
              <Input
                placeholder={strings.remarks}
                onChangeText={email => this.setState({ email })}
              />
            </AlbumDetailSection>
            <AlbumDetailSection>
              <Input
                placeholder={strings.specialRequest}
                onChangeText={email => this.setState({ email })}
              />
            </AlbumDetailSection>
            <Text style={{ fontSize: 12, fontFamily: 'Lato-Italic', color: '#536788', marginLeft: 15, marginRight: 15 }}>{strings.requestMessage}</Text>
          </AlbumDetail>

        </ScrollView>
        <View style={{ padding: 15 }}>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={[styles.gradientContainer]}>
                <TouchableOpacity onPress={this.openPaymentScreen.bind(this)}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#77D8F7', '#5BC6E3', '#3FB4D0']}
                    style={styles.linearGradient}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icCash} style={{ tintColor: '#FFFFFF' }} />
                      <Text style={buttonContainer}>{strings.cash}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={[styles.gradientContainer]}>
                <TouchableOpacity onPress={this.openPaymentScreen.bind(this)}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#77D8F7', '#5BC6E3', '#3FB4D0']}
                    style={styles.linearGradient}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icCreditCard} style={{ tintColor: '#FFFFFF' }} />
                      <Text style={buttonContainer}>{strings.creditCard}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  textContainer: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
  },
  transperantContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 10
  },
  buttonContainer: {
    alignItems: 'center',
    fontSize: 10,
    fontFamily: 'Lato-Bold',
    color: '#FFFFFF',
    marginLeft: 10
  },
  linearGradient: {
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  gradientContainer: {
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  viewStyle: {
    backgroundColor: '#f3f6f9',
    height: 85,
  },
  container: {
    height: 70,
  },
  statusTextContainer: {
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
});

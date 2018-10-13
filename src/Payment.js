import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Platform, StatusBar } from 'react-native';
import { Button, CreditCardList, CustomItemStatusBar, AlbumDetail, AlbumDetailSection, Input } from './common';

const icCheck = require('./Image/ic_check.png');
const globleString = require('./language/languageText');
const icCorrect = require('./Image/ic_correct_white.png');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const { width } = Dimensions.get('window');

const strings = globleString.default.strings;

export default class Payment extends React.Component {
  openPackagesScreen() {
    const { navigate } = this.props.navigation;
    navigate('Packages');
  }
  render() {
    const { mainContainer, textContainer, viewStyle, container, statusTextContainer, roundTextContainer, selectedBgContainer, imageContainer } = styles;
     return (
      <View style={mainContainer}>
        <CustomItemStatusBar isPayment />
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            <CreditCardList
              title='Saved Card 1'
              description='Credit Card'
            />
            <CreditCardList
              title='Saved Card 1'
              description='Credit Card'
            />
            <CreditCardList
              title='Credit Card / Debit Card'
              description='Please add the new card details'
            />
          </View>
          <View style={{ padding: 10, paddingTop: 0 }}>
            <AlbumDetail>
              <AlbumDetailSection>
                <Input
                  placeholder={strings.cardNo}
                  onChangeText={email => this.setState({ email })}
                />
              </AlbumDetailSection>
              <AlbumDetailSection>
                <Input
                  placeholder={strings.cardHolderName}
                  onChangeText={email => this.setState({ email })}
                />
              </AlbumDetailSection>
              <AlbumDetailSection>
                <Input
                  placeholder={strings.expiryDate}
                  onChangeText={email => this.setState({ email })}
                />
                <Input
                  placeholder={strings.cvv}
                  onChangeText={email => this.setState({ email })}
                />
              </AlbumDetailSection>
              <View style={{ flexDirection: 'row', padding: 20, }}>
                <Image source={icCheck} />
                <Text style={[textContainer, { marginLeft: 10, }]}>{strings.saveForFutureWash}</Text>
              </View>
            </AlbumDetail>
          </View>
        </ScrollView>
        <View style={{ padding: 20, paddingTop: 10, paddingBottom: 10 }}>
          <Button label={strings.confirm} onPress={() => this.props.navigation.state.params.isPopToRoute ? this.props.navigation.popToTop() : this.openPackagesScreen()} />
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
    flex: 1,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#5F7290',
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

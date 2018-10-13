import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SubscriptionToPackagesCard, CustomStatusBar, } from './common'

export default class SubscriptionToPackages extends React.Component {
  openPaymentScreen() {
    const { navigate } = this.props.navigation;
    navigate('Payment',{ isPopToRoute: false });
  }
  openSubscriptionToPackagesScreenOpen() {
    const { navigate } = this.props.navigation;
    navigate('SubscriptionToPackages');
  }
render() {
  const { mainContainer } = styles;
    return (
      <View style={mainContainer}>
        <CustomStatusBar
          title='SUBSCRIPTION TO PACKAGES'
        />
        <ScrollView>
          <View style={{ flex: 1, padding: 15, paddingTop: 25 }}>
            <SubscriptionToPackagesCard
              month='1 MONTH'
              normalWashes='5 X Normal Washes'
              superWashes="1 X Normal Washes"
              price='220'
              onPress={this.openPaymentScreen.bind(this)}
            />
            <SubscriptionToPackagesCard
              month='3 MONTH'
              normalWashes='5 X Normal Washes'
              superWashes="2 X Normal Washes"
              price='330'
              onPress={this.openPaymentScreen.bind(this)}
            />
            <SubscriptionToPackagesCard
              month='6 MONTHS'
              normalWashes='15 X Normal Washes'
              superWashes="10 X Normal Washes"
              price='550'
              onPress={this.openPaymentScreen.bind(this)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  marginStyle: {
    margin: 0
  },
  RectangleShapeView: {
    width: 5,
    height: 30,
    backgroundColor: '#F2B86E',
    justifyContent: 'center',
  },
});

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { CustomStatusBar, FAQsCard } from './common';
import GSideMenu from './GSideMenu';

import FAQPanel from './Panel/FAQPanel';
const icLogo = require('./Image/ic_logo_1.png');


export default class FAQs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [{
        title: 'Add a Ride',
        Description: '45',
      },
      {
        title: 'Add Payment Method',
        Description: '45',
      },
      {
        title: 'Request Wash',
        Description: '45',
      },
      {
        title: 'Schedule Wash',
        Description: '45',
      },
      {
        title: 'Cancel Wash',
        Description: '45',
      },
      {
        title: 'Change Porfile',
        Description: '45',
      },
      {
        title: 'Search Location',
        Description: '45',
      }]
    }
  }
openAddNewCardScreen() {
    const { navigate } = this.props.navigation;
    navigate('AddNewCard');
}
renderFAQData() {
  return this.state.Data.map(type => (
    <FAQPanel title={type.title} >
      <View style={{ flex: 1, }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }} >
           <Text style={styles.textContainer}> Dummay text</Text>
        </View>
      </View>
    </FAQPanel>
  ));
}
render() {
  const { mainContainer } = styles;
    return (
      <GSideMenu
        title='FAQs'
        navigation={this.props.navigation}
      >
      <View style={mainContainer}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <ScrollView>
            {this.renderFAQData()}
          </ScrollView>
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
  textContainer: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#546889',
    padding: 10
  },
});

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, WebView } from 'react-native';
import { CustomStatusBar, SimpleLoader } from './common';
import GSideMenu from './GSideMenu';

const icBackArrow = require('./Image/ic_back.png');

export default class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

render() {
  const { mainContainer } = styles;
    return (
        <View style={mainContainer}>
          <CustomStatusBar
           title='Privacy Policy'
           firstIcon={icBackArrow}
           onPressFirstIcon={() => this.props.navigation.goBack()}
           />
          {this.state.loading &&
              <SimpleLoader />
          }
          <WebView
            scalesPageToFit={false}
            source={{uri: 'https://www.otoserv.ae/privacy-policy'}}
            style={{flex: 1}}
            onLoad={() => this.setState({loading: false})}
          />
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
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#546889',
    padding: 10
  },
});

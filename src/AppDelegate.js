import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Login from './Login';
import Splash from './Splash';
import axios from 'axios';

const strings = require('./language/languageText');

class AppDelegate extends Component {
  state = {
    SelectedLanguage: null
  }

  async componentWillMount() {
    AsyncStorage.getItem('SelectedLanguage').then((SelectedLanguage) => {
      if (SelectedLanguage === '' || SelectedLanguage === null) {
        this.setState({ SelectedLanguage: true });
      } else if (SelectedLanguage === 'en' || SelectedLanguage === 'ar') {
          strings.default.strings.setLanguage(SelectedLanguage);
          this.setState({ SelectedLanguage: false });
      }
    });
    axios.defaults.baseURL = 'https://appcrm.otoserv.ae/index.php/api/';
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    console.disableYellowBox = true;

    AsyncStorage.getItem('staySignedIn').then((staySignedIn) => {
      if (staySignedIn === '' || staySignedIn === null) {
          AsyncStorage.setItem('staySignedIn', JSON.stringify(false));
      }
    });
  }

  renderMainView() {
    if (this.state.SelectedLanguage === true) {
      console.log('SelectedLanguage: true');
        return (<Splash navigation={this.props.navigation} />);
    }
    console.log('SelectedLanguage: false');
    return (<Login navigation={this.props.navigation} />);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderMainView()}
      </View>
    );
  }
}

export default AppDelegate;

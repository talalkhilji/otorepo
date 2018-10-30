import React from 'react';
import { View, Image, StyleSheet, AsyncStorage } from 'react-native';
import { WhiteButton, CUSTOMER, WASHER } from './common'

const icLogo = require('./Image/ic_logo.png');
const strings = require('./language/languageText');

export default class Splash extends React.Component {
  state = {
    staySignedIn : null
  }
  componentWillMount() {
    AsyncStorage.getItem('SelectedLanguage').then((SelectLanguage) => {
      if (SelectLanguage === 'en' || SelectLanguage === 'ar') {
          this.openLoginScreen(SelectLanguage);
      }
    });
  }

  async openLoginScreen(language) {
    const { navigate } = this.props.navigation;
    let userData = {};
    // navigate('Login');
    // strings.default.strings.setLanguage(language);
    // AsyncStorage.setItem('SelectedLanguage', language,
    // () => {
    //   const { navigate } = this.props.navigation;
    //   navigate('Login');
    // });

    await AsyncStorage.getItem('userData').then((result) => {
      userData = JSON.parse(result);
    });

    AsyncStorage.getItem('staySignedIn').then((staySignedIn) => {
      console.log(staySignedIn);
      if (staySignedIn === 'false' || staySignedIn === '' || staySignedIn === null) {
          navigate('Login');
      } else {
        if(parseInt(userData.role_id) === WASHER)
          navigate('JobsCards');
        else
          navigate('Home');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <View style={styles.secondContainer}>
          <Image source={icLogo} />
        </View>
        <View style={styles.thirdContainer}>
          <View style={{ flex: 1 }}>
            <WhiteButton
              label='English'
              onPress={() => this.openLoginScreen('en')}
            />
          </View>
          <View style={{ flex: 1 }}>
          <WhiteButton
            label='Arabic'
            onPress={() => this.openLoginScreen('ar')}
          />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  secondContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thirdContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#40B5D1',
    },
    textContainer: {
      color: '#42B6D2',
    },
  });

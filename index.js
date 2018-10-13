/** @format */
import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { name as appName } from './app.json';

import AppDelegate from './src/AppDelegate';
import Splash from './src/Splash';
import Login from './src/Login';
import ForgotPassword from './src/ForgotPassword';
import SocialMediaSignUp from './src/SocialMediaSignUp';
import SignUp from './src/SignUp';
import ConfirmCode from './src/ConfirmCode';
import Basic from './src/Basic';
import ChooseService from './src/ChooseService';

console.disableYellowBox = true;

const AppDelegateAppSample = props => (
  <AppDelegate navigation={props.navigation} />
);

const AppDelegateApp = StackNavigator({
  AppDelegateAppSample: { screen: AppDelegateAppSample },
  Splash: { screen: Splash },
  Login: { screen: Login },
  ForgotPassword: { screen: ForgotPassword },
  SocialMediaSignUp: { screen: SocialMediaSignUp },
  SignUp: { screen: SignUp },
  ConfirmCode: { screen: ConfirmCode },
  Basic: { screen: Basic }
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

AppRegistry.registerComponent(appName, () => AppDelegateApp);

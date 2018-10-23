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
import Home from './src/Home';
import MyVehicles from './src/MyVehicles';
import AddNewVehicles from './src/AddNewVehicles';
import LicensePlateDetails from './src/LicensePlateDetails';
import MyOrders from './src/MyOrders';
import PaymentCards from './src/PaymentCards';
import Contact from './src/Contact';
import Packages from './src/Packages';
import FreeWashes from './src/FreeWashes';
import FAQs from './src/FAQs';
import MyProfile from './src/MyProfile';
import AddNewCard from './src/AddNewCard';
import SubscriptionToPackages from './src/SubscriptionToPackages';
import ServiceStatus from './src/ServiceStatus';
import Summary from './src/Summary';
import ScheduleWash from './src/ScheduleWash';
import ChooseService from './src/ChooseService';
import Confirmation from './src/Confirmation';
import Payment from './src/Payment';
import WebViewPayment from './src/WebViewPayment';
import SignOut from './src/SignOut';

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
  Basic: { screen: Basic },
  Home: { screen: Home },
  MyVehicles: { screen: MyVehicles },
  AddNewVehicles: { screen: AddNewVehicles },
  LicensePlateDetails: { screen: LicensePlateDetails },
  MyOrders: { screen: MyOrders },
  Contact: { screen: Contact },
  Packages: { screen: Packages },
  FreeWashes: { screen: FreeWashes },
  FAQs: { screen: FAQs },
  MyProfile: { screen: MyProfile },
  SubscriptionToPackages: { screen: SubscriptionToPackages },
  ServiceStatus: { screen: ServiceStatus },
  ScheduleWash: { screen: ScheduleWash },
  ChooseService: { screen: ChooseService },
  Confirmation: { screen: Confirmation },
  Payment: { screen: Payment },
  WebViewPayment: { screen: WebViewPayment },
  SignOut: { screen: SignOut }
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

AppRegistry.registerComponent(appName, () => AppDelegateApp);

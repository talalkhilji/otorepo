import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  Dimensions
} from 'react-native';


import { windowHeight, maxHeightChk, iphoneXHeight } from './common';

import { StackNavigator } from 'react-navigation';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Home from './Home';
import MyVehicles from './MyVehicles';
import AddNewVehicles from './AddNewVehicles';
import LicensePlateDetails from './LicensePlateDetails';
import MyOrders from './MyOrders';
import PaymentCards from './PaymentCards';
import Contact from './Contact';
import Packages from './Packages';
import FreeWashes from './FreeWashes';
import FAQs from './FAQs';
import MyProfile from './MyProfile';
import AddNewCard from './AddNewCard';
import SocialMediaSignUp from './SocialMediaSignUp';
import SubscriptionToPackages from './SubscriptionToPackages';
import ServiceStatus from './ServiceStatus';
import Summary from './Summary';
import ScheduleWash from './ScheduleWash';
import ChooseService from './ChooseService';
import Confirmation from './Confirmation';
import Payment from './Payment';
import SignOut from './SignOut';


//Washer app screens
import JobsCards from './washer/JobsCards';
import CarPlateCards from './washer/CarPlateCards';
import JobsFilterCards from './washer/JobsFilterCards';

const image = require('./Image/ic_home.png');

const HomeAppSample = props => (
  <Home navigation={props.navigation} />
);
const HomeApp = StackNavigator({
  Home: { screen: HomeAppSample },
  ServiceStatus: { screen: ServiceStatus },
  Summary: { screen: Summary },
  AddNewVehicles: { screen: AddNewVehicles },
  LicensePlateDetails: { screen: LicensePlateDetails },
  Packages: { screen: Packages },
  SubscriptionToPackages: { screen: SubscriptionToPackages },
  ScheduleWash: { screen: ScheduleWash },
  ChooseService: { screen: ChooseService },
  Confirmation: { screen: Confirmation },
  Payment: { screen: Payment }

}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

const MyOrdersAppSample = props => (
  <MyOrders navigation={props.navigation} />
);
const MyOrdersApp = StackNavigator({
  MyOrders: { screen: MyOrders },
  Home: { screen: HomeAppSample },
  ServiceStatus: { screen: ServiceStatus },
  Summary: { screen: Summary },
  AddNewVehicles: { screen: AddNewVehicles },
  LicensePlateDetails: { screen: LicensePlateDetails },
  Packages: { screen: Packages },
  SubscriptionToPackages: { screen: SubscriptionToPackages },
  ScheduleWash: { screen: ScheduleWash },
  ChooseService: { screen: ChooseService },
  Confirmation: { screen: Confirmation },
  Payment: { screen: Payment }
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });


const MyVehiclesApp = StackNavigator({
  MyVehicles: { screen: MyVehicles },
  Home: { screen: HomeAppSample },
  ServiceStatus: { screen: ServiceStatus },
  Summary: { screen: Summary },
  AddNewVehicles: { screen: AddNewVehicles },
  LicensePlateDetails: { screen: LicensePlateDetails },
  Packages: { screen: Packages },
  SubscriptionToPackages: { screen: SubscriptionToPackages },
  ScheduleWash: { screen: ScheduleWash },
  ChooseService: { screen: ChooseService },
  Confirmation: { screen: Confirmation },
  Payment: { screen: Payment }
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

const PaymentCardsAppSample = props => (
  <PaymentCards navigation={props.navigation} />
);
const PaymentCardsApp = StackNavigator({
  PaymentCardsAppSample: { screen: PaymentCardsAppSample },
  AddNewCard: { screen: AddNewCard },
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

//Washer app screens
const JobsCardsAppSample = props => (
  <JobsCards navigation={props.navigation} />
);
const JobsCardsApp = StackNavigator({
  JobsCardsAppSample: { screen: JobsCardsAppSample },
  AddNewCard: { screen: AddNewCard },
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

const CarPlateCardsAppSample = props => (
  <CarPlateCards navigation={props.navigation} />
);
const CarPlateCardsApp = StackNavigator({
  CarPlateCardsAppSample: { screen: CarPlateCardsAppSample },
  AddNewCard: { screen: AddNewCard },
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });


const JobsFilterCardsAppSample = props => (
  <JobsFilterCards navigation={props.navigation} />
);
const JobsFilterCardsApp = StackNavigator({
  JobsFilterCardsAppSample: { screen: JobsFilterCardsAppSample },
  AddNewCard: { screen: AddNewCard },
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });
//End Washer screens

const ContactAppSample = props => (
  <Contact navigation={props.navigation} />
);
const ContactApp = StackNavigator({
  ContactAppSample: { screen: ContactAppSample },
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

const SubscriptionToPackagesAppSample = props => (
  <SubscriptionToPackages navigation={props.navigation} />
);
const SubscriptionToPackagesApp = StackNavigator({
  SubscriptionToPackagesAppSample: { screen: SubscriptionToPackagesAppSample },
  Packages: { screen: Packages },
  ScheduleWash: { screen: ScheduleWash },
  ChooseService: { screen: ChooseService },
  Confirmation: { screen: Confirmation },
  Payment: { screen: Payment }
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

const FreeWashesAppSample = props => (
  <FreeWashes navigation={props.navigation} />
);
const FreeWashesApp = StackNavigator({
  FreeWashesAppSample: { screen: FreeWashesAppSample },
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

const FAQsAppSample = props => (
  <FAQs navigation={props.navigation} />
);
const FAQsApp = StackNavigator({
  FAQsAppSample: { screen: FAQsAppSample },
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

const MyProfileAppSample = props => (
  <MyProfile navigation={props.navigation} />
);
const MyProfileApp = StackNavigator({
  MyProfileAppSample: { screen: MyProfileAppSample },
}, { headerMode: 'none', navigationOptions: { gesturesEnabled: false } });

var menuVisible = true;

export default class Basic extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      selectedItem: 'Home',
      isLanguage: true,
      userName: '',
    };
  }
  componentWillMount() {
    AsyncStorage.getItem('userData', (err, result) => {
        this.setState({ userName: `${JSON.parse(result).first_name} ${JSON.parse(result).last_name}` });
        console.log(this.state.userName);
    });
    // AsyncStorage.getItem('SelectedLanguage').then((SelectLanguage) => {
    //   if (SelectLanguage === 'en') {
    //       this.setState({ isLanguage: true });
    //   } else {
    //     this.setState({ isLanguage: false });
    //   }
    // });
  }
  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  onRenderPage() {
    const MyVehiclesAppSample = props => (
      <MyVehicles
        navigation={props.navigation}
        setMenuVisible={() => {
          menuVisible = true;
          this.refs.toggleTouchableOpacity.setNativeProps({ opacity: 1 });
        }}
        setMenuInvisible={() => {
          menuVisible = false;
          this.refs.toggleTouchableOpacity.setNativeProps({ opacity: 0 });
        }}
      />
    );

    if (this.state.selectedItem === 'Home') {
      return (<HomeApp />);
    }
    // Render the child component and set the action property with the handler as value
    if (this.state.selectedItem === 'My Vehicles') {
      return (<MyVehiclesApp />);
    }
    if (this.state.selectedItem === 'My Orders') {
      return (<MyOrdersApp />);
    }
    if (this.state.selectedItem === 'Payment Cards') {
      return (<PaymentCardsApp />);
    }

    //Washer app screens
    if (this.state.selectedItem === 'Washer Jobs Cards') {
      return (<JobsCardsApp />);
    }
    if (this.state.selectedItem === 'Washer Car Plate') {
      return (<CarPlateCardsApp />);
    }
    if (this.state.selectedItem === 'Washer Jobs Filter') {
      return (<JobsFilterCardsApp />);
    }
    //End washer screens

    if (this.state.selectedItem === 'Contact') {
      return (<ContactApp />);
    }
    if (this.state.selectedItem === 'Packages') {
      return (<SubscriptionToPackagesApp />);
    }
    if (this.state.selectedItem === 'Free Washes') {
      return (<FreeWashesApp />);
    }
    if (this.state.selectedItem === 'FAQs') {
      return (<FAQsApp />);
    }
    if (this.state.selectedItem === 'My Profile') {
      return (<MyProfileApp />);
    }
    if (this.state.selectedItem === 'Sign out') {
      return (<SignOut navigation={this.props.navigation} />);
    }
    // if (this.state.selectedItem === 'EN') {
    //   return (<SocialMediaSignUp />);
    // }
    // if (this.state.selectedItem === 'AR') {
    //   return (<SocialMediaSignUp />);
    // }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  updateLanguageState(isLanguage) {
    console.log('updateLanguageState call');
    console.log(isLanguage);
    // this.setState({ isLanguage });
    // if (isLanguage) {
    //   AsyncStorage.setItem('SelectedLanguage', 'en');
    // } else {
    //   AsyncStorage.setItem('SelectedLanguage', 'ar');
    // }
    // AsyncStorage.getItem('SelectedLanguage').then((SelectLanguage) => {
    //   console.log(SelectLanguage);
    // });
  }
  renderShowDrawerOpener() {
    if (menuVisible) {
      return (
          <TouchableOpacity onPress={this.toggle} style={[styles.button, { /*paddingTop: this.state.selectedItem === 'Home' ? 35 : 35*/ }]} ref='toggleTouchableOpacity'>
            <Image source={image} style={{ justifyContent: 'flex-end' }} />
          </TouchableOpacity>
      );
    }
    return (
      <View />
    );
  }
  render() {
    const menu = (
      <Menu
        onItemSelected={this.onMenuItemSelected}
        userName={this.state.userName}
        languageValue={this.state.isLanguage}
        onToggle={(isLanguage) => this.updateLanguageState(isLanguage)}
      />
    );
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
      {this.onRenderPage()}
      {this.renderShowDrawerOpener()}
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 20,
    paddingTop: windowHeight > maxHeightChk ? 35 : 10
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

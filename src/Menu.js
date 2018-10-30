import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FlipToggle from 'react-native-flip-toggle-button';

import { CUSTOMER, WASHER } from './common';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const icEditProfile = require('./Image/ic_edit_profile.png');
const icMenuTransperant = require('./Image/ic_menu_transperant.png');
const icHome = require('./Image/ic_menu_home.png');
const icMyVehicles = require('./Image/ic_menu_my_vehicles.png');
const icMyOrders = require('./Image/ic_menu_my_orders.png');
const icPayment = require('./Image/ic_menu_payment.png');
const icContact = require('./Image/ic_menu_contact.png');
const icPackages = require('./Image/ic_menu_packages.png');
const icFreeWashes = require('./Image/ic_menu_free_washes.png');
const icFAQs = require('./Image/ic_menu_faqs.png');
const icSignOut = require('./Image/ic_menu_signout.png');
const icLanguageSwitch = require('./Image/ic_menu_language_switch.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class Menu extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      userData: {},
      userName: null,
      language: false
    };
  }


  async componentDidMount(){
      await AsyncStorage.getItem('userData', (err, result) => {
        this.setState({ userData: JSON.parse(result), userName: `${JSON.parse(result).first_name} ${JSON.parse(result).last_name}` });
        //console.log(this.state.userName);
      });
  }

  selectLanguage(){

  }

  onLanuageToggle(){

  }

  render() {
    const { selectedLink } = this.props; 
    const { navigationItemContainer, imageContainer, menuImageContainer, textContainer, signOutContainer } = styles;
    return (
      <View style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#f8f9f8', zIndex: -1 }}>
        <ScrollView scrollsToTop={false} style={styles.menu}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#75D7F6', '#40B5D1']}
            style={{ padding: 15, height: 172 }}
          >
            <Image
              style={styles.avatar}
              source={{ uri }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: '#FFFFFF' }}>{this.state.userName}</Text>
              </View>
              <TouchableOpacity onPress={() => selectedLink('MyProfile')} >
              <Image
                style={{ height: 20, width: 20, tintColor: '#FFFFFF' }}
                source={icEditProfile}
              />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {parseInt(this.state.userData.role_id) === CUSTOMER &&
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <TouchableOpacity onPress={() => selectedLink('Home')}>
                <View style={navigationItemContainer}>
                  <View style={menuImageContainer}>
                    <Image style={imageContainer} source={icHome} />
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={textContainer}>{strings.home}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectedLink('MyVehicles')}>
                <View style={navigationItemContainer}>
                  <View style={menuImageContainer}>
                    <Image style={imageContainer} source={icMyVehicles} />
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={textContainer}>{strings.myVehicles}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectedLink('MyOrders')}>
                <View style={navigationItemContainer}>
                  <View style={menuImageContainer}>
                    <Image style={imageContainer} source={icMyOrders} />
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={textContainer}>{strings.myOrders}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/*
              <TouchableOpacity onPress={() => selectedLink('WasherCarPlate')}>
                <View style={navigationItemContainer}>
                  <View style={menuImageContainer}>
                    <Image style={imageContainer} source={icPayment} />
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={textContainer}>{strings.jobsCarPlateSmall}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => selectedLink('WasherJobsFilter')}>
                <View style={navigationItemContainer}>
                  <View style={menuImageContainer}>
                    <Image style={imageContainer} source={icPayment} />
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={textContainer}>{strings.jobsFilterSmall}</Text>
                  </View>
                </View>
              </TouchableOpacity>
             */}
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c2d3ec', '#78ccdf']}
                style={{ padding: 0.5, marginLeft: 60 }}
              />
            {/*
            <TouchableOpacity onPress={() => onItemSelected('Payment Cards')}>
              <View style={navigationItemContainer}>
                <View style={menuImageContainer}>
                  <Image style={imageContainer} source={icPayment} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={textContainer}>{strings.paymentSmall}</Text>
                </View>
              </View>
            </TouchableOpacity>
           */}
            <TouchableOpacity onPress={() => selectedLink('Contact')}>
              <View style={navigationItemContainer}>
                <View style={menuImageContainer}>
                  <Image style={imageContainer} source={icContact} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={textContainer}>{strings.contactSmall}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectedLink('Packages')}>
              <View style={navigationItemContainer}>
                <View style={menuImageContainer}>
                  <Image style={imageContainer} source={icPackages} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={textContainer}>{strings.packages}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectedLink('FreeWashes')}>
              <View style={navigationItemContainer}>
                <View style={menuImageContainer}>
                  <Image style={imageContainer} source={icFreeWashes} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={textContainer}>{strings.freeWashesSmall}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectedLink('FAQs')}>
              <View style={navigationItemContainer}>
                <View style={menuImageContainer}>
                  <Image style={imageContainer} source={icFAQs} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={textContainer}>{strings.faqs}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        }
        {parseInt(this.state.userData.role_id) === WASHER &&
          <View style={{marginTop: 10, marginBottom: 10}}>
            <TouchableOpacity onPress={() => selectedLink('JobsCards')}>
                <View style={navigationItemContainer}>
                  <View style={menuImageContainer}>
                    <Image style={imageContainer} source={icMyOrders} />
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={textContainer}>{strings.jobsSmall}</Text>
                  </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectedLink('Contact')}>
              <View style={navigationItemContainer}>
                <View style={menuImageContainer}>
                  <Image style={imageContainer} source={icContact} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={textContainer}>{strings.contactSmall}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        }
        </ScrollView>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#c2d3ec', '#78ccdf']}
          style={{ padding: 0.5, }}
        />
        <View style={signOutContainer}>
          <TouchableOpacity onPress={() => selectedLink('SignOut')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
              <View style={{ justifyContent: 'center' }}>
                <Image style={imageContainer} source={icSignOut} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={[textContainer, { color: '#42B6D2', fontSize: 12 }]} >{strings.signOut}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ justifyContent: 'center' }}>
              <Text onPress={() => this.selectLanguage('AR')} style={[textContainer, { marginRight: 10, marginLeft: 0, fontSize: 12 }]}>AR</Text>
            </View>
            <FlipToggle
              value={this.state.language}
              buttonWidth={50}
              buttonHeight={30}
              buttonRadius={50}
              sliderWidth={25}
              sliderHeight={25}
              sliderRadius={50}
              sliderOnColor='#F2B568'
              sliderOffColor='#F2B568'
              buttonOnColor='#8EC7D5'
              buttonOffColor='#8EC7D5'
              onToggle={() => this.onLanuageToggle()}
              onToggleLongPress={() => console.log('toggle long pressed!')}
              margin={10}
            />
            <View style={{ justifyContent: 'center' }}>
              <Text onPress={() => this.selectLanguage('EN')} style={[textContainer, { marginRight: 0, marginLeft: 5, fontSize: 12 }]}>EN</Text>
            </View>
          </View>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  menu: {
    // width: window.width,
    height: window.height,
    backgroundColor: '#FAFAFA',

  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginTop: 20,
    marginBottom: 20
  },
  navigationItemContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  menuImageContainer: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: '#546889',
    marginLeft: 10
  },
  signOutContainer: {
    height: 60,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

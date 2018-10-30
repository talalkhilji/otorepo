import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WhiteBg } from '../../common';
import Dash from 'react-native-dash';


const icLocation = require('../../Image/location.png');
const icTime = require('../../Image/time.png');

const JobsCard = ({
    cardName,
    cardType,
    carName,
    icon,
    location,
    arrivalTime,
    bulletCardType
  }) => (
      <WhiteBg>
        <View style={{ flex: 1, flexDirection: 'row', }} >
          <View style={{ flex:0.5,justifyContent: 'center', alignItems: 'center' }}>
           
              <Image style={{ marginTop: 10, marginBottom: 10}} source={icon} />
            
              <Text style={styles.carNameContainer}>{carName}</Text>
            
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={styles.topOval} />
            <Dash dashColor='#E3E8F0' style={styles.dashContainer} />
            <View style={styles.bottomOval} />
          </View>
          <View style={{ flex: 1, Direction: 'column', padding: 10 }}>
            <Text style={styles.cardNameContainer}>{cardName}</Text>
            {bulletCardType ?
              cardType.map((card, key) => 
                <View key={key} style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                  <Text style={[styles.cardTypeContainer, {color: '#5f7290'}]}>
                    {card}
                  </Text>  
                </View>  
              )
             : 
              <Text style={styles.cardTypeContainer}>{cardType}</Text>
            }

            <View style={{ flexDirection: 'row',justifyContent: 'space-between',paddingTop:15 }}>
            {location &&
              <View style={{ flexDirection: 'row' }}>
                <Image style={{width:10,height:13,marginRight:4}} source={icLocation} />
                <Text style={styles.cardTypeBottomContainer}>{location}</Text>
              </View>
            }
            {arrivalTime &&
              <View style={{ flexDirection: 'row' }}>
                <Image style={{width:13,height:13,marginRight:4}} source={icTime} /> 
                <Text style={styles.cardTypeBottomContainer}>{arrivalTime}</Text>
              </View>
            }
            </View>

          </View>
          
          
        </View>
    </WhiteBg>
);
const styles = StyleSheet.create({
  carNameContainer: {
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    color: '#5F7290',
    justifyContent: 'center',
  },
  cardNameContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#42B6D2'
  },
  cardTypeContainer: {
    padding: 3,
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: '#A1AAB9'
  },
  cardTypeBottomContainer: {
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: "left",
    color: "#5f7290"
  },
  dashContainer: {
    width: 1,
    flex: 1,
    flexDirection: 'column',
  },
  topOval: {
        height: 12,
        width: 26,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#f2f1f2'
  },
  bottomOval: {
        height: 12,
        width: 26,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#f2f1f2'
  },
  bulletPoint: {
    color: "#5f7290",
    fontSize: 15,
    backgroundColor: 'transparent'
  }
});
export { JobsCard };

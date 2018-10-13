
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import { WhiteBg } from '../common';

const icUpArrow = require('../Image/ic_up_arrow.png');
const icDownArrow = require('../Image/ic_down_arrow.png');
const icQuestion = require('../Image/ic_question.png');
const icCash = require('../Image/ic_cash.png');

class Panel extends React.Component {
    constructor(props) {
      super(props);
      this.icons = {
        'up': icUpArrow,
        'down': icDownArrow
      };
      this.state = {
          title: props.title,
          price: props.price,
          expanded: false,
          animation: new Animated.Value()
      };
    }
    toggle() {
      let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
          finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
      this.setState({
          expanded: !this.state.expanded
      });

      this.state.animation.setValue(initialValue);
      Animated.spring(
          this.state.animation,
          {
              toValue: finalValue
          }
      ).start();
    }
    _setMaxHeight(event) {
       if (!this.state.maxHeight) {
         this.setState({
           maxHeight: event.nativeEvent.layout.height,
         });
       }
     }
     _setMinHeight(event) {
       if (!this.state.minHeight) {
         this.setState({
           minHeight: event.nativeEvent.layout.height,
           animation: new Animated.Value(event.nativeEvent.layout.height),
         });
       }
     }

    render() {
        let icon = this.icons['down'];
        if (this.state.expanded) {
            icon = this.icons['up'];
        }
        const { container, titleContainer, headerTextContainer, buttonContainer } = styles;
        return (
            <WhiteBg>
            <Animated.View style={[container, { height: this.state.animation }]} >
              <TouchableHighlight
                style={buttonContainer}
                onPress={this.toggle.bind(this)}
                underlayColor="#f1f1f1"
              >
                <View style={titleContainer} onLayout={this._setMinHeight.bind(this)}>
                  <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={[titleContainer, { padding: 10 }]}>
                      <Text style={headerTextContainer}>{this.state.title}</Text>
                      <Image source={icQuestion} style={{ height: 16, width: 16, marginLeft: 5 }} />
                    </View>
                    <View style={[titleContainer, { padding: 10 }]}>
                      <Image source={icCash} style={{ height: 16, width: 16, marginRight: 5 }} />
                      <Text style={[headerTextContainer, { fontSize: 12 }]}>AED {this.state.price}</Text>
                    </View>
                  </View>
                  <Image
                      style={styles.buttonImage}
                      source={icon}
                  />
                </View>
              </TouchableHighlight>
              <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                  {this.props.children}
              </View>
            </Animated.View>
            </WhiteBg>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center'
  },
  buttonImage: {
    margin: 10
  },
  headerTextContainer: {
    fontSize: 11,
    color: '#546889',
    fontFamily: 'Montserrat-Bold'
  },
});

export default Panel;

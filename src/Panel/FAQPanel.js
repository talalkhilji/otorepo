
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import { WhiteBg, FAQsCard } from '../common';

const icUpArrow = require('../Image/ic_up_arrow.png');
const icDownArrow = require('../Image/ic_down_arrow.png');
const icQuestion = require('../Image/ic_question.png');
const icCash = require('../Image/ic_cash.png');

class FAQPanel extends React.Component {
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
            <Animated.View style={[container, { height: this.state.animation }]} >
              <TouchableHighlight
                style={buttonContainer}
                onPress={this.toggle.bind(this)}
                underlayColor="#f1f1f1"
              >
                <View style={titleContainer} onLayout={this._setMinHeight.bind(this)}>
                  <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', paddingRight: 0 }}>
                    <FAQsCard title={this.state.title} />
                  </View>
                </View>
              </TouchableHighlight>
              <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                  {this.props.children}
              </View>
            </Animated.View>

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
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#546889',
  },
});

export default FAQPanel;

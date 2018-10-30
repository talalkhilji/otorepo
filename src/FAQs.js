import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, WebView } from 'react-native';
import { CustomStatusBar, SimpleLoader, getFaqs } from './common';
import GSideMenu from './GSideMenu';
import FAQPanel from './Panel/FAQPanel';

const icBackArrow = require('./Image/ic_back.png');

export default class FAQs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      faqs: []
    }
  }


  async componentDidMount(){
    let faqs = await getFaqs();
    this.setState({faqs, loading: false});
  }

  renderFAQData() {
    return this.state.faqs.map(faq => (
      <FAQPanel title={faq.question} >
        <View style={{ flex: 1, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }} >
             <Text style={styles.textContainer}>{faq.description}</Text>
          </View>
        </View>
      </FAQPanel>
    ));
  }

render() {
  const { mainContainer } = styles;
    return (
      <GSideMenu
          title='FAQs'
          navigation={this.props.navigation}
        >
        <View style={mainContainer}>
          {this.state.loading ?
              <SimpleLoader />
          :
          <View style={mainContainer}>
            <View style={{ flex: 1, marginTop: 10 }}>
              <ScrollView>
                {this.renderFAQData()}
              </ScrollView>
            </View>
          </View>
        }
        </View>
      </GSideMenu>  
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

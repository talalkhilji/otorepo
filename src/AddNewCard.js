import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AlbumDetail, AlbumDetailSection, Input, CustomStatusBar, Button } from './common'

const icClose = require('./Image/ic_close.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class AddNewCard extends React.Component {

render() {
  const { mainContainer } = styles;
    return (
      <View style={mainContainer}>
        <CustomStatusBar
          title='ADD NEW CARD'
          onPressSecondIcon={() => this.props.navigation.goBack()}
          secondIcon={icClose}
        />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View >
            <AlbumDetail>
              <AlbumDetailSection>
                <Input
                  placeholder={strings.expiryDate}
                  onChangeText={email => this.setState({ email })}
                />
                <Input
                  placeholder={strings.cvv}
                  onChangeText={email => this.setState({ email })}
                />
              </AlbumDetailSection>
              <AlbumDetailSection>
                <Input
                  placeholder={strings.cardNo}
                  onChangeText={email => this.setState({ email })}
                />
              </AlbumDetailSection>
              <AlbumDetailSection>
                <Input
                  placeholder={strings.cardHolderName}
                  onChangeText={email => this.setState({ email })}
                />
              </AlbumDetailSection>
              </AlbumDetail>
        </View>
        <View style={{ padding: 20 }}>
          <Button label={strings.submit} />
        </View>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

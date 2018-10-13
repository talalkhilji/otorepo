import React from 'react';
import { TextInput, Text, View, Image, TouchableOpacity, ListView, Dimensions } from 'react-native';

export default class AutoComplete extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      dropDown: false,
      text: ''
    };

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  toggleDropDown = () => {
    this.setState({dropDown:!this.state.dropDown});
  }


  componentWillReceiveProps(newProps){
    if(newProps.data !== this.props.data)
      this.setState({text: ''});
  }


  renderRow(data){
    return(
      <TouchableOpacity onPress={() => this.onSelection(data)}>
        <Text style={styles.inputStyle}>{data.name} {data.years ? `(${data.years})` : ''}</Text>
      </TouchableOpacity>  
    );
  }


  onSelection(data){
    this.toggleDropDown();
    this.setState({text: `${data.name} ${data.years ? (data.years) : ''}`});
    this.props.onSelection(eval(this.props.dataProps.id));
  }

  render(){
      const {onChangeText,
              value,
              placeholder,
              secureTextEntry,
              keyboardType,
              notEditable,
              imageSource,
              inputTitle,
              textAlign,
              marginStyle,
              textLength,
              data
          } = this.props;

    const { container, inputStyle, iconContainer, inputTitleContainer } = styles;
    const rows = this.dataSource.cloneWithRows(data || []);
    //console.log(imageSource);
    return (
      <View style={[container, { margin: marginStyle || 10 }]}>
        {inputTitle ? <Text style={inputTitleContainer} >{inputTitle}</Text> : <Text style={{ height: 0 }} /> }
        <TouchableOpacity onPress={() => this.toggleDropDown()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/*
            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              autoCorrect={false}
              style={[inputStyle, { textAlign: textAlign || 'left' }]}
              //onChangeText={onChangeText}
              value={value}
              placeholderTextColor='#666666'
              underlineColorAndroid='rgba(0,0,0,0)'
              keyboardType={keyboardType}
              editable={!notEditable}
              maxLength= {textLength}
            />
          */}
          <Text style={[inputStyle, { textAlign: textAlign || 'left' }]}>{this.state.text ? this.state.text : placeholder}</Text>
            {imageSource ? <Image source={imageSource} style={iconContainer} /> : <View style={{ height: 0, width: 0 }} /> }
          </View>
        </TouchableOpacity>  
        <View style={{ backgroundColor: '#77D5F2', height: 1 }} />
        {this.state.dropDown &&
          <View>
            <View style={{
                          backgroundColor: '#ffffff', 
                          left: 0,
                          right: 0,
                          borderWidth: 1,
                          borderColor: '#77D5F2',
                          boderRadius: 5,
                          borderTopWidth: 0
                          }}>
              <ListView
                style={{maxHeight: 200}}
                enableEmptySections
                dataSource={rows}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={() => <View style={{ backgroundColor: '#77D5F2', height: 1 }} />}
              />
            </View>
          </View>  
        }
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  inputStyle: {
    color: '#666666',
    flex: 1,
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    padding: 10
  },
  imageSize: {
    width: 30,
    height: 30,
    marginLeft: 10,
    tintColor: '#5c606b'
  },
  iconContainer: {
    marginRight: 5,
  },
  inputTitleContainer: {
    fontSize: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#333333'
  }

};

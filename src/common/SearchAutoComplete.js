import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ListView } from 'react-native';

const icSearch = require('../Image/ic_search.png');


export default class SearchAutoComplete extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      dropDownHeight: 45,
      dropDown: false,
      dropDownIcon: this.props.secondIcon,
      text: '',
      filterData: this.props.data,

    };

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }



  componentWillReceiveProps(newProps){
    if(newProps.data !== this.props.data)
      this.setState({ filterData: newProps.data });
  }

  toggleDropDown = () => {
    let dropDownHeight = 45;
    let dropDownIcon = this.props.secondIcon;
    if(!this.state.dropDown){
      dropDownHeight = 200;
      dropDownIcon = this.props.secondAlternateIcon;
    }
    this.setState({dropDown:!this.state.dropDown, dropDownHeight, dropDownIcon});
  }



  showDropDown = () => {
    let dropDownHeight = 200;
    let dropDownIcon = this.props.secondAlternateIcon;
    if(!this.state.dropDown){
      dropDownHeight = 200;
    }
    this.setState({dropDown: true, dropDownHeight, dropDownIcon});
  }



  hideDropDown = () => {
    let dropDownHeight = 45;
    let dropDownIcon = this.props.secondIcon;
    this.setState({dropDown: false, dropDownHeight, dropDownIcon});
  }


  onSelection(data, text){
    this.toggleDropDown();
    //console.log(eval(this.props.dataProps.format));
    this.setState({text});
    this.props.onSelection(eval(this.props.dataProps.id));
  }


  renderRow(data){
    let formattedString = [];

    this.props.dataProps.format.map((value) => {
      formattedString.push(eval(value));
    });

    formattedString = formattedString.join(' ');

    return(
      <TouchableOpacity onPress={() => this.onSelection(data, formattedString)}>
        <Text style={styles.listText}>{formattedString}</Text>
      </TouchableOpacity>  
    );
  }


  find(value){
    this.setState({text: value});
    if(value.length > 0 && this.props.data.length){
      this.showDropDown();

      let filterData = this.props.data.filter((x) => { 
                          let keyString = [];
                          this.props.dataProps.findKeys.map((key) => {
                              keyString.push(x[key]);
                          });
                          return keyString.join(' ').toLowerCase().trim().indexOf(value.toLowerCase()) !== -1;
                       });
      this.setState({ filterData });
    }
    else{
      this.hideDropDown();
      this.setState({ filterData: this.props.data });
    }
  }

render(){

    const {
          label,
          onChangeText,
          value,
          placeholder,
          secureTextEntry,
          keyboardType,
          notEditable,
          firstIcon,
          onPressFirstIcon,
          secondIcon,
          secondAlternateIcon,
          onPressSecondIcon,
          data,
          dataProps,
          search
          } = this.props;
    const rows = this.dataSource.cloneWithRows(this.state.filterData || []);
          
    return (      
      <View style={[styles.transperantContainer, {height: this.state.dropDownHeight}]}>
        <View style={search ? styles.transperantInnerContainer : styles.transperantDropDownInnerContainer}>
          <TouchableOpacity onPress={onPressFirstIcon}>
            {firstIcon ? <Image source={firstIcon} /> : <View /> }
          </TouchableOpacity>
          {search &&
            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              autoCorrect={false}
              value={this.state.text}
              placeholderTextColor='#BEBEBE'
              underlineColorAndroid='rgba(0,0,0,0)'
              keyboardType={keyboardType}
              editable={!notEditable}
              style={styles.transperantButtonText}
              onChangeText={ (value) => this.find(value)}
            />
          }
          <TouchableOpacity onPress={() => this.toggleDropDown()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {!search &&
                  <Text style={[styles.transperantButtonText, { textAlign: 'left' }]}>{this.state.text ? this.state.text : placeholder}</Text>
              }
              {secondIcon ? <Image source={this.state.dropDownIcon} /> : <View /> }
            </View>    
          </TouchableOpacity>
        </View>  
        {this.state.dropDown && 
          <View style={{backgroundColor: '#ffff', borderRadius: 10, padding: 10}}>
            <ListView
              style={{height: 120}}
              enableEmptySections
              dataSource={rows}
              renderRow={this.renderRow.bind(this)}
              renderSeparator={() => <View style={{ backgroundColor: '#E3E8F0', height: 1 }} />}
            />
          </View>  
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transperantContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    height: 45,
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    margin: 10
  },
  transperantInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45
  },
  transperantDropDownInnerContainer: {
    paddingTop: 12,
    paddingRight: 5,
    height: 45
  },
  transperantButtonText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Lato-Regular',
    color: '#BEBEBE',
    paddingLeft: 10,
    paddingRight: 20
  },
  listText: {
    fontSize: 13,
    color: '#546889',
    fontFamily: 'Lato-Regular',
    paddingTop: 10,
    paddingBottom: 10
  }
});
export { SearchAutoComplete };

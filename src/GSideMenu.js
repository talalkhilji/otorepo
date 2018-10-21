import React from 'react';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import { CustomItemStatusBar } from './common';

const icHome = require('./Image/ic_home.png');
const globleString = require('./language/languageText');
const strings = globleString.default.strings;

export default class GSideMenu extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggleMenu(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  selectedLink(link){
    const { navigate } = this.props.navigation;
    this.toggleMenu();
    navigate(link);
  }

  render() {
    
    const menu = (
      <Menu 
        selectedLink={this.selectedLink.bind(this)} 
        navigation={this.props.navigation} 
      />
    );

    const {
           title, 
           isLocation, 
           isService, 
           isConfirmation, 
           isPayment, 
           firstIcon, 
           onPressFirstIcon, 
           secondIcon, 
           onPressSecondIcon
         } = this.props;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.setState({isOpen})}
      >
        <CustomItemStatusBar 
            title={title || ''}
            firstIcon={firstIcon || icHome}
            onPressFirstIcon={onPressFirstIcon || this.toggleMenu.bind(this)}
            secondIcon={secondIcon}
            onPressSecondIcon={onPressSecondIcon}
            isLocation={isLocation}
            isService={isService}
            isConfirmation={isConfirmation}
            isPayment={isPayment} />
        {this.props.children}
      </SideMenu>
    );
    
  }
}

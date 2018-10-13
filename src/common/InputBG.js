import React from 'react';
import { View } from 'react-native';

const InputBG = (props) => {
  const { containerStyle, underLineContainer } = styles;
  return (
    <View style={{ flex: 1, padding: 5 }}>
      <View style={containerStyle}>
        {props.children}
      </View>
      <View style={underLineContainer} />
    </View>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative'
  },
  underLineContainer: {
    backgroundColor: '#77D5F2',
    height: 1
  },
};

export { InputBG };

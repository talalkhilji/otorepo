import React from 'react';
import { View } from 'react-native';

const AlbumDetail = (props) => {
  const { cardStyle } = styles;
  return (
    <View style={cardStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  cardStyle: {
    elevation: 1,
    margin: 10
  }
};

export { AlbumDetail };

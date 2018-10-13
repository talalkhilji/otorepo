import React from 'react';
import { View } from 'react-native';

const AlbumDetailSection = (props) => {
  const { cardStyle } = styles;
  return (
    <View style={{ margin: 5, position: 'relative', borderRadius: 5, }}>
      <View style={[cardStyle]}>
        {props.children}
      </View>
    </View>
  );
};

const styles = {
  cardStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
};

export { AlbumDetailSection };

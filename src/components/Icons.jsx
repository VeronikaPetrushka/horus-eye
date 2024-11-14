import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    // case 'home':
    //   imageSource = require('../assets/panel/home.png');
    //   active && iconStyle.push(styles.active);
    //   break;
    case 'close':
        imageSource = require('../assets/common/close.png');
        iconStyle.push(styles.brown);
    break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fff',
  },
  brown: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#7b4c1c',
  }
});

export default Icons;

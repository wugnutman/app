import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './PageOne.styles';

/**
 * @class Represent the PageOne Component
 */
export default class PageOne extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} >PAGE ONE</Text>
      </View>
    )
  }
}

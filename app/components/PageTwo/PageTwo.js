import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './PageTwo.styles';

/**
 * @class Represent the PageTwo Component
 */
export default class PageTwo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} >PAGE TWO</Text>
      </View>
    )
  }
}

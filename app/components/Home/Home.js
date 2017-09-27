import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './Home.styles';

/**
 * @class Represent the Home Component
 */
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} >Home Component</Text>
      </View>
    )
  }
}

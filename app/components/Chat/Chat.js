import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './Chat.styles';

/**
 * @class represents the Chat component
 */
export default class Chat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} >Chat</Text>
      </View>
    )
  }
}

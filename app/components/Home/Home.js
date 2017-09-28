import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './Home.styles';

const navigate = null;

/**
 * @class Represent the Home Component
 */
export default class Home extends Component {

  componentWillMount(props) {
    navigate = this.props.navigation.navigate;
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text} >HOME</Text>

        <TouchableOpacity onPress={() => navigate('pageOne')}>
          <Text style={styles.routeText} >Navigate to Page 1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('pageTwo')}>
          <Text style={styles.routeText} >WebRTC Sample</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('webDemo')}>
          <Text style={styles.routeText} >WebRTC Demo</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

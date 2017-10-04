import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

class Settings extends React.Component {

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>SETTINGS</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('main')}>
          <Text style={styles.link}>Home >></Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  },
  link: {
    color: 'blue',
    fontSize: 18
  }
})

export default Settings;

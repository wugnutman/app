import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import Album from './Album'

class ImageViewer extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>IMAGE VIEWER</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('album')}>
          <Text style={styles.link}>Album >></Text>
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

export default ImageViewer;

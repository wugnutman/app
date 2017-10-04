/**
 * Stylesheet for PageTwo component.
 */
import { StyleSheet, Dimensions } from 'react-native';

import normalize from '../../lib/normalize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    alignSelf: "stretch",
    justifyContent:
    "space-between",
    margin: 10
  },
  iconButton: {
    fontSize: 32,
    color: "#fff",
    alignItems: "center"
  },
  captureButton: {
    height: 48,
    width: 48,
    borderRadius: 48,
    backgroundColor: "#fff",
    margin: 10
  },
  albumButton: {
    height: 42,
    width: 42,
    borderRadius: 42
  }
});

export default styles;
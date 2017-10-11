/**
 * Stylesheet for Album component.
 */
import { StyleSheet, Dimensions } from 'react-native';

import normalize, { moderateScale } from '../../lib/normalize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    position: 'absolute',
    right: moderateScale(20),
    top: moderateScale(35)
  },
  selectText: {
    fontWeight: "200",
  },
  footerView: {
    position: 'absolute',
    bottom: moderateScale(0),
    left: moderateScale(0)
  },
  iconButton: {
    fontSize: normalize(32),
    color: "#34d058",
    padding: moderateScale(10)
  },
});

export default styles;
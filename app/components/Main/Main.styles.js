/**
 * Stylesheet for Main component.
 */
import { StyleSheet, Dimensions } from 'react-native';

import normalize, { moderateScale } from '../../lib/normalize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: moderateScale(width),
    flexDirection: 'row',
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: 'center',
    margin: moderateScale(10),
    paddingHorizontal: moderateScale(5)
  },
  albumButton: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(48)
  },
  captureButtonOuter: {
    height: moderateScale(65),
    width: moderateScale(65),
    borderWidth: 5,
    borderColor: '#34d058',
    borderRadius: moderateScale(65),
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureButton: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(50),
    backgroundColor: "#34d058",
  },
  iconButton: {
    fontSize: normalize(32),
    color: "#fff",
  },
  loaderView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: moderateScale(height / 2),
    left: moderateScale(width / 2)
  }
});

export default styles;
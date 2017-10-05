/**
 * Stylesheet for PageTwo component.
 */
import { StyleSheet, Dimensions } from 'react-native';

import normalize, { moderateScale } from '../../lib/normalize';

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
    justifyContent: "space-between",
    margin: moderateScale(10),
    paddingHorizontal: moderateScale(5)
  },
  albumButton: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(48)
  },
  captureButton: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(48),
    backgroundColor: "green",
    // margin: moderateScale(10)
  },
  iconButton: {
    fontSize: normalize(32),
    color: "#fff",
    alignItems: "center",
    marginTop: moderateScale(6)
  },
});

export default styles;
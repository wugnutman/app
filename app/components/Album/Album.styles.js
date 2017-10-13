/**
 * Stylesheet for Album component.
 */
import { StyleSheet, Dimensions } from 'react-native';

import normalize, { moderateScale } from '../../lib/normalize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  loaderView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: moderateScale(height / 2),
    left: moderateScale(width / 2)
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  photoBrowserStyle: {
    backgroundColor: 'black',
    width: width
  },
  headerView: {
    position: 'absolute',
    right: moderateScale(20),
    top: moderateScale(35)
  },
  selectText: {
    fontSize: normalize(18),
    fontWeight: "500",
    color: '#fff'
  },
  footerView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: moderateScale(5),
    width: width
  },
  footerIconButton: {
    fontSize: normalize(30),
    color: "#fff",
  },
  innerFooterView: {
    paddingHorizontal: moderateScale(30)
  }
});

export default styles;

// green color solocator : #34d058
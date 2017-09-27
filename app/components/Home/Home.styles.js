/**
 * Stylesheet for Home component.
 */

import { StyleSheet } from 'react-native';

import normalize, { moderateScale } from '../../lib/normalize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'black',
        fontSize: normalize(40),
    },
    routeText:{
        color: 'red',
        fontSize: normalize(20),
        marginTop: moderateScale(50)
    }
});

export default styles;
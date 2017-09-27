/**
 * Stylesheet for Home component.
 */

import { StyleSheet } from 'react-native';

import normalize, { moderateScale } from '../../lib/normalize';
import { width, height } from '../../lib/device';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        color: 'black',
        fontSize: 50,
        marginTop: 100
    }
});

export default styles;
/**
 * Stylesheet for PageTwo component.
 */
import { StyleSheet } from 'react-native';

import normalize from '../../lib/normalize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'black',
        fontSize: normalize(30),
    },
});

export default styles;
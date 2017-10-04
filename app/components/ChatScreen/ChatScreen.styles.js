/**
 * Stylesheet for ChatScreen component.
 */
import { StyleSheet } from 'react-native';

import normalize from '../../lib/normalize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6E5BAA'
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        width: 270,
        color: '#555555',
        padding: 10,
        height: 50,
        borderColor: '#32C5E6',
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#328FE6',
        margin: 20,
        backgroundColor: '#32c5e6'
    },
    label: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    }
});

export default styles;
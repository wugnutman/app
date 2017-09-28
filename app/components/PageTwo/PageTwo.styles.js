/**
 * Stylesheet for PageTwo component.
 */
import { StyleSheet } from 'react-native';

import normalize from '../../lib/normalize';

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // text: {
    //     color: 'black',
    //     fontSize: normalize(30),
    // },

    selfView: {
        width: 200,
        height: 150,
        margin: 10
    },
    remoteView: {
        width: 200,
        height: 150,
        margin: 10
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        margin: 10,
        margin: 10
    },
    listViewContainer: {
        height: 150,
        margin: 10
    },
});

export default styles;
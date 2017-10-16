import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

// ==============================> Import user defined components
import { Main, Album } from './components';

// ==============================> Screens for navigator
const AppNavigator = StackNavigator({
    main: { screen: Main },
    album: { screen: Album }
}, { headerMode: 'none' });

/**
 * @class : Root : Will introduce provider from redux when we needed.
 */
export default class LiveStreamingChatApp extends Component {

    render() {
        return (
            <AppNavigator />
        );
    }
}

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

// ==============================> Import user defined components
import { Main, Chat, ChatScreen } from './components';
import MainAlbum from './components/Main/MainAlbum';

// ==============================> Screens for navigator
const AppNavigator = StackNavigator({
    main: { screen: Main },
    mainAlbum: {screen: MainAlbum}
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

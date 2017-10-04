import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Main, Chat, ChatScreen } from './components';
import Album from './components/Main/Album';
import ImageViewer from './components/Main/ImageViewer';
import Settings from './components/Main/Settings';

const AppNavigator = StackNavigator({
    chat: { screen: Chat },
    chatScreen: { screen: ChatScreen },
    main: { screen: Main },
    album: { screen: Album },
    imageViewer: { screen: ImageViewer },
    settings: { screen: Settings },
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

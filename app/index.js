import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Main, Chat } from './components';
import Album from './components/Main/Album';
import ImageViewer from './components/Main/ImageViewer';
import Settings from './components/Main/Settings';

const AppNavigator = StackNavigator({
    main: { screen: Main },
    album: { screen: Album },
    imageViewer: { screen: ImageViewer },
    settings: { screen: Settings },
    chat: { screen: Chat },
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

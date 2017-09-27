import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Home, PageOne, PageTwo } from './components';

const AppNavigator = StackNavigator({
    home: { screen: Home },
    pageOne: { screen: PageOne },
    pageTwo: { screen: PageTwo }
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

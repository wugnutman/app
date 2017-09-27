import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Home } from './components';

/**
 * @class : Root : Will introduce provider from redux when we needed.
 */
export default class LiveStreamingChatApp extends Component {

    render() {
        return (
            <View>
                <Home />
            </View>
        );
    }
}

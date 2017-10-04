import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import SendBird from 'sendbird';

import styles from './ChatScreen.styles';
import { APP_ID } from '../../common/constants';

let sb;
let ChannelHandler;
let channel;
let _SELF = null;

/**
 * @class represents the ChatScreen component
 */
export default class ChatScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  componentDidMount() {
    _SELF = this;
    sb = new SendBird({ appId: APP_ID });
    ChannelHandler = new sb.ChannelHandler();
    console.log(sb);

    ChannelHandler.onMessageReceived = function (channel, message) {
      console.log(channel, message);
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            placeholder={'Message here...!'}
            maxLength={12}
            multiline={false}
          />

          <TouchableOpacity
            style={styles.button}
            underlayColor={'#328FE6'}
            onPress={this.onPress.bind(this)}
          >
            <Text style={styles.label}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onPress() {
    sb.connect(this.state.username, (result, error) => {
      console.log('result', result);
      console.log('error', error);

      sb.OpenChannel.createChannel('channelName', '', '', [sb.currentUser.userId], function (channel, error) {
        if (error) {
          console.log('Create OpenChannel Fail.', error);
          return;
        }
        channel.enter(function (response, error) {
          if (error) {
            console.log('Enter openChannel Fail.', error);
          }
          console.log('response create channel : ', response);
        })
      });
    })
  }

}

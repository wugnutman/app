import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import SendBird from 'sendbird';

import styles from './Chat.styles';
import { APP_ID } from '../../common/constants';

let sb;
let _SELF;
let thisChannel;

/**
 * @class represents the Chat component
 */
export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      channelname: ''
    }
  }

  componentDidMount() {
    _SELF = this;
    sb = new SendBird({ appId: APP_ID });
    console.log(sb);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            placeholder={'Enter User Nickname'}
            maxLength={12}
            multiline={false}
          />

          <TouchableOpacity
            style={styles.button}
            underlayColor={'#328FE6'}
            onPress={this.onPressConnect.bind(this)}
          >
            <Text style={styles.label}>CONNECT</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={this.state.channelname}
            onChangeText={(text) => this.setState({ channelname: text })}
            placeholder={'Enter Channel Name'}
            maxLength={12}
            multiline={false}
          />

          <TouchableOpacity
            style={styles.button}
            underlayColor={'#328FE6'}
            onPress={this.onPressCreateChannel.bind(this)}
          >
            <Text style={styles.label}>CREATE CHANNEL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            underlayColor={'#328FE6'}
            onPress={this.onPressJoinChannel.bind(this)}
          >
            <Text style={styles.label}>JOIN CHANNEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onPressConnect() {
    sb.connect(this.state.username, (result, error) => {
      console.log('connect', result, error);
    })
  }

  onPressCreateChannel() {
    sb.OpenChannel.createChannel(this.state.channelname, '', '', [sb.currentUser.userId], function (channel, error) {
      if (error) {
        console.log('Create OpenChannel Fail.', error);
        return;
      } else {
        thisChannel = channel;
        channel.enter(function (response, error) {
          if (error) {
            console.log('Enter openChannel Fail.', error);
          } else {
            console.log('response create channel : ', response, thisChannel);
            _SELF.props.navigation.navigate('chatScreen', { channel: thisChannel });
          }
        })
      }
    });
  }

  onPressJoinChannel() {
    //=============================> List of all open channels
    // let openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
    // openChannelListQuery.next(function (channels, error) {
    //   if (error) {
    //     console.log(error);
    //     return;
    //   }

    //   console.log(channels);
    // });

    //=============================> Get an open channel with channel URL.
    sb.OpenChannel.getChannel(this.state.channelname, function (channel, error) {
      if (error) {
        console.error(error);
        return;
      } else {
        // Successfully fetched the channel.
        console.log(channel);
        channel.enter(function (response, error) {
          if (error) {
            console.error(error);
            return;
          } else {
            console.log(response);
            _SELF.props.navigation.navigate('chatScreen', { channel: thisChannel });
          }
        });
      }
    });
  }

}

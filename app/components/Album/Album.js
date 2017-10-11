import React, { Component } from 'react';
import PhotoBrowser from 'react-native-photo-browser';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share, { ShareSheet, Button } from 'react-native-share';
import { Text, TouchableOpacity, View, Image } from 'react-native';

import styles from './Album.styles';
import {
    IMAGE_MEDIA_DEST, THUMB_MEDIA_DEST, TWITTER_ICON, FACEBOOK_ICON, CLIPBOARD_ICON, EMAIL_ICON, GOOGLE_PLUS_ICON,
    MORE_ICON, WHATSAPP_ICON
} from '../../common/constants';

/**
 * @class represents the Album component
 */
export default class Album extends Component {

    constructor(props) {
        super(props);
        this.state = {
            media: [],
            selection: false,
            visible: false
        }
    }

    componentDidMount() {
        // RNFS.readDir(RNFS.ExternalStorageDirectoryPath + THUMB_MEDIA_DEST)
        //     .then((result) => {
        //         const media = [];
        //         result.forEach((temp) => {
        //             media.push({
        //                 photo: 'file://' + temp.path,
        //                 thumb: 'file://' + temp.path
        //             })
        //         });
        //         this.setState({ media: media });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })

        let media = [];
        let dirImages, dirThumbs;
        RNFS.readDir(RNFS.ExternalStorageDirectoryPath + THUMB_MEDIA_DEST)
            .then((result) => {
                dirThumbs = result;
                RNFS.readDir(RNFS.ExternalStorageDirectoryPath + IMAGE_MEDIA_DEST)
                    .then((result) => {
                        dirImages = result;

                        dirThumbs.forEach(function (element, index) {
                            let obj = {};
                            obj.thumb = 'file://' + element.path;
                            obj.photo = 'file://' + dirImages[index].path;
                            media.push(obj)
                        });
                        this.setState({ media: media });
                    })
            });
    }

    // ==============================> Render function definition
    render() {

        let shareOptions = {
            title: "Andy's Solocator App",
            message: "It is a temporary message for checking purpose.",
            url: "http://facebook.github.io/react-native/",
            subject: "Andy's Solocator App : Subject for E-mail" //  for email
        };

        return (
            <View style={styles.container}>
                <PhotoBrowser
                    style={{ backgroundColor: 'black' }}
                    onBack={() => alert('back called')}
                    mediaList={this.state.media}
                    useCircleProgress={true}
                    alwaysDisplayStatusBar={false}
                    alwaysShowControls={false}
                    displayTopBar={true}
                    displayActionButton={true}
                    displayNavArrows={false}
                    enableGrid={true}
                    startOnGrid={true}
                    displaySelectionButtons={this.state.selection}
                    square={true}
                    itemPerRow={2}
                    onSelectionChanged={(media, index, selected) => {
                        console.log('on selection ::: ', media, index, selected);
                    }}
                    onActionButton={(media, index) => {
                        console.log('on action ::: ', media, index);
                        this.setState({ visible: true });
                    }}
                />

                {/* Header */}
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => this.setState({ selection: !this.state.selection })}>
                        {this.state.selection ?
                            <Text style={[styles.selectText, { color: '#fff' }]}>CANCEL</Text> :
                            <Text style={[styles.selectText, { color: '#34d058' }]}>SELECT</Text>
                        }
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                {/* <View style={styles.footerView}>
                    <Icon name="camera" style={styles.iconButton} />
                </View> */}

                {/* Share */}
                <ShareSheet visible={this.state.visible} onCancel={() => { this.setState({ visible: false }) }}>
                    <Button iconSrc={{ uri: TWITTER_ICON }}
                        onPress={() => {
                            this.setState({ visible: false })
                            setTimeout(() => {
                                shareOptions.social = "twitter";
                                Share.shareSingle(shareOptions);
                            }, 300);
                        }}>Twitter</Button>
                    <Button iconSrc={{ uri: FACEBOOK_ICON }}
                        onPress={() => {
                            this.setState({ visible: false })
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "facebook"
                                }));
                            }, 300);
                        }}>Facebook</Button>
                    <Button iconSrc={{ uri: WHATSAPP_ICON }}
                        onPress={() => {
                            this.setState({ visible: false })
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "whatsapp"
                                }));
                            }, 300);
                        }}>Whatsapp</Button>
                    <Button iconSrc={{ uri: GOOGLE_PLUS_ICON }}
                        onPress={() => {
                            this.setState({ visible: false })
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "googleplus"
                                }));
                            }, 300);
                        }}>Google +</Button>
                    <Button iconSrc={{ uri: EMAIL_ICON }}
                        onPress={() => {
                            this.setState({ visible: false })
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "email"
                                }));
                            }, 300);
                        }}>Email</Button>
                    <Button iconSrc={{ uri: MORE_ICON }}
                        onPress={() => {
                            this.setState({ visible: false })
                            setTimeout(() => {
                                Share.open(shareOptions)
                            }, 300);
                        }}>More</Button>
                </ShareSheet>
            </View>
        );
    }
}
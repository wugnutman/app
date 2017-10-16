import React, { Component } from 'react';
import PhotoBrowser from 'react-native-photo-browser';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share, { ShareSheet, Button } from 'react-native-share';
import { Text, TouchableOpacity, View, Image, ActivityIndicator, CameraRoll } from 'react-native';

import styles from './Album.styles';
import {
    IMAGE_MEDIA_DEST, THUMB_MEDIA_DEST, TWITTER_ICON, FACEBOOK_ICON, CLIPBOARD_ICON, EMAIL_ICON, GOOGLE_PLUS_ICON,
    MORE_ICON, WHATSAPP_ICON, SHARE_OPTIONS
} from '../../common/constants';

let selectedArray = [];

/**
 * @class represents the Album component
 */
export default class Album extends Component {

    constructor(props) {
        super(props);
        this.state = {
            media: [],
            shareVisible: false,
            selectedItem: null,
            visible: false,
            loading: true
        }
    }

    componentDidMount() {
        this.fetchImages();
    }

    /**
     * Loader method : returns ActivityIndicator
     */
    loader() {
        if (this.state.loading)
            return <View style={styles.loaderView}>
                <ActivityIndicator animating={true} size="large" />
            </View>;
    }

    /**
     * Render method definition.
     */
    render() {
        console.log(this.state);
        return (
            <View style={styles.container}>

                <View>
                    {/* Display images in grid viewff */}
                    <PhotoBrowser
                        ref="photobrowser"
                        style={styles.photoBrowserStyle}
                        onBack={() => this.props.navigation.goBack()}
                        mediaList={this.state.media}
                        useCircleProgress={true}
                        alwaysDisplayStatusBar={true}
                        alwaysShowControls={true}
                        displayTopBar={true}
                        displayActionButton={true}
                        displayNavArrows={false}
                        enableGrid={true}
                        startOnGrid={true}
                        displaySelectionButtons={this.state.shareVisible}
                        square={true}
                        itemPerRow={3}
                        onSelectionChanged={(media, index, selected) => {
                            console.log('on share Visible ::: ', media, index, selected);
                            if (selected) {
                                let tempArr = selectedArray;
                                tempArr.push(media);
                                selectedArray = tempArr;
                            } else {
                                let tempArr = selectedArray;
                                tempArr = tempArr.filter((item) => item.photo !== media.photo)
                                selectedArray = tempArr;
                            }
                            console.log(selectedArray);
                        }}
                        onActionButton={(media, index) => {
                            console.log('on action ::: ', media, index);
                            this.setState({ visible: true, selectedItem: media.photo });
                        }}
                    />

                    {/* Header */}
                    {this.state.media.length ?
                        <View style={styles.headerView}>
                            <TouchableOpacity onPress={() => {
                                selectedArray = [];
                                this.setState({ shareVisible: !this.state.shareVisible })
                            }}>
                                {this.state.shareVisible ?
                                    <Text style={styles.selectText}>CANCEL</Text> :
                                    <Text style={styles.selectText}>SELECT</Text>
                                }
                            </TouchableOpacity>
                        </View>
                        : null}

                    {/* Footer */}
                    {this.state.shareVisible ?
                        <View style={styles.footerView}>

                            <View style={styles.innerFooterView}>
                                <TouchableOpacity onPress={this.saveSelected.bind(this)}>
                                    <Icon name="floppy-o" style={styles.footerIconButton} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.innerFooterView}>
                                <TouchableOpacity onPress={this.deleteSelected.bind(this)}>
                                    <Icon name="trash" style={styles.footerIconButton} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}

                    {/* Share */}
                    <ShareSheet visible={this.state.visible} onCancel={() => { this.setState({ visible: false }) }}>

                        <Button iconSrc={{ uri: TWITTER_ICON }} onPress={this.share.bind(this, "twitter")}
                        >Twitter</Button>

                        <Button iconSrc={{ uri: FACEBOOK_ICON }} onPress={this.share.bind(this, "facebook")}
                        >Facebook</Button>

                        <Button iconSrc={{ uri: WHATSAPP_ICON }} onPress={this.share.bind(this, "whatsapp")}
                        >Whatsapp</Button>

                        <Button iconSrc={{ uri: GOOGLE_PLUS_ICON }} onPress={this.share.bind(this, "googleplus")}
                        >Google +</Button>

                        <Button iconSrc={{ uri: EMAIL_ICON }} onPress={this.share.bind(this, "email")}
                        >Email</Button>

                        <Button iconSrc={{ uri: MORE_ICON }} onPress={this.share.bind(this, null)}
                        >More</Button>

                    </ShareSheet>
                </View>
                {this.loader()}
            </View>
        );
    }

    /**
     * To Save selected images in Camera roll.
     */
    saveSelected() {
        console.log('save');
        selectedArray.map((item, index) => {
            CameraRoll.saveToCameraRoll(item.photo)
                .then(() => {
                    if (index + 1 === selectedArray.length) {
                        alert('Images saved to Camera Roll.');
                        this.setState({ shareVisible: false })
                    }
                })
        });
    }

    /**
     * To Delete selected images.
     */
    deleteSelected() {
        selectedArray.filter((item, index) => {
            // Check item.thumb exists? if yes then delete the thumb image by unlink method and process for the image.
            // Then check item.photo exists? if yes then delete the image by unlink method and call fetchImges to get New images.
            RNFS.exists(item.thumb)
                .then((isExist) => {
                    if (isExist) {
                        RNFS.unlink(item.thumb)
                            .then(() => {
                                RNFS.exists(item.photo)
                                    .then((isExist) => {
                                        if (isExist) {
                                            RNFS.unlink(item.photo)
                                                .then(() => {
                                                    if (index + 1 === selectedArray.length) {
                                                        selectedArray = [];
                                                        this.setState({ shareVisible: false })
                                                        this.fetchImages();
                                                    }
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                })
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        });
    }

    /**
     * Common method for all share buttons.
     * @param {Social share type} shareType 
     */
    share(shareType) {
        this.setState({ visible: false })

        setTimeout(() => {
            let shareOptions = {
                title: "Andy's Solocator App",
                message: "It is a temporary message for checking purpose.",
                url: "",
                subject: "Andy's Solocator App : Subject for E-mail" //  for email
            };

            if (shareType) {
                shareOptions.url = this.state.selectedItem;
                shareOptions.social = shareType;
                Share.shareSingle(shareOptions);
            } else {
                Share.open(shareOptions);
            }
        }, 500);
    }

    /**
     * Method to get images from directory.
     */
    fetchImages() {
        let media = [];
        let dirImages, dirThumbs;
        this.setState({ loading: true });

        // Read image files from Images and Thumbnails directory, and then display them.
        RNFS.readDir(RNFS.ExternalStorageDirectoryPath + THUMB_MEDIA_DEST)
            .then((result) => {
                dirThumbs = result;
                RNFS.readDir(RNFS.ExternalStorageDirectoryPath + IMAGE_MEDIA_DEST)
                    .then((result) => {
                        dirImages = result;

                        let tempLess, tempMore;

                        if (dirImages.length <= dirThumbs.length) {
                            tempLess = dirImages;
                            tempMore = dirThumbs;
                        } else {
                            tempLess = dirThumbs;
                            tempMore = dirImages;
                        }

                        tempLess.forEach(function (element, index) {
                            const tempObj = tempMore.find(x => x.name === element.name);
                            let obj = {};

                            if (element.path.includes('/Thumbnails')) {
                                obj.thumb = 'file://' + element.path;
                                obj.photo = 'file://' + tempObj.path;
                            } else {
                                obj.thumb = 'file://' + tempObj.path;
                                obj.photo = 'file://' + element.path;
                            }

                            media.push(obj)
                        });
                        media.reverse();
                        this.setState({ media: media, loading: false });
                    })
            });
    }
}
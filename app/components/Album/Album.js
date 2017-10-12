import React, { Component } from 'react';
import PhotoBrowser from 'react-native-photo-browser';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share, { ShareSheet, Button } from 'react-native-share';
import { Text, TouchableOpacity, View, Image } from 'react-native';

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
        }
    }

    componentDidMount() {
        this.fetchImages();
    }

    // ==============================> Render function definition
    render() {
        console.log(selectedArray);
        return (
            <View style={styles.container}>

                {/* Display images in grid viewff */}
                <PhotoBrowser
                    style={{ backgroundColor: 'black' }}
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
                    itemPerRow={2}
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
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => this.setState({ shareVisible: !this.state.shareVisible })}>
                        {this.state.shareVisible ?
                            <Text style={styles.selectText}>CANCEL</Text> :
                            <Text style={styles.selectText}>SELECT</Text>
                        }
                    </TouchableOpacity>
                </View>

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
        );
    }

    saveSelected() {
        alert('delete')
    }

    deleteSelected() {
        selectedArray.filter((item, index) => {
            RNFS.unlink(item.thumb)
                .then(() => {
                    RNFS.unlink(item.photo)
                        .then(() => {
                            console.log(index, selectedArray.length);
                            if(index+1 === selectedArray.length){
                                selectedArray = [];
                                this.fetchImages();
                            }
                        })
                        .catch((err) => {
                            alert(err.message);
                        })
                })
                .catch((err) => {
                    alert(err.message);
                })
        });
    }

    /**
     * Common method for all share buttons.
     * @param {Social share type} shareType 
     */
    share(shareType) {
        this.setState({ visible: false })

        let shareOptions = SHARE_OPTIONS;
        setTimeout(() => {
            if (shareType) {
                shareOptions.url = this.state.selectedItem;
                shareOptions.social = shareType;
                Share.shareSingle(shareOptions);
            } else {
                Share.open(shareOptions);
            }
        }, 500);
    }

    fetchImages() {
        let media = [];
        let dirImages, dirThumbs;
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
                        this.setState({ media: media });
                    })
            });
    }
}
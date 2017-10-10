import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, CameraRoll
} from 'react-native'
import Camera from 'react-native-camera';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageResizer from 'react-native-image-resizer';

import styles from './Main.styles';
import { MEDIA_DEST, IMAGE_MEDIA_DEST, THUMB_MEDIA_DEST } from '../../common/constants';

let self, IMAGE_NAME, MEDIA_DESTINATION, MEDIA_IMAGE_DESTINATION, MEDIA_THUMB_DESTINATION;

/**
 * @class represents the Main component
 */
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVideoMode: false
        }
    }

    componentDidMount() {
        self = this;
    }

    // ==============================> Capture Image
    onPressCapture() {
        this.camera.capture()
            .then((data) => {
                // Got captured image path stored in cache memory, in data object.

                // Define paths
                MEDIA_DESTINATION = RNFS.ExternalStorageDirectoryPath + MEDIA_DEST;
                MEDIA_IMAGE_DESTINATION = RNFS.ExternalStorageDirectoryPath + IMAGE_MEDIA_DEST;
                MEDIA_THUMB_DESTINATION = RNFS.ExternalStorageDirectoryPath + THUMB_MEDIA_DEST;
                IMAGE_NAME = '/' + Math.floor(new Date()).toString() + '.jpg';

                // =====> To check whether Main Directory path is exist or not
                self.checkPath(MEDIA_DESTINATION)
                    .then((isExist) => {
                        if (isExist) {
                            self.workInImages(data);
                        } else {
                            RNFS.mkdir(MEDIA_DESTINATION)
                                .then(() => {
                                    self.workInImages(data);
                                })
                        }
                    })
            })
            .catch(err => {
                console.error(err)
            });
    }

    workInImages(data) {
        // 1- Thumbnail 2- Image

        // 1- Check and further for Thumbnail directory.
        self.checkPath(MEDIA_THUMB_DESTINATION)
            .then((isThumbExist) => {
                let compressedPath;
                // To get Thumbnail image
                self.compressImage(data.path)
                    .then((response) => {
                        // Store thumbnail path in variable compressedPath.
                        compressedPath = response.path;
                        if (isThumbExist) {
                            self.moveImage(compressedPath, (MEDIA_THUMB_DESTINATION + IMAGE_NAME));

                            // 2- Check and further for Images directory.
                            self.checkPath(MEDIA_IMAGE_DESTINATION)
                                .then((isImagesExist) => {
                                    if (isImagesExist) {
                                        self.moveImage(data.path, (MEDIA_IMAGE_DESTINATION + IMAGE_NAME));
                                    } else {
                                        RNFS.mkdir(MEDIA_IMAGE_DESTINATION)
                                            .then(() => {
                                                self.moveImage(data.path, (MEDIA_IMAGE_DESTINATION + IMAGE_NAME));
                                            })
                                    }
                                })
                        } else {
                            RNFS.mkdir(MEDIA_THUMB_DESTINATION)
                                .then(() => {
                                    self.moveImage(compressedPath, (MEDIA_THUMB_DESTINATION + IMAGE_NAME));

                                    // 2- Check and further for Images directory.
                                    self.checkPath(MEDIA_IMAGE_DESTINATION)
                                        .then((isImagesExist) => {
                                            if (isImagesExist) {
                                                self.moveImage(data.path, (MEDIA_IMAGE_DESTINATION + IMAGE_NAME));
                                            } else {
                                                RNFS.mkdir(MEDIA_IMAGE_DESTINATION)
                                                    .then(() => {
                                                        self.moveImage(data.path, (MEDIA_IMAGE_DESTINATION + IMAGE_NAME));
                                                    })
                                            }
                                        })
                                })
                        }
                    })
            });
    }

    /**
     * Used to resize or compress the image.
     * @param {Image path to resize} img 
     */
    compressImage(img) {
        return ImageResizer.createResizedImage(img, 200, 200, 'JPEG', 100)
    }

    /**
     * Used to move file from path to given destination path.
     * @param {Image Path or Move From} data 
     * @param {Destination Path or Move To} destinationPath 
     */
    moveImage(data, destinationPath) {
        RNFS.moveFile(data, destinationPath)
            .then(() => {
                console.log('Successfully file moved!');
            })
            .catch((err) => {
                console.log("Error while moving : ", err.message);
            });
    }

    /**
     * Used to check given path is exists or not.
     * @param {Path to check existence} path 
     */
    checkPath(path) {
        return RNFS.exists(path);
    }

    // ==============================> To Stop Video recording
    onPressCaptureStop() {
        this.camera.stopCapture()
            .then((data) => {
                console.log(data);
            })
            .catch(err => {
                console.error(err)
            });
    }

    // ==============================> Move to Album screen
    onPressAlbumButton() {
        this.props.navigation.navigate('mainAlbum');
    }

    // ==============================> Toggle Camer/Video icon
    toggleCameraMode() {
        const { isVideoMode } = this.state;
        this.setState({
            isVideoMode: !isVideoMode
        })
    }

    // ==============================> Render function definition
    render() {
        return (
            <Camera
                ref={(cam) => { this.camera = cam }}
                captureTarget={Camera.constants.CaptureTarget.temp}
                captureQuality={Camera.constants.CaptureQuality.high}
                aspect={Camera.constants.Aspect.fill}
                style={styles.container}
            >
                <View style={styles.menuContainer}>

                    {/* Album View */}
                    <TouchableOpacity onPress={this.onPressAlbumButton.bind(this)}>
                        <Image
                            source={require('../../common/images/user.jpg')}
                            style={styles.albumButton}
                        />
                    </TouchableOpacity>

                    {/* Location */}
                    <TouchableOpacity style={{ marginTop: 2 }} onPress={() => alert("Loaction screen, Under developement.")}>
                        <Icon name="compass" style={styles.iconButton} />
                    </TouchableOpacity>

                    {/* Capture Image / Video */}
                    <TouchableOpacity onPress={this.onPressCapture.bind(this)}>
                        <View style={styles.captureButton} />
                    </TouchableOpacity>

                    {/* Settings */}
                    <TouchableOpacity onPress={() => alert("Settings screen, Under developement.")}>
                        <Icon name="cog" style={styles.iconButton} />
                    </TouchableOpacity>

                    {/* Toggle Camera / Video */}
                    <TouchableOpacity onPress={this.toggleCameraMode.bind(this)}>
                        {
                            this.state.isVideoMode ?
                                <Icon name="camera" style={styles.iconButton} /> :
                                <Icon name="video-camera" style={styles.iconButton} />
                        }
                    </TouchableOpacity>

                </View>
            </Camera>
        );
    }
}
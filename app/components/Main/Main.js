import React, { Component } from 'react'
import Camera from 'react-native-camera';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, CameraRoll, AsyncStorage, ActivityIndicator
} from 'react-native'

import styles from './Main.styles';
import { MEDIA_DEST, IMAGE_MEDIA_DEST, THUMB_MEDIA_DEST } from '../../common/constants';
import { checkPath, compressImage, moveImage } from '../../common/utility';

let self, IMAGE_NAME, MEDIA_DESTINATION, MEDIA_IMAGE_DESTINATION, MEDIA_THUMB_DESTINATION;

/**
 * @class represents the Main component
 */
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVideoMode: false,
            albumImage: null,
            loading: false
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('lastClickedImage', (err, result) => {
            this.setState({ albumImage: result });
        })
    }

    componentDidMount() {
        self = this;
    }

    // ==============================> Capture Image
    onPressCapture() {
        this.setState({ loading: true });
        this.camera.capture()
            .then((data) => {
                // Got captured image path stored in cache memory, in data object.

                // Define paths
                MEDIA_DESTINATION = RNFS.ExternalStorageDirectoryPath + MEDIA_DEST;
                MEDIA_IMAGE_DESTINATION = RNFS.ExternalStorageDirectoryPath + IMAGE_MEDIA_DEST;
                MEDIA_THUMB_DESTINATION = RNFS.ExternalStorageDirectoryPath + THUMB_MEDIA_DEST;
                IMAGE_NAME = '/' + Math.floor(new Date()).toString() + '.jpg';

                // =====> To check whether Main Directory path is exist or not
                checkPath(MEDIA_DESTINATION)
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
        checkPath(MEDIA_THUMB_DESTINATION)
            .then((isThumbExist) => {
                let compressedPath;
                // To get Thumbnail image
                compressImage(data.path, 160, 160, 'JPEG', 100)
                    .then((response) => {
                        // Save thumbnail path in compressedPath variable.
                        compressedPath = response.path;

                        // If Thumbnail dir exist, Thumbnail image moved to that folder and start working on Actual image.
                        if (isThumbExist) {
                            AsyncStorage.setItem('lastClickedImage', MEDIA_THUMB_DESTINATION + IMAGE_NAME);
                            this.setState({ albumImage: MEDIA_THUMB_DESTINATION + IMAGE_NAME })

                            moveImage(compressedPath, (MEDIA_THUMB_DESTINATION + IMAGE_NAME));

                            // 2- Check and further for Images directory.
                            checkPath(MEDIA_IMAGE_DESTINATION)
                                .then((isImagesExist) => {
                                    if (isImagesExist) {
                                        moveImage(data.path, (MEDIA_IMAGE_DESTINATION + IMAGE_NAME));
                                        this.setState({ loading: false });
                                    } else {
                                        RNFS.mkdir(MEDIA_IMAGE_DESTINATION)
                                            .then(() => {
                                                moveImage(data.path, (MEDIA_IMAGE_DESTINATION + IMAGE_NAME));
                                                this.setState({ loading: false });
                                            })
                                    }
                                })
                        } else {
                            // If Thumbnail dir doesn't exist, make Thumbnail dir.
                            // Then thubmnail image moved to that folder and start working on Actual image.
                            RNFS.mkdir(MEDIA_THUMB_DESTINATION)
                                .then(() => {
                                    moveImage(compressedPath, (MEDIA_THUMB_DESTINATION + IMAGE_NAME));

                                    // 2- Check and working for Images directory.
                                    checkPath(MEDIA_IMAGE_DESTINATION)
                                        .then((isImagesExist) => {
                                            if (isImagesExist) {
                                                moveImage(data.path, (MEDIA_IMAGE_DESTINATION + IMAGE_NAME));
                                                this.setState({ loading: false });
                                            } else {
                                                RNFS.mkdir(MEDIA_IMAGE_DESTINATION)
                                                    .then(() => {
                                                        moveImage(data.path, (MEDIA_IMAGE_DESTINATION + IMAGE_NAME));
                                                        this.setState({ loading: false });
                                                    })
                                            }
                                        })
                                })
                        }
                    })
            });
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
        this.props.navigation.navigate('album');
    }

    // ==============================> Toggle Camer/Video icon
    toggleCameraMode() {
        const { isVideoMode } = this.state;
        this.setState({
            isVideoMode: !isVideoMode
        })
    }

    // ==============================> Loader
    loader() {
        if (this.state.loading)
            return <ActivityIndicator size="large" hidesWhenStopped={true} />;
    }

    // ==============================> Render function definition
    render() {
        return (
            <Camera
                ref={(cam) => { this.camera = cam }}
                captureTarget={Camera.constants.CaptureTarget.temp}
                captureQuality={Camera.constants.CaptureQuality.high}
                aspect={Camera.constants.Aspect.fill}
                style={this.state.loading ? [styles.container, { justifyContent: 'center' }] : styles.container}
            >
                {this.state.loading ? null :
                    <View style={styles.menuContainer}>

                        {/* Album View */}
                        <TouchableOpacity onPress={this.onPressAlbumButton.bind(this)}>
                            <Image
                                source={{ uri: 'file://' + this.state.albumImage }}
                                style={styles.albumButton}
                            />
                        </TouchableOpacity>

                        {/* Location */}
                        <TouchableOpacity style={{ marginTop: 2 }} onPress={() => alert("Loaction screen, Under developement.")}>
                            <Icon name="compass" style={styles.iconButton} />
                        </TouchableOpacity>

                        {/* Capture Image/Video */}
                        <TouchableOpacity onPress={this.onPressCapture.bind(this)}>
                            <View style={styles.captureButtonOuter}>
                                <View style={styles.captureButton} />
                            </View>
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
                }
                {this.loader()}
            </Camera>
        );
    }
}
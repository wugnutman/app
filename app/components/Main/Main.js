import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, CameraRoll
} from 'react-native'
import Camera from 'react-native-camera';
import * as Exif from 'react-native-exif';
import RNThumbnail from 'react-native-thumbnail';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Main.styles';

/**
 * @class represents the Main component
 */
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVideoMode: true
        }
    }

    // ==============================> Capture Image
    onPressCapture() {
        this.camera.capture({ thumbnail: true, width: true })
            .then((data) => {

                // Got image path in data object
                console.log(data);

                // To make Thumbnail of captured image
                RNThumbnail.get(data.path).then((result) => {
                    console.log(result.path);
                });

                // To Get metadata from captured image
                Exif.getExif(data.path)
                    .then((msg) => {
                        console.warn('getExif: ' + msg)
                    })
                    .catch((msg) => {
                        console.warn('ERROR: ' + msg)
                    })
                Exif.getLatLong(data.path)
                    .then((msg) => {
                        console.warn('OK: ' + msg)
                    })
                    .catch((msg) => {
                        console.warn('ERROR: ' + msg)
                    })
            })
            .catch(err => {
                console.error(err)
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
        console.log(Camera.constants.CaptureTarget.temp);
        /**
         * captureTarget :
         * in DCIM folder or where default camera store the images => Camera.constants.CaptureTarget.cameraRoll
         * in cache memory, image will not shown in gallery => Camera.constants.CaptureTarget.temp
         * in Disk, com.projectName folder => Camera.constants.CaptureTarget.disk
         */
        return (
            <Camera
                ref={(cam) => { this.camera = cam }}
                captureTarget={Camera.constants.CaptureTarget.temp}
                captureQuality={Camera.constants.CaptureQuality["1080p"]}
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
                                <Icon name="video-camera" style={styles.iconButton} /> :
                                <Icon name="camera" style={styles.iconButton} />
                        }
                    </TouchableOpacity>

                </View>
            </Camera>
        );
    }
}
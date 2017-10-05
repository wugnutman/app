import React, { Component } from 'react';
import {
    ActionSheetIOS,
    CameraRoll,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';

import PhotoBrowser from 'react-native-photo-browser';

class MainAlbum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            media: []
        }
    }

    componentWillMount() {
        CameraRoll.getPhotos({
            first: 30,
            assetType: 'Photos',
        })
            .then((data) => {
                console.log(data);
                const media = [];
                data.edges.forEach((d) => {
                    console.log(d);
                    media.push({
                        photo: d.node.image.uri,
                        thumb: d.node.image.uri,
                    })
                });
                this.setState({ media: media });
            })
            .catch(error => alert(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <PhotoBrowser
                    mediaList={this.state.media}
                    useCircleProgress={true}
                    alwaysDisplayStatusBar={true}
                    alwaysShowControls={true}
                    displayActionButton={true}
                    displayNavArrows={true}
                    displayTopBar={true}
                    enableGrid={true}
                    startOnGrid={true}
                    displaySelectionButtons={true}
                    square={true}
                    onSelectionChanged={(media, index, selected) => {
                        console.log('on selection ::: ', media, index, selected);
                    }}
                    onActionButton={(media, index) => {
                        console.log('on action ::: ', media, index);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})

export default MainAlbum;

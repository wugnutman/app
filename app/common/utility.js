// Methods for reusability.

import * as RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

/**
 * Used to resize or compress the image.
 * @param {Image path to resize} img 
 */
export const compressImage = (imgPath, newWidth, newHeight, format, quality) => {
    return ImageResizer.createResizedImage(imgPath, newWidth, newHeight, format, quality)
}

/**
 * Used to move file from path to given destination path.
 * @param {Image Path or Move From} data 
 * @param {Destination Path or Move To} destinationPath 
 */
export const moveImage = (data, destinationPath) => {
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
export const checkPath = (path) => {
    return RNFS.exists(path);
}
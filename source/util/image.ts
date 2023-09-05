import RNFS from 'react-native-fs';
import { ImageOrVideo, openCamera, openPicker, Options } from "react-native-image-crop-picker";

import { CARD_HEIGHT, CARD_WIDTH, IMAGE_QUALITY } from "../constant";
import { now } from './date';
import { getCameraPermission, getGalleryPermission } from "./permission";

const getImageBy = (openner: (options: Options) => Promise<ImageOrVideo>) => {
	return openner({ 
		mediaType: 'any', 
		cropping: true,
		compressVideoPreset: 'HighestQuality',
		freeStyleCropEnabled: true,
		width: IMAGE_QUALITY * CARD_WIDTH,
		height: IMAGE_QUALITY * CARD_HEIGHT,
	});
};

const getImageFromCamera = async () => {
	await getCameraPermission();
	return getImageBy(openCamera);
};

const getImageFromGallery = async () => {
	await getGalleryPermission();
	return getImageBy(openPicker);
};

export const saveLocalFs = async (image: ImageOrVideo) => {
	const path = `${RNFS.DocumentDirectoryPath}/${now().unix()}.jpg`.replace(/:/g, '-');
	try {
		await RNFS.moveFile(image.path, path);
		return path;
	} catch {
		console.error('error in file system');
	}
};

export const pictureFromCamera = () => getImageFromCamera().then(saveLocalFs);
export const pictureFromGallery = () => getImageFromGallery().then(saveLocalFs);
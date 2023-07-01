import RNFS from 'react-native-fs';
import { ImageOrVideo, openCamera, openPicker, Options } from "react-native-image-crop-picker";

import { CARD_HEIGHT, CARD_WIDTH, IMAGE_QUALITY, isIOS } from "../constant";
import { now } from './date';
import { getCameraPermission, getGalleryPermission } from "./permission";

const pictureFrom = (openner: (options: Options) => Promise<ImageOrVideo>) => {
	return openner({ 
		mediaType: 'any', 
		cropping: true,
		compressVideoPreset: 'MediumQuality',
		width: IMAGE_QUALITY * CARD_WIDTH,
		height: IMAGE_QUALITY * CARD_HEIGHT,
	});
};

const getImageFromCamera = async () => {
	await getCameraPermission();
	return pictureFrom(openCamera);
};

const getImageFromGallery = async () => {
	await getGalleryPermission();
	return pictureFrom(openPicker);
};

export const saveLocalFs = async (image: ImageOrVideo) => {
	const path = `${RNFS.DocumentDirectoryPath}/${now().toISOString()}.jpg`.replace(/:/g, '-');
	try {
		if (isIOS) {
			if (image.mime.startsWith('image')) {
				await RNFS.copyAssetsFileIOS(
					image.path, path, IMAGE_QUALITY * CARD_WIDTH, IMAGE_QUALITY * CARD_HEIGHT,
				);
			} else {
				await RNFS.copyAssetsVideoIOS(image.path, path);
			}
		} else {
			await RNFS.copyFileAssets(image.path, path);
		}
		return path;
	} catch {
		console.error('error in file system');
	}
};

export const pictureFromCamera = () => getImageFromCamera().then(saveLocalFs);
export const pictureFromGallery = () => getImageFromGallery().then(saveLocalFs);
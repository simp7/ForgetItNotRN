import { ImageOrVideo, openCamera, openPicker, Options } from "react-native-image-crop-picker";

import { CARD_HEIGHT, CARD_WIDTH } from "../constant";
import { getCameraPermission, getGalleryPermission } from "./permission";

const pictureFrom = (openner: (options: Options) => Promise<ImageOrVideo>) => {
	const quality = 4;
	return openner({ 
		mediaType: 'any', 
		cropping: true,
		compressVideoPreset: 'MediumQuality',
		width: quality * CARD_WIDTH,
		height: quality * CARD_HEIGHT,
	});
};

export const pictureFromCamera = async () => {
	const permitted = await getCameraPermission();
	if (permitted) {
		return pictureFrom(openCamera);
	}
	return null;
};

export const pictureFromGallery = async () => {
	const permitted = await getGalleryPermission();
	if (permitted) {
		return pictureFrom(openPicker);
	}
	return null;
};

export const saveLocally = (image: ImageOrVideo) => {
};
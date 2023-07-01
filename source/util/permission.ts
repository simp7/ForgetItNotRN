import {
	check,
	Permission,
	PERMISSIONS,
	request,
	RESULTS,
} from "react-native-permissions";

import { isIOS } from "../constant";

const checkAndRequest = async (permission: Permission) => {
	return check(permission).then(async result => {
		switch (result) {
		case RESULTS.DENIED:
			console.log(
				'The permission has not been requested / is denied but requestable',
			);
			return request(permission);
		case RESULTS.GRANTED:
			console.log('The permission is granted');
		case RESULTS.UNAVAILABLE:
			console.log(
				'This feature is not available (on this device / in this context)',
			);
			break;
		case RESULTS.LIMITED:
			console.log('The permission is limited: some actions are possible');
			break;
		case RESULTS.BLOCKED:
			console.log('The permission is denied and not requestable anymore');
			break;
		}
		console.log('Unspecified permission error');
	});
};

export const getGalleryPermission = async () => {
	try {
		return checkAndRequest(isIOS ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
	} catch {
		console.error('Permission error in gallery');
	}
};

export const getCameraPermission = async () => {
	try {
		return checkAndRequest(isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
	} catch {
		console.error('Permission error in camera');
	}
};
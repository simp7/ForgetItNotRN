import { Dimensions, Platform } from "react-native";

import { Setting } from "./model/setting";

export const isIOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const BOTTOM_SAFE_HEIGHT = isIOS ? 34 : 0;

export const DEFAULT_PERIOD = [1, 3, 7, 16, 30];

export const DEFAULT_SETTING: Setting = {
	targetRate: 75,
	darkMode: false,
	notification: false,
};

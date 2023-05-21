import { Dimensions, Platform } from "react-native";

export const isIOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const BOTTOM_SAFE_HEIGHT = isIOS ? 34 : 0;
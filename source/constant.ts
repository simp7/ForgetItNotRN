import { Dimensions, Platform } from "react-native";

import { CardData, InputType } from "./model/cardData";
import { Periods, TotalResult } from "./model/period";
import { Setting } from "./model/setting";
import { Streaks } from "./model/streaks";
import { Training } from "./model/training";

export const isIOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const BOTTOM_SAFE_HEIGHT = isIOS ? 34 : 0;

export const IMAGE_QUALITY = 4;

export const CARD_WIDTH = 330;
export const CARD_HEIGHT = 500;
export const CARD_TILT_ANGLE = Math.PI / 12;
export const CARD_A = CARD_HEIGHT * Math.sin(CARD_TILT_ANGLE) + CARD_WIDTH * Math.cos(CARD_TILT_ANGLE);

export const DEFAULT_PERIODS: Periods = [1, 3, 7, 16, 30];

export const DEFAULT_SETTING: Setting = {
	targetRate: 75,
	darkMode: false,
	notification: false,
};

export const DEFAULT_TOTAL_RESULT: TotalResult = [[], [], [], [], []];

export const DEFAULT_TRAINING: Training = {
	target: [],
	index: 0,
};

export const DEFAULT_CARD_DATA: CardData = {
	question: {
		type: InputType.Text,
		data: '',
	},
	lastReviewed: '',
	repeat: 0,
};

export const DEFAULT_STREAKS: Streaks = {
	max: 0,
	current: 0,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const APP_VERSION = require('../package.json').version;
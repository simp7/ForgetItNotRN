import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs, { Dayjs } from "dayjs";

import {
	DEFAULT_PERIODS,
	DEFAULT_SETTING,
	DEFAULT_STREAKS,
	DEFAULT_TOTAL_RESULT,
	DEFAULT_TRAINING,
} from "../constant";
import { CardData } from "../model/cardData";
import { Periods, TotalResult } from "../model/period";
import { Setting } from "../model/setting";
import { isStreakValid, Streaks } from "../model/streaks";
import { initTraining, Training } from "../model/training";
import { formatDate, now } from "./date";

enum StorageKey {
	lastOpened = 'LAST_OPENED',
	period = 'PERIOD',
	setting = 'SETTING',
	training = 'TRAINING',
	result = 'RESULT_DATA',
	streaks = 'STREAK'
}

const load = async <T, > (key: string, defaultValue: T) => {
	const rawData = await AsyncStorage.getItem(key) ?? "";
	const result: T = !!rawData ? JSON.parse(rawData) : defaultValue;
	return result;
};
const save = async <T, > (key: string, data: T) => AsyncStorage.setItem(key, JSON.stringify(data));

export const loadLastOpenedDate = async () => load(StorageKey.lastOpened, "");
// export const loadLastOpenedDate = async () => formatDate(now().add(-1, 'days'));
export const updateLastOpenedDate = async () => save(StorageKey.lastOpened, formatDate(now()));

const getCardKey = (index: number) => `Box_${index+1}`;
export const loadCardData = async (index: number) => load<CardData[]>(getCardKey(index), []);
export const saveCardData = async (index: number, data: CardData[]) => save(getCardKey(index), data);

export const loadPeriod = async () => {
	return load(StorageKey.period, DEFAULT_PERIODS);
};
export const savePeriod = async (period: Periods) => save(StorageKey.period, period);

export const loadSetting = async () => load(StorageKey.setting, DEFAULT_SETTING);
export const saveSetting = async (setting: Setting) => save(StorageKey.setting, setting);

export const loadStreaks = () => load(StorageKey.streaks, DEFAULT_STREAKS);
export const loadStreaksWhenOpened = async () => {
	const lastOpened = await loadLastOpenedDate();
	const loaded = await loadStreaks();
	const training = await loadTmpTraining();
	const streakValidity = await isStreakValid(lastOpened, training.target.length === 0);
	console.log('check streak...');
	if (!streakValidity) {
		console.log('streak broken!');
		const result: Streaks = { ...loaded, current: 0 };
		saveStreaks(result);
		return result;
	}
	return loaded;
};
export const saveStreaks = (stat: Streaks) => save(StorageKey.streaks, stat);

const loadCardDataByPeriod = async (index: number, limit: Dayjs) => {
	return (await loadCardData(index)).filter(data => !dayjs(data.lastReviewed).isAfter(limit, 'date'));
};

const loadNewTrainingToday = async () => {
	const period = await loadPeriod();
	return Promise.all(period.map( async (period, index) => {
		return await loadCardDataByPeriod(index, now().subtract(period, 'day'));
	}));
};

export const loadTmpTraining = async () => load(StorageKey.training, DEFAULT_TRAINING);
export const loadTmpTrainingToday = async () => {
	const lastOpened = await loadLastOpenedDate();
	if (lastOpened === formatDate(now())) {
		return loadTmpTraining();
	}
	const data = await loadNewTrainingToday();
	const training = initTraining(data);
	saveTmpTrainingToday(training);
	return training;
};
export const saveTmpTrainingToday = async (training: Training) => save(StorageKey.training, training);

export const loadPreviousResult = async () => load<TotalResult>(StorageKey.result, DEFAULT_TOTAL_RESULT);
export const savePreviousResult = async (newResult: TotalResult) => {
	return save(StorageKey.result, newResult);
};

const removeCard = (array: CardData[], data: CardData) => {
	return array.splice(array.findIndex(element => element !== data), 1);
};

export const removeCardFromStorage = async (data: CardData) => {
	const index = data.repeat;
	const previousArray = await loadCardData(index);
	return saveCardData(index, removeCard(previousArray, data));
};

const moveCard = async (data: CardData, to_box: number) => {
	const previous = data.repeat;
	const previousArray = await loadCardData(previous);
	await saveCardData(previous, removeCard(previousArray, data));

	const nextArray = await loadCardData(to_box) ?? [];
	const nextCard: CardData = {
		...data,
		repeat: to_box,
		lastReviewed: formatDate(now()),
	};
	await saveCardData(to_box, nextArray.concat(nextCard));
};
export const moveCardForward = async (data: CardData) => {
	return moveCard(data, data.repeat + 1);
};

export const moveCardBackward = async (data: CardData) => {
	return moveCard(data, data.repeat === 0 ? 0 : data.repeat - 1);
};
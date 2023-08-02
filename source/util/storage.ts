import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs, { Dayjs } from "dayjs";

import {
	DEFAULT_PERIODS,
	DEFAULT_SETTING,
	DEFAULT_STAT,
	DEFAULT_TOTAL_RESULT,
	DEFAULT_TRAINING,
} from "../constant";
import { CardData } from "../model/cardData";
import { Periods, TotalDailyResult } from "../model/period";
import { Setting } from "../model/setting";
import { isStreakValid, Stat } from "../model/stat";
import { initTraining, Training } from "../model/training";
import { formatDate, now } from "./date";

enum StorageKey {
	lastOpened = 'LAST_OPENED',
	period = 'PERIOD',
	setting = 'SETTING',
	training = 'TRAINING',
	result = 'RESULT_DATA',
	stat = 'STAT'
}

const load = async <T, > (key: string, defaultValue: T) => {
	const rawData = await AsyncStorage.getItem(key) ?? "";
	const result: T = !!rawData ? JSON.parse(rawData) : defaultValue;
	return result;
};
const save = async <T, > (key: string, data: T) => AsyncStorage.setItem(key, JSON.stringify(data));

export const loadLastOpenedDate = async () => load(StorageKey.lastOpened, "");
export const saveLastOpenedDate = async () => save(StorageKey.lastOpened, formatDate(now()));

const getCardKey = (index: number) => `Box_${index+1}`;
export const loadCardData = async (index: number) => load<CardData[]>(getCardKey(index), []);
export const saveCardData = async (index: number, data: CardData[]) => save(getCardKey(index), data);

export const loadPeriod = async () => {
	return load(StorageKey.period, DEFAULT_PERIODS);
};
export const savePeriod = async (period: Periods) => save(StorageKey.period, period);

export const loadSetting = async () => load(StorageKey.setting, DEFAULT_SETTING);
export const saveSetting = async (setting: Setting) => save(StorageKey.setting, setting);

export const loadStat = () => load(StorageKey.stat, DEFAULT_STAT);
export const saveStat = (stat: Stat) => save(StorageKey.stat, stat);

const loadCardDataByPeriod = async (index: number, limit: Dayjs) => {
	return (await loadCardData(index)).filter(data => !dayjs(data.lastReviewed).isAfter(limit, 'date'));
};

const loadNewTrainingToday = async () => {
	const period = await loadPeriod();
	return Promise.all(period.map( async (period, index) => {
		console.log(period, now().subtract(period, 'day'));
		return await loadCardDataByPeriod(index, now().subtract(period, 'day'));
	}));
};

export const loadTmpTrainingToday = async () => {
	return load(StorageKey.training, DEFAULT_TRAINING);
};
export const saveTmpTrainingToday = async (training: Training) => save(StorageKey.training, training);

export const keepUpdated = async () => {
	console.log('keepupdated');
	const lastOpened = await loadLastOpenedDate();
	if (lastOpened !== formatDate(now())) {
		const training = await loadTmpTrainingToday();
		if (!isStreakValid(lastOpened, training.result.length !== training.index)) {
			loadStat().then(stat => saveStat({ ...stat, currentStreak: 0 }));
		}
		saveLastOpenedDate();
		await saveTmpTrainingToday(initTraining(await loadNewTrainingToday()));
	}
};

export const loadPreviousResult = async () => load<TotalDailyResult>(StorageKey.result, DEFAULT_TOTAL_RESULT);
export const savePreviousResult = async (newResult: TotalDailyResult) => {
	return save(StorageKey.result, newResult);
};

const removeCard = (array: CardData[], data: CardData) => {
	return array.splice(array.findIndex(element => element !== data), 1);
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
	return moveCard(data, data.repeat === 1 ? 1 : data.repeat - 1);
};
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs, { Dayjs } from "dayjs";

import { DEFAULT_PERIODS, DEFAULT_SETTING, DEFAULT_TRAINING } from "../constant";
import { CardData } from "../model/cardData";
import { Periods } from "../model/period";
import { Setting } from "../model/setting";
import { initTraining, Training } from "../model/training";
import { formatDate, now } from "./date";

enum StorageKey {
	lastOpened = 'LAST_OPENED',
	period = 'PERIOD',
	setting = 'SETTING',
	training = 'TRAINING',
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

const loadCardDataByPeriod = async (index: number, limit: Dayjs) => {
	return (await loadCardData(index)).filter(data => dayjs(data.lastReviewed).isAfter(limit, 'date'));
};

const loadNewTrainingToday = async () => {
	const period = await loadPeriod();
	return Promise.all(period.map( async (period, index) => {
		return await loadCardDataByPeriod(index, now().add(period, 'day'));
	}));
};

export const loadTrainingToday = async () => {
	await keepUpdated();
	return load(StorageKey.training, DEFAULT_TRAINING);
};
export const saveTmpTrainingToday = async (training: Training) => save(StorageKey.training, training);

const keepUpdated = async () => {
	const lastOpened = await loadLastOpenedDate();
	if (lastOpened !== formatDate(now())) {
		saveLastOpenedDate();
		await saveTmpTrainingToday(initTraining(await loadNewTrainingToday()));
	}
};
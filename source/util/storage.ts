import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dayjs } from "dayjs";

import { DEFAULT_PERIOD, DEFAULT_SETTING } from "../constant";
import { CardData, Period } from "../model/cardData";
import { Setting } from "../model/setting";
import { formatDate, now } from "./date";

enum StorageKey {
	lastOpened = 'LAST_OPENED',
	period = 'CORE',
	setting = 'SETTING',
}

const load = async <T, > (key: string, defaultValue: T) => {
	const rawData = await AsyncStorage.getItem(key) ?? "";
	const result: T = !!rawData ? JSON.parse(rawData) : defaultValue;
	return result;
};
const save = async <T, > (key: string, data: T) => AsyncStorage.setItem(key, JSON.stringify(data));

export const loadLastOpenedDate = async () => load(StorageKey.lastOpened, "");
export const saveLastOpenedDate = async () => save(StorageKey.lastOpened, formatDate(now()));

const getCardKey = (date: Dayjs) => 'card' + formatDate(date);
export const loadCardData = async (date: Dayjs) => load<CardData[]>(getCardKey(date), []);
export const saveCardData = async (date: Dayjs, data: CardData[]) => save(getCardKey(date), data);

export const loadPeriod = async () => {
	const lastOpened = await loadLastOpenedDate();
	if (lastOpened !== formatDate(now())) {
		// TODO: add logic for loading reiview for today.
		saveLastOpenedDate();
	}
	return load(StorageKey.period, DEFAULT_PERIOD);
};
export const savePeriod = async (core: Period) => save(StorageKey.period, core);

export const loadSetting = async () => load(StorageKey.setting, DEFAULT_SETTING);
export const saveSetting = async (setting: Setting) => save(StorageKey.setting, setting);

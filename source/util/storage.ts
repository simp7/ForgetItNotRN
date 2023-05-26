import AsyncStorage from "@react-native-async-storage/async-storage";

import { CardData } from "../model/cardData";
import { Setting } from "../model/setting";
import { now } from "./date";

enum StorageKey {
	lastOpened = 'LAST_OPENED',
	setting = 'SETTING',
}

export const getLastOpenedDate = async () => {
	return AsyncStorage.getItem(StorageKey.lastOpened) ?? "";
};

export const setLastOpenedDate = async () => {
	return AsyncStorage.setItem(StorageKey.lastOpened, now());
};

export const getSetting = async () => {
	const raw = await AsyncStorage.getItem(StorageKey.setting) ?? "";
	return JSON.parse(raw) as Setting;
};

export const setSetting = async (setting: Setting) => {
	return AsyncStorage.setItem(StorageKey.setting, JSON.stringify(setting));
};

export const getItem = async (date: string) => {
	const raw = await AsyncStorage.getItem(date);
	const result: CardData[] = raw ? JSON.parse(raw) : [];
	return result;
};

export const addItem = async (item: CardData) => {
	const previous = await getItem(now());
	return AsyncStorage.setItem(now(), JSON.stringify([...previous, item]));
};

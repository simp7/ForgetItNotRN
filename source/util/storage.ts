import AsyncStorage from "@react-native-async-storage/async-storage";

import { DEFAULT_SETTING } from "../constant";
import { CardData, Core } from "../model/cardData";
import { Setting } from "../model/setting";
import { now } from "./date";

enum StorageKey {
	lastOpened = 'LAST_OPENED',
	core = 'CORE',
	setting = 'SETTING',
}

export const loadLastOpenedDate = async () => {
	return AsyncStorage.getItem(StorageKey.lastOpened) ?? "";
};

export const saveLastOpenedDate = async () => {
	return AsyncStorage.setItem(StorageKey.lastOpened, now());
};

// TODO: implement this.
export const loadCore = async () => {
	return JSON.parse(await AsyncStorage.getItem(StorageKey.core) ?? "") as Core;
};

// TODO: implement this.
export const saveCore = async () => {

};

export const loadSetting = async () => {
	const raw = await AsyncStorage.getItem(StorageKey.setting) ?? "";
	const setting: Setting = !!raw ?  JSON.parse(raw) : DEFAULT_SETTING;
	return setting;
};

export const saveSetting = async (setting: Setting) => {
	return AsyncStorage.setItem(StorageKey.setting, JSON.stringify(setting));
};

export const loadItem = async (date: string) => {
	const raw = await AsyncStorage.getItem(date);
	const result: CardData[] = raw ? JSON.parse(raw) : [];
	return result;
};

export const saveItem = async (item: CardData) => {
	const previous = await loadItem(now());
	return AsyncStorage.setItem(now(), JSON.stringify([...previous, item]));
};

import { atom, DefaultValue, selector } from "recoil";

import { DEFAULT_SETTING } from "../constant";
import { loadSetting, saveSetting } from "../util/storage";

export interface Setting {
	targetRate: number;
	darkMode: boolean;
	notification: boolean;
}

enum key {
	object = 'Setting',
	targetRate = 'SettingTargetRate',
	darkMode = 'SettingDarkMode',
	notification = 'SettingNotification',
}

const rstSetting = atom<Setting>({
	key: key.object,
	default: DEFAULT_SETTING,
	effects: [({ setSelf, onSet }) => {
		loadSetting().then(value => {
			if (value !== null) {
				setSelf(value);
			}
		});
		onSet(saveSetting);
	}],
});

export const rstTargetRate = selector<number>({
	key: key.targetRate,
	get: ({ get }) => get(rstSetting).targetRate,
	set: ({ get, set }, newValue) => {
		const previous = get(rstSetting);
		set(rstSetting, { 
			...previous, 
			targetRate: newValue instanceof DefaultValue ? DEFAULT_SETTING.targetRate : newValue,
		});
	},
});

export const rstDarkMode = selector<boolean>({
	key: key.darkMode,
	get: ({ get }) => get(rstSetting).darkMode,
	set: ({ get, set }, newValue) => {
		const previous = get(rstSetting);
		set(rstSetting, { 
			...previous, 
			darkMode: newValue instanceof DefaultValue ? DEFAULT_SETTING.darkMode : newValue,
		});
	},
});

export const rstNotification = selector<boolean>({
	key: key.notification,
	get: ({ get }) => get(rstSetting).notification,
	set: ({ get, set }, newValue) => {
		const previous = get(rstSetting);
		set(rstSetting, { 
			...previous,
			notification: newValue instanceof DefaultValue ? DEFAULT_SETTING.notification : newValue,
		});
	},
});
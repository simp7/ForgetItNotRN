import { atom, DefaultValue, selector } from "recoil";

import { loadSetting, saveSetting } from "../util/storage";

export interface Setting {
	targetRate: number;
	darkMode: boolean;
	notification: boolean;
}

enum key {
	default = 'SettingDefault',
	object = 'Setting',
	targetRate = 'SettingTargetRate',
	darkMode = 'SettingDarkMode',
	notification = 'SettingNotification',
}

const rstDefaultSetting = selector<Setting>({
	key: key.default,
	get: loadSetting,
});

const rstSetting = atom<Setting>({
	key: key.object,
	default: rstDefaultSetting,
	effects: [({ onSet }) => onSet(saveSetting)],
});

export const rstTargetRate = selector<number>({
	key: key.targetRate,
	get: ({ get }) => get(rstSetting).targetRate,
	set: ({ get, set }, newValue) => {
		const previous = get(rstSetting);
		set(rstSetting, { 
			...previous, 
			targetRate: newValue instanceof DefaultValue ? get(rstDefaultSetting).targetRate : newValue,
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
			darkMode: newValue instanceof DefaultValue ? get(rstDefaultSetting).darkMode : newValue,
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
			notification: newValue instanceof DefaultValue ? get(rstDefaultSetting).notification : newValue,
		});
	},
});
import { atom, selector } from "recoil";

import { formatDate, now } from "../util/date";
import { loadStat, saveStat } from "../util/storage";

export interface Stat {
	currentStreak: number;
	maxStreak: number;
}

export const isStreakValid = async (lastOpened: string, completed: boolean) => {
	const yesterDay = now().subtract(1, 'day');
	return lastOpened === formatDate(yesterDay) && completed;
};

enum key {
	default = 'StatDefault',
	object = 'Stat',
	addStreak = 'StatAddStreak',
}

const rstDefaultStat = selector<Stat>({
	key: key.default,
	get: loadStat,
});

export const rstStat = atom<Stat>({
	key: key.object,
	default: rstDefaultStat,
	effects: [({ onSet }) => onSet(saveStat)],
});

export const rstAddStreak = selector<void>({
	key: key.addStreak,
	get: () => {},
	set: ({ get, set }) => {
		const previous = get(rstStat);
		set(rstStat, { 
			...previous, 
			currentStreak: previous.currentStreak + 1,
		});
	},
});
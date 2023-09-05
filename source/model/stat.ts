import { atom, selector } from "recoil";

import { DEFAULT_STAT } from "../constant";
import { formatDate, now } from "../util/date";
import { loadStatWhenOpened, saveStat } from "../util/storage";

export interface Stat {
	currentStreak: number;
	maxStreak: number;
}

export const isStreakValid = async (lastOpened: string, completed: boolean) => {
	const yesterDay = now().subtract(1, 'day');
	const result = lastOpened === formatDate(now()) || (lastOpened === formatDate(yesterDay) && completed);
	return result;
};

enum key {
	object = 'Stat',
	addStreak = 'StatAddStreak',
}

export const rstStat = atom<Stat>({
	key: key.object,
	default: DEFAULT_STAT,
	effects: [({ setSelf, onSet }) => {
		loadStatWhenOpened().then(value => {
			if (value !== null) {
				setSelf(value);
			}
		});
		onSet(saveStat);
	}],
});

export const addStreak = (previous: Stat) => {
	const currentStreak = previous.currentStreak + 1;
	const maxStreak = Math.max(previous.maxStreak, currentStreak);
	return { maxStreak, currentStreak };
};

export const rstAddStreak = selector<void>({
	key: key.addStreak,
	get: ({ get }) => {
		get(rstStat);
	},
	set: ({ get, set }) => {
		const previous = get(rstStat);
		const currentStreak = previous.currentStreak + 1;
		const maxStreak = Math.max(previous.maxStreak, currentStreak);
		set(rstStat, { 
			maxStreak,
			currentStreak,
		});
	},
});

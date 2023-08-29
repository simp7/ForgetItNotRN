import { atom, selector } from "recoil";

import { formatDate, now } from "../util/date";
import { loadStatWhenOpened, saveStat } from "../util/storage";

export interface Stat {
	currentStreak: number;
	maxStreak: number;
}

export const isStreakValid = async (lastOpened: string, completed: boolean) => {
	const yesterDay = now().subtract(1, 'day');
	return lastOpened === formatDate(now()) || (lastOpened === formatDate(yesterDay) && completed);
};

enum key {
	default = 'StatDefault',
	object = 'Stat',
	addStreak = 'StatAddStreak',
}

const rstDefaultStat = selector<Stat>({
	key: key.default,
	get: loadStatWhenOpened,
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
		const currentStreak = previous.currentStreak + 1;
		const maxStreak = Math.max(previous.maxStreak, currentStreak);
		set(rstStat, { 
			maxStreak,
			currentStreak,
		});
	},
});

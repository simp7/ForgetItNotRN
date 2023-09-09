import { atom, selector } from "recoil";

import { DEFAULT_STREAKS } from "../constant";
import { formatDate, now } from "../util/date";
import { loadStreaksWhenOpened, saveStreaks } from "../util/storage";

export interface Streaks {
	current: number;
	max: number;
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

export const rstStreaks = atom<Streaks>({
	key: key.object,
	default: DEFAULT_STREAKS,
	effects: [({ setSelf, onSet }) => {
		loadStreaksWhenOpened().then(value => {
			if (value !== null) {
				console.log(value);
				setSelf(value);
			}
		});
		onSet((newValue) => {
			saveStreaks(newValue);
			console.log(newValue);
		});
	}],
});

export const addStreak = (previous: Streaks) => {
	const currentStreak = previous.current + 1;
	const maxStreak = Math.max(previous.max, currentStreak);
	return { max: maxStreak, current: currentStreak };
};

export const rstAddStreak = selector<void>({
	key: key.addStreak,
	get: ({ get }) => {
		get(rstStreaks);
	},
	set: ({ get, set }) => {
		const previous = get(rstStreaks);
		const currentStreak = previous.current + 1;
		const maxStreak = Math.max(previous.max, currentStreak);
		set(rstStreaks, { 
			max: maxStreak,
			current: currentStreak,
		});
	},
});

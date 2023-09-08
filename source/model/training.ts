import { atom, DefaultValue, selector } from "recoil";

import { DEFAULT_TOTAL_RESULT, DEFAULT_TRAINING } from "../constant";
import { loadTmpTrainingToday, saveTmpTrainingToday } from "../util/storage";
import { CardData } from "./cardData";
import { TotalDailyResult } from "./period";

export interface Training {
	target: CardData[];
	index: number;
	result: TotalDailyResult;
}

export const initTraining = (data: CardData[][]): Training => {
	return {
		target: data.reduce((previous, current) => current.concat(previous)),
		index: 0,
		result: DEFAULT_TOTAL_RESULT,
	};
};

enum key {
	object = 'Traning',
	today = 'TrainingToday',
	index = 'TrainingIndex',
	result = 'TrainingResult',
	reset = 'TrainingReset'
}

export const rstTraining = atom<Training>({
	key: key.object,
	default: DEFAULT_TRAINING,
	effects: [({ setSelf, onSet }) => {
		loadTmpTrainingToday().then(value => {
			if (value !== null) {
				console.log(value);
				setSelf(value);
			}
		});
		onSet((newValue) => {
			saveTmpTrainingToday(newValue);
			console.log(newValue);
		});
	}],
});

export const rstTrainingToday = selector<CardData[]>({
	key: key.today,
	get: ({ get }) => get(rstTraining).target,
	set: ({ get, set }, newValue) => {
		const training = get(rstTraining);
		set(rstTraining, newValue instanceof DefaultValue ? training : {
			...training,
			today: newValue,
		});
	},
});

export const rstTrainingIndex = selector<number>({
	key: key.index,
	get: ({ get }) => get(rstTraining).index,
	set: ({ get, set }, newValue) => {
		const training = get(rstTraining);
		set(rstTraining, newValue instanceof DefaultValue ? training : {
			...training,
			index: newValue,
		});
	},
});

export const rstTrainingResult = selector<TotalDailyResult>({
	key: key.result,
	get: ({ get }) => get(rstTraining).result,
	set: ({ get, set }, newValue) => {
		const training = get(rstTraining);
		set(rstTraining, newValue instanceof DefaultValue ? training : {
			...training,
			result: newValue,
		});
	},
});

export const rstResetTraining = selector<void>({
	key: key.reset,
	get: () => {},
	set: ({ set }) => {
		set(rstTraining, (prev) => {
			return {
				target: [],
				index: 0,
				result: prev.result,
			};
		});
	},
});
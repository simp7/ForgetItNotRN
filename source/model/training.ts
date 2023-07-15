import { atom, DefaultValue, selector } from "recoil";

import { loadTrainingToday, saveTmpTrainingToday } from "../util/storage";
import { CardData } from "./cardData";

export interface Training {
	target: CardData[];
	index: number;
}

export const initTraining = (data: CardData[][]): Training => {
	return {
		target: data.reduce((previous, current) => current.concat(previous)),
		index: 0,
	};
};

enum key {
	default = 'TrainingDefault',
	object = 'Traning',
	today = 'TrainingToday',
	index = 'TrainingIndex',
}

const rstDefaultTraining = selector<Training>({
	key: key.default,
	get: loadTrainingToday,
});

const rstTraining = atom<Training>({
	key: key.object,
	default: rstDefaultTraining,
	effects: [({ onSet }) => onSet(saveTmpTrainingToday)],
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
	key: key.today,
	get: ({ get }) => get(rstTraining).index,
	set: ({ get, set }, newValue) => {
		const training = get(rstTraining);
		set(rstTraining, newValue instanceof DefaultValue ? training : {
			...training,
			index: newValue,
		});
	},
});

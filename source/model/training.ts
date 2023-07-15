import { atom, selector } from "recoil";

import { CardData } from "./cardData";

export interface Training {
	data: CardData[];
	index: number;
}

export interface TrainingResult {
	all: CardData[];
	success: CardData[];
}

export const initTraining = (data: CardData[][]) => {
	return {
		data: data.reduce((previous, current) => current.concat(previous)),
		index: 0,
	};
};

enum key {
	default = 'TrainingDefault',
	object = 'Traning',
}

const rstDefaultCore = selector<Training>({
	key: key.default,
	get: ({ get }) => {
		return initTraining([]);
	},
});

const rstCore = atom<Training>({
	key: key.object,
	default: rstDefaultCore,
});

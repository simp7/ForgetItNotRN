import { atom, DefaultValue, selector } from "recoil";

import { loadCore } from "../util/storage";

export enum InputType {
	Text = 'TEXT',
	Image = 'IMAGE',
}

export interface Data {
	data: string;
	type: InputType;
}

export interface CardData {
	question: Data;
	answer?: Data;
	repeat: number;
	lastReviewed: string;
}

export interface Core {
	period: number[];
	today: CardData[];
	index: number;
	wrong: CardData[];
}

enum key {
	default = 'CoreDefault',
	object = 'Core',
	period = 'CorePeriod',
	today = 'CoreToday',
	wrong = 'CoreWrong',
}

const rstDefaultCore = selector<Core>({
	key: key.default,
	get: loadCore,
});

const rstCore = atom<Core>({
	key: key.object,
	default: rstDefaultCore,
});

export const rstPeriod = selector<number[]>({
	key: key.period,
	get: ({ get }) => get(rstCore).period,
	set: ({ get, set }, newValue) => {
		const core = get(rstCore);
		set(rstCore, newValue instanceof DefaultValue ? core : {
			...core,
			period: newValue,
		});
	},
});

export const rstRemained = selector<CardData[]>({
	key: key.today,
	get: ({ get }) => get(rstCore).today,
	set: ({ get, set }, newValue) => {
		const core = get(rstCore);
		set(rstCore, newValue instanceof DefaultValue ? core : {
			...core,
			today: newValue,
		});
	},
});

export const rstWrong = selector<CardData[]>({
	key: key.wrong,
	get: ({ get }) => get(rstCore).wrong,
	set: ({ get, set }, newValue) => {
		const core = get(rstCore);
		set(rstCore, newValue instanceof DefaultValue ? core : {
			...core,
			wrong: newValue,
		});
	},
});
import { atom, DefaultValue, selector } from "recoil";

import { loadPeriod } from "../util/storage";

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

export type Period = number[];

enum key {
	default = 'CoreDefault',
	object = 'Core',
	period = 'CorePeriod',
	today = 'CoreToday',
	wrong = 'CoreWrong',
}

const rstDefaultCore = selector<Period>({
	key: key.default,
	get: loadPeriod,
});

export const rstPeriod = atom<Period>({
	key: key.object,
	default: rstDefaultCore,
});
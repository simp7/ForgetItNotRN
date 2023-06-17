import { atom, selector } from "recoil";

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
	lastReviewed: Date;
}

export interface Core {
	lastOpenedDate?: Date;
	period: number[];
	remained: Data[];
	wrong: Data[];
}

enum key {
	default = 'CoreDefault',
	object = 'Core',
}

const rstDefaultCore = selector<Core>({
	key: key.default,
	get: loadCore,
});

export const rstCore = atom<Core>({
	key: key.object,
	default: rstDefaultCore,
});
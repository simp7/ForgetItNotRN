import { atom } from "recoil";

export type addMode = 'QUESTION'|'ANSWER'

enum key {
	object = 'AddMode',
	swap = 'SwapMode',
}

export const rstAddMode = atom<addMode>({
	key: key.object,
	default: 'QUESTION',
});

export const swapAddMode = (mode: addMode) =>{
	return mode === 'ANSWER' ? 'QUESTION' : 'ANSWER';
};
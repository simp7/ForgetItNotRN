import { atom } from "recoil";

export type dataType = 'QUESTION' | 'ANSWER'

enum key {
	object = 'AddMode',
	swap = 'SwapMode',
}

export const rstAddMode = atom<dataType>({
	key: key.object,
	default: 'QUESTION',
});

export const swapAddMode = (mode: dataType) =>{
	return mode === 'ANSWER' ? 'QUESTION' : 'ANSWER';
};
import { atom } from "recoil";

import { DEFAULT_PERIODS, DEFAULT_TOTAL_RESULT } from "../constant";
import { loadPeriod, loadPreviousResult, savePeriod, savePreviousResult } from "../util/storage";

export type Result = boolean[];
export type TotalResult = Result[];
export type Periods = number[];

const totalSuccess = (resultArray: Result) => (
	resultArray.map((success): number => success ? 1 : 0).reduce((a, b) => a + b, 0)
);

export interface ResultByPeriod {
	all: number;
	success: number;
}

export const getCorrectRate= (target: Result) => {
	const all = target.length;
	if (all === 0) {
		return 0;
	}
	const success = totalSuccess(target);
	return all / success;
};

const reCalculatePeriod = (previousPeriod: number, targetRate: number, actualRate: number) => {
	const targetR = Math.log(targetRate);
	const actualR = Math.log(actualRate);
	return previousPeriod * targetR / actualR;
};

export const evaluatePeriod = (result: Result, previousPeriod: number, targetRate: number) => {
	if (result.length <= 20) {
		return previousPeriod;
	}

	const calculatedRate = getCorrectRate(result);
	if (calculatedRate === 1 && targetRate === 0.95) {
		return previousPeriod + 1;
	}

	return Math.abs(calculatedRate - targetRate) > 0.1 
		? reCalculatePeriod(previousPeriod, targetRate, calculatedRate)
		: previousPeriod;
};

export const changePeriod = (previous: Periods, index: number, calculated: number) => {
	const copied: Periods = JSON.parse(JSON.stringify(previous));
	copied[index] = calculated;
	return copied;
};

export const addResultByIndex = (previous: TotalResult, index: number, result: boolean) => {
	const copied: TotalResult = JSON.parse(JSON.stringify(previous));
	copied[index].push(result);
	return copied.slice(-50);
};

export const clearResultByIndex = (previous: TotalResult, index: number) => {
	const copied: TotalResult = JSON.parse(JSON.stringify(previous));
	copied[index] = [];
	return copied;
};

enum key {
	object = 'Periods',
	selected = 'PeriodsSelected',
	result = 'TotalResult',
	appendResult = 'TotalResultAppend'
}

export const rstPeriods = atom<Periods>({
	key: key.object,
	default: DEFAULT_PERIODS,
	effects: [({ setSelf, onSet }) => {
		loadPeriod().then(value => {
			if (value !== null) {
				console.log(key.object, value);
				setSelf(value);
			}
		});
		onSet((newValue) => {
			savePeriod(newValue);
			console.log(key.object, newValue);
		});
	}],
});

export const rstTotalResult = atom<TotalResult>({
	key: key.result,
	default: DEFAULT_TOTAL_RESULT,
	effects: [({ setSelf, onSet }) => {
		loadPreviousResult().then(value => {
			if (value !== null) {
				console.log(key.result, value);
				setSelf(value);
			}
		});
		onSet((newValue) => {
			savePreviousResult(newValue);
			console.log(key.result, newValue);
		});
	}],
});
import { atom, DefaultValue, selectorFamily } from "recoil";

import { DEFAULT_PERIODS, DEFAULT_TOTAL_RESULT } from "../constant";
import { loadPeriod, loadPreviousResult, savePeriod, savePreviousResult } from "../util/storage";
import { rstTargetRate } from "./setting";

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

const rstSelectedPeriod = selectorFamily<number, number>({
	key: key.selected,
	get: (index: number) => ({ get }) => {
		return get(rstPeriods)[index];
	},

	set: (index: number) => ({ get, set }, newValue) => {
		const periods = get(rstPeriods);
		const tmp: Periods = JSON.parse(JSON.stringify(periods));
		if (!(newValue instanceof DefaultValue)) {
			tmp[index] = newValue;
		}
		set(rstPeriods, tmp);
	},
});

const rstTotalResult = atom<TotalResult>({
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

export const rstResultByIndex = selectorFamily<Result, number>({
	key: key.result,
	get: (index) => ({ get }) => {
		return get(rstTotalResult)[index];
	},
	set: (index) => ({ get, set }, newValue) => {
		const result = get(rstTotalResult);
		const tmp: TotalResult = JSON.parse(JSON.stringify(result));
		if (!(newValue instanceof DefaultValue)) {
			tmp[index] = newValue.slice(-50);
		}

		const period = get(rstSelectedPeriod(index));
		const targetRate = get(rstTargetRate);
		const evaluated = evaluatePeriod(tmp[index], period, targetRate);
		if (evaluated !== period) {
			set(rstSelectedPeriod(index), evaluated);
			set(rstTotalResult, []);
			return;
		}

		set(rstTotalResult, tmp);
	},
});
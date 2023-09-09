import { atom } from "recoil";

import { DEFAULT_PERIODS } from "../constant";
import { loadPeriod, savePeriod } from "../util/storage";

export type Result = boolean[];
export type TotalResult = Result[];

const totalSuccess = (resultArray: Result) => (
	resultArray.map((success): number => success ? 1 : 0).reduce((a, b) => a + b, 0)
);

export interface ResultByPeriod {
	all: number;
	success: number;
}

export const getResultByPeriod = (previous: Result, today: Result): ResultByPeriod => {
	const total = previous.concat(today);
	const target = total.slice(0, 50);
	return {
		all: target.length,
		success: totalSuccess(target),
	};
};

const getRate = (unit: ResultByPeriod) => {
	if (unit.all === 0) {
		return 0;
	}
	return unit.all / unit.success;
};

const reCalculatePeriod = (previousPeriod: number, targetRate: number, actualRate: number) => {
	const targetR = Math.log(targetRate);
	const actualR = Math.log(actualRate);
	return previousPeriod * targetR / actualR;
};

const evaluatePeriod = (result: ResultByPeriod, previousPeriod: number, targetRate: number) => {
	if (result.all <= 20) {
		return previousPeriod;
	}
	const calculatedRate = getRate(result);
	if (calculatedRate === 1 && targetRate === 0.95) {
		return previousPeriod + 1;
	}
	return Math.abs(calculatedRate - targetRate) > 0.1 
		? reCalculatePeriod(previousPeriod, targetRate, calculatedRate)
		: previousPeriod;
};

export const evaluateAllPeriod = (
	previous: TotalResult, today: TotalResult, previousPeriod: number[], targetRate: number,
) => {
	const resultByPeriod = previous.map((data, index) => getResultByPeriod(data, today[index]));
	return resultByPeriod.map((resultData, index) => evaluatePeriod(resultData, previousPeriod[index], targetRate));
};

export type Periods = number[];

enum key {
	object = 'Period',
}

export const rstPeriod = atom<Periods>({
	key: key.object,
	default: DEFAULT_PERIODS,
	effects: [({ setSelf, onSet }) => {
		loadPeriod().then(value => {
			if (value !== null) {
				console.log(value);
				setSelf(value);
			}
		});
		onSet((newValue) => {
			savePeriod(newValue);
			console.log(newValue);
		});
	}],
});
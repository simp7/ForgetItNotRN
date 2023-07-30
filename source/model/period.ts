import { atom, selector } from "recoil";

import { loadPeriod } from "../util/storage";

export type DailyResult = boolean[];
export type TotalDailyResult = DailyResult[];

const totalSuccess = (resultArray: DailyResult) => (
	resultArray.map((success): number => success ? 1 : 0).reduce((a, b) => a + b, 0)
);

export interface ResultByPeriod {
	all: number;
	success: number;
}

export const getResultByPeriod = (previous: DailyResult, today: DailyResult): ResultByPeriod => {
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
	return Math.abs(calculatedRate - targetRate) > 0.1 
		? reCalculatePeriod(previousPeriod, targetRate, calculatedRate)
		: previousPeriod;
};

export const evaluateAllPeriod = (
	previous: TotalDailyResult, today: TotalDailyResult, previousPeriod: number[], targetRate: number,
) => {
	const resultByPeriod = previous.map((data, index) => getResultByPeriod(data, today[index]));
	return resultByPeriod.map((resultData, index) => evaluatePeriod(resultData, previousPeriod[index], targetRate));
};

export type Periods = number[];

enum key {
	default = 'PeriodDefault',
	object = 'Period',
}

const rstDefaultPeriods = selector<Periods>({
	key: key.default,
	get: loadPeriod,
});

export const rstPeriod = atom<Periods>({
	key: key.object,
	default: rstDefaultPeriods,
});
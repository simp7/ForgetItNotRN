export type TotalPeriodResult = PeriodResult[];

export interface PeriodResult {
	all: number;
	success: number;
}

const getRate = (unit: PeriodResult) => {
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

const evaluatePeriod = (result: PeriodResult, previousPeriod: number, targetRate: number) => {
	if (result.all <= 20) {
		return previousPeriod;
	}
	const calculatedRate = getRate(result);
	return Math.abs(calculatedRate - targetRate) > 0.1 
		? reCalculatePeriod(previousPeriod, targetRate, calculatedRate)
		: previousPeriod;
};

export const evaluateAllPeriod = (result: TotalPeriodResult, previousPeriod: number[], targetRate: number) => {
	return result.map((resultData, index) => evaluatePeriod(resultData, previousPeriod[index], targetRate));
};
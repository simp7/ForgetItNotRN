import dayjs from 'dayjs';

export const formatDate = (date: dayjs.Dayjs) => {
	return date.format('YYYY-MM-DD');
};

export const now = () => {
	const date = dayjs();
	return date;
};

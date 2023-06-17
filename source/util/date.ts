export const now = () => {
	const date = new Date(Date.now());
	return date.toDateString();
};
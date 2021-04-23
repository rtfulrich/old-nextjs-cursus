export const formatDate = (dateToFormat) => {
	const dateInstance = new Date(dateToFormat);
	const date = dateInstance.toUTCString();
	const year = dateInstance.getFullYear();
	const withDay = `${date.split(year)[0]} ${year}`;
	return withDay.split(",")[1];
}
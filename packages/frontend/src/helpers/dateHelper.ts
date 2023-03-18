export const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"July",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const dateHelperFormat = (date: Date): string => {
	const day =
		date.getDate().toLocaleString().length > 1
			? date.getDate().toLocaleString()
			: `0${date.getDate()}`;

	const month = date.getMonth() + 1;
	const returnValue = `${day}-${
		month.toString().length > 1 ? month : "0" + month
	}-${date.getFullYear()}`;

	return returnValue;
};

export const dateHelperFormatProper = (date: Date): string => {
	const day =
		date.getDate().toString().length > 1
			? date.getDate().toString()
			: `0${date.getDate()}`;

	const month = monthNames[date.getMonth()];

	return `${day}-${month}-${date.getFullYear()}, ${dayNames[date.getDay()]}`;
};

export const dateFormatNative = (dateToFormat: Date, timezone: string): string => {
	return dateToFormat.toLocaleString("en-us", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: timezone,
		timeZoneName: "short",
		hour12: false,
	});
};

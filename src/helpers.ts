export function getPricePerPeriodString(
	isMonthly: boolean,
	monthlyPrice: number,
	yearlyPrice: number
) {
	return `+$${isMonthly ? monthlyPrice : yearlyPrice}/${
		isMonthly ? 'mo' : 'yr'
	}`
}

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

export const breakCamelCase = (s: string) =>
	s.replace(/[A-Z]/, x => ' ' + x.toLowerCase())
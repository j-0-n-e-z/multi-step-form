export function getPriceString(
	isMonthly: boolean,
	monthlyPrice: number,
	yearlyPrice: number
) {
	return `+$${isMonthly ? monthlyPrice : yearlyPrice}/${
		isMonthly ? 'mo' : 'yr'
	}`
}

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

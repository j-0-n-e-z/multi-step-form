export function getMoneyPerPeriodString(isMonthly: boolean, monthlyPrice: number, yearlyPrice: number) {
	return `+$${isMonthly ? monthlyPrice : yearlyPrice}/${
		isMonthly ? 'mo' : 'yr'
	}`
}

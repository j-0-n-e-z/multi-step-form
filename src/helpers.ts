import { AddOn, AddOns, Plan, PlanDuration } from './components/Panel'
import { addOnsData } from './data/addOnsData'
import { plansData } from './data/plansData'

export function getPricePerPeriodString(
	planDuration: PlanDuration,
	price: number
) {
	return `+$${price}/${planDuration === 'monthly' ? 'mo' : 'yr'}`
}

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

export const breakCamelCase = (s: string) =>
	s.replace(/[A-Z]/, x => ' ' + x.toLowerCase())

export const getTotalPrice = (
	planDuration: PlanDuration,
	selectedPlan: Plan,
	pickedAddOns: AddOns
) =>
	plansData[selectedPlan][planDuration] +
	(Object.entries(pickedAddOns) as Array<[AddOn, boolean]>).reduce(
		(sum, [addOn, isAddOnPicked]) =>
			sum + +(isAddOnPicked && addOnsData[addOn][planDuration]),
		0
	)

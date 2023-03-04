import { addOnsData } from '../data/addOnsData'
import { plansData } from '../data/plansData'
import { AddOn, AddOns, Plan, PlanDuration } from '../types'

export function calculateTotalPrice(
	selectedPlan: Plan,
	pickedAddOns: AddOns,
	planDuration: PlanDuration
): number {
	const planPrice = plansData[selectedPlan][planDuration]
	const addOnsPrice = (Object.keys(pickedAddOns) as AddOn[]).reduce(
		(sum, addOn) =>
			sum + (pickedAddOns[addOn] ? addOnsData[addOn][planDuration] : 0),
		0
	)

	return planPrice + addOnsPrice
}
import { addOnsData } from '../data/addOnsData'
import { plansData } from '../data/plansData'
import {
	SelectedAddOn,
	PickedAddOns,
	SelectedPlan,
	PlanDuration
} from '../types'

export function calculateTotalPrice(
	selectedPlan: SelectedPlan,
	pickedAddOns: PickedAddOns,
	planDuration: PlanDuration
): number {
	const planPrice = plansData[selectedPlan][planDuration]
	const addOnsPrice = (
		Object.keys(pickedAddOns) as Array<SelectedAddOn>
	).reduce(
		(sum, addOn) =>
			pickedAddOns[addOn] ? sum + addOnsData[addOn][planDuration] : sum,
		0
	)

	return planPrice + addOnsPrice
}

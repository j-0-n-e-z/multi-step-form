import { PlanDuration } from "../components/Panel";

export function formatPrice(
	price: number,
	planDuration: PlanDuration = 'monthly',
) {
	return `+$${price}/${planDuration === 'monthly' ? 'mo' : 'yr'}`
}

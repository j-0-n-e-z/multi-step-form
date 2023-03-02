import { PlanDuration } from "../types";

export function formatPrice(
	price: number,
	planDuration: PlanDuration,
) {
	return `+$${price}/${planDuration === 'monthly' ? 'mo' : 'yr'}`
}

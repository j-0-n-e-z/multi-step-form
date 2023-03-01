import { Plan } from "../components/Panel";

type PlansData = {
	[key in Plan]: { monthly: number; yearly: number }
}

export const plansData: PlansData = {
	arcade: {
		monthly: 9,
		yearly: 90
	},
	advanced: {
		monthly: 12,
		yearly: 120
	},
	pro: {
		monthly: 15,
		yearly: 150
	}
}

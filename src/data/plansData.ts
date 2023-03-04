import { Plan, PlanInfo } from '../types'

export const plansData: Record<Plan, PlanInfo> = {
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

import { AddOn, AddOnInfo } from "../types"

export const addOnsData: Record<AddOn, AddOnInfo> = {
	onlineService: {
		monthly: 1,
		yearly: 10,
		description: 'Access to multiplayer games'
	},
	largerStorage: {
		monthly: 2,
		yearly: 20,
		description: 'Extra 1TB of cloud save'
	},
	customizableProfile: {
		monthly: 2,
		yearly: 20,
		description: 'Custom theme on your profile'
	}
}

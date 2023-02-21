import { IPlan } from "./components/Panel";

export const plans: IPlan[] = [
	{
		title: 'Arcade',
		icon: './images/plans/icon-arcade.svg',
		price: { monthly: 9, yearly: 90 }
	},
	{
		title: 'Advanced',
		icon: './images/plans/icon-advanced.svg',
		price: { monthly: 12, yearly: 120 }
	},
	{
		title: 'Pro',
		icon: './images/plans/icon-pro.svg',
		price: { monthly: 15, yearly: 150 }
	}
]
export type Plan = 'arcade' | 'advanced' | 'pro'

export type AddOn = 'onlineService' | 'largerStorage' | 'customizableProfile'

export type AddOns = Record<AddOn, boolean>

export type PlanDuration = 'monthly' | 'yearly'

export type ItemInfo = {
	monthly: number
	yearly: number
	description: string
}

export interface FormItems {
	name: string
	email: string
	phone: string
	selectedPlan: Plan
	planDuration: PlanDuration
	pickedAddOns: AddOns
}

export type FormUpdater = {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export type DefaultProps = FormItems & FormUpdater

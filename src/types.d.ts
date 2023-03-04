export type Plan = 'arcade' | 'advanced' | 'pro'

export type AddOn = 'onlineService' | 'largerStorage' | 'customizableProfile'

export type AddOns = Record<AddOn, boolean>

export type PlanDuration = 'monthly' | 'yearly'

export type PlanInfo = {
	monthly: number
	yearly: number
}

export type AddOnInfo = PlanInfo & {
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

export type DefaultProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

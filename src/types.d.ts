import { addOnsData } from './data/addOnsData'
import { plansData } from './data/plansData'

export type SelectedPlan = keyof typeof plansData

export type SelectedAddOn = keyof typeof addOnsData

export type PickedAddOns = Record<SelectedAddOn, boolean>

const { arcade, advanced, pro } = plansData

export type PlanDuration = keyof typeof arcade &
	keyof typeof advanced &
	keyof typeof pro

export interface FormItems {
	name: string
	email: string
	phone: string
	selectedPlan: SelectedPlan
	planDuration: PlanDuration
	pickedAddOns: PickedAddOns
}

export type DefaultProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

import { FC, useState } from 'react'
import { useMultiStep } from '../hooks/useMultiStep'
import styles from './Panel.module.scss'
import form from './Form.module.scss'
import { PersonalInfo } from './PersonalInfo'
import { SelectPlan } from './SelectPlan'
import { Sidebar } from './Sidebar'
import { AddOns } from './AddOns'
import { Summary } from './Summary'
import { ThankYou } from './ThankYou'

export type Plan = 'arcade' | 'advanced' | 'pro'

type AddOns = {
	[key: string]: boolean
	onlineService: boolean
	largerStorage: boolean
	customizableProfile: boolean
}

export interface FormItems {
	name: string
	email: string
	phone: string
	selectedPlan: Plan
	isMonthly: boolean
	selectedAddOns: AddOns
}

const initialValues: FormItems = {
	name: 'Stephen King',
	email: 'stephenking@gmail.com',
	phone: '+1 890 243 123',
	selectedPlan: 'arcade',
	isMonthly: true,
	selectedAddOns: {
		onlineService: false,
		largerStorage: false,
		customizableProfile: false
	}
}

const steps = ['Your Info', 'Select Plan', 'Add-Ons', 'Summary']

export const Panel: FC = () => {
	const [formData, setFormData] = useState<FormItems>(initialValues)

	const updateFormData = (fieldsToUpdate: Partial<FormItems>) => {
		setFormData(prev => ({ ...prev, ...fieldsToUpdate }))
	}

	const { currentStepIndex, goNext, goBack, isFirstStep, isLastStep } =
		useMultiStep(steps.length)

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		goNext()
	}

	return (
		<div className={styles.panel}>
			<Sidebar steps={steps} currentStepIndex={currentStepIndex} />
			<form onSubmit={handleFormSubmit} className={form.form}>
				{currentStepIndex === 0 && (
					<PersonalInfo {...formData} updateFormData={updateFormData} />
				)}
				{currentStepIndex === 1 && (
					<SelectPlan {...formData} updateFormData={updateFormData} />
				)}
				{currentStepIndex === 2 && (
					<AddOns {...formData} updateFormData={updateFormData} />
				)}
				<div className={form.navigation}>
					{!isFirstStep && (
						<button type='button' className={form.goBack} onClick={goBack}>
							Go Back
						</button>
					)}
					<button type='submit' className={form.goNext}>
						{isLastStep ? 'Confirm' : 'Next Step'}
					</button>
				</div>
			</form>
		</div>
	)
}

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

export const plans = {
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

export const addOns = {
	onlineServices: {
		monthly: 1,
		yearly: 10
	},
	largerStorage: {
		monthly: 2,
		yearly: 20
	},
	customizableProfile: {
		monthly: 2,
		yearly: 20
	}
}

export interface FormItems {
	name: string
	email: string
	phone: string
	plan: Plan
	isMonthly: boolean
	isOnlineService: boolean
	isLargerStorage: boolean
	isCustomizableProfile: boolean
}

const initialValues: FormItems = {
	name: 'Stephen King',
	email: 'stephenking@gmail.com',
	phone: '+1 890 243 123',
	plan: 'arcade',
	isMonthly: true,
	isOnlineService: false,
	isLargerStorage: false,
	isCustomizableProfile: false
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

export interface IPersonalInfo {
	name: string
	email: string
	phone: string
}

export interface ISelectedPlan {
	title: string
	price: number
	isMonthly: boolean
}

export interface IPlan {
	title: string
	icon: string
	price: { monthly: number; yearly: number }
}

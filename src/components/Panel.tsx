import { FC, useState } from 'react'
import { useMultiStep } from '../hooks/useMultiStep'
import styles from './Panel.module.scss'
import form from './Form.module.scss'
import cn from 'classnames'
import { PersonalInfo } from './personalInfo/PersonalInfo'
import { SelectPlan } from './selectPlan/SelectPlan'
import { Sidebar } from './sidebar/Sidebar'
import { PickAddOns } from './pickAddOns/PickAddOns'
import { FinishingUp } from './finishingUp/FinishingUp'
import { ThankYou } from './thankYou/ThankYou'

export type Plan = 'arcade' | 'advanced' | 'pro'

export type AddOn = 'onlineService' | 'largerStorage' | 'customizableProfile'

export type AddOns = {
	[key in AddOn]: boolean
}

export type PlanDuration = 'monthly' | 'yearly'

export interface FormItems {
	name: string
	email: string
	phone: string
	selectedPlan: Plan
	planDuration: PlanDuration
	pickedAddOns: AddOns
}

const initialValues: FormItems = {
	name: 'Stephen King',
	email: 'stephenking@gmail.com',
	phone: '+1 890 243 123',
	selectedPlan: 'arcade',
	planDuration: 'monthly',
	pickedAddOns: {
		onlineService: false,
		largerStorage: false,
		customizableProfile: false
	}
}

const steps = ['your info', 'select plan', 'add-ons', 'summary']

export const Panel: FC = () => {
	const [formData, setFormData] = useState<FormItems>(initialValues)

	const updateFormData = (fieldsToUpdate: Partial<FormItems>) => {
		setFormData(prev => ({ ...prev, ...fieldsToUpdate }))
	}

	const {
		currentStepIndex,
		goNext,
		goBack,
		isFirstStep,
		isLastStep,
		isThankYou
	} = useMultiStep(steps.length + 1)

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
					<PickAddOns {...formData} updateFormData={updateFormData} />
				)}
				{currentStepIndex === 3 && (
					<FinishingUp {...formData} updateFormData={updateFormData} />
				)}
				{currentStepIndex === 4 && <ThankYou />}
				{!isThankYou && (
					<div className={form.navigation}>
						{!isFirstStep && (
							<button type='button' className={form.goBack} onClick={goBack}>
								Go Back
							</button>
						)}
						<button
							type='submit'
							className={cn(form.goNext, { [form.confirm]: isLastStep })}
						>
							{isLastStep ? 'Confirm' : 'Next Step'}
						</button>
					</div>
				)}
			</form>
		</div>
	)
}

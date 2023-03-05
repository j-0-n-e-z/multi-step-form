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
import { FormItems } from '../types'

const initialValues: FormItems = {
	name: '',
	email: '',
	phone: '',
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
	const [isSubmitTried, setIsSubmitTried] = useState(false)

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
					<PersonalInfo
						{...formData}
						updateFormData={updateFormData}
						isSubmitTried={isSubmitTried}
					/>
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
							onClick={() => setIsSubmitTried(true)}
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

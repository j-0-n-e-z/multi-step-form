import { FC, useState } from 'react'
import { plans } from '../plans'
import { AddOns } from './AddOns'
import styles from './Panel.module.scss'
import { PersonalInfo } from './PersonalInfo'
import { SelectPlan } from './SelectPlan'
import { Sidebar } from './Sidebar'
import { Summary } from './Summary'
import { ThankYou } from './ThankYou'

export const Panel: FC = () => {
	const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
		name: '',
		email: '',
		phone: ''
	})
	const [selectedPlan, setSelectedPlan] = useState<ISelectedPlan>({
		title: plans[0].title,
		price: plans[0].price.monthly,
		isMonthly: true
	})
	const [isMonthly, setIsMonthly] = useState(true)
	const [selectedAddOns, setSelectedAddOns] = useState<{
		[key: string]: boolean
	}>({
		Online_service: false,
		Larger_storage: false,
		Customizable_profile: false
	})
	const [step, setStep] = useState(1)

	const switchStepForm = (step: number) => {
		switch (step) {
			case 1:
				return (
					<PersonalInfo
						personalInfo={personalInfo}
						setPersonalInfo={setPersonalInfo}
						setStep={setStep}
					/>
				)
			case 2:
				return (
					<SelectPlan
						plans={plans}
						selectedPlan={selectedPlan}
						setSelectedPlan={setSelectedPlan}
						setStep={setStep}
						isMonthly={isMonthly}
						setIsMonthly={setIsMonthly}
					/>
				)
			case 3:
				return (
					<AddOns
						setStep={setStep}
						isMonthly={isMonthly}
						setSelectedAddOns={setSelectedAddOns}
						selectedAddOns={selectedAddOns}
					/>
				)
			case 4:
				return (
					<Summary
						setStep={setStep}
						isMonthly={isMonthly}
						setIsMonthly={setIsMonthly}
						selectedPlan={selectedPlan}
						selectedAddOns={selectedAddOns}
						setSelectedPlan={setSelectedPlan}
					/>
				)
			case 5:
				return <ThankYou />
		}
	}

	return (
		<div className={styles.panel}>
			<Sidebar step={step} />
			{switchStepForm(step)}
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

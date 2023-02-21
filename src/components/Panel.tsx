import { FC, useState } from 'react'
import { Sidebar } from './Sidebar'
import styles from './Panel.module.scss'
import { PersonalInfo } from './PersonalInfo'
import { SelectPlan } from './SelectPlan'

export const Panel: FC = () => {
	const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
		name: 's',
		email: 's@ss.ss',
		phone: '1234567809'
	})
	const plans: (IPlan & { icon: string })[] = [
		{
			title: 'Arcade',
			icon: './images/plans/icon-arcade.svg',
			price: { monthly: '$9/mo', yearly: '$90/yr' }
		},
		{
			title: 'Advanced',
			icon: './images/plans/icon-advanced.svg',
			price: { monthly: '$12/mo', yearly: '$120/yr' }
		},
		{
			title: 'Pro',
			icon: './images/plans/icon-pro.svg',
			price: { monthly: '$15/mo', yearly: '$150/yr' }
		}
	]
	const [selectedPlan, setSelectedPlan] = useState<ISelectedPlan>({
		title: plans[0].title,
		price: plans[0].price.monthly
	})
	const [step, setStep] = useState<number>(1)

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
					/>
				)
			case 3:
				return <div>Add-ons</div>
			case 4:
				return <div>Summary</div>
		}
	}

	return (
		<div className={styles.panel}>
			<Sidebar step={step} />
			<div className={styles.stepForm}>{switchStepForm(step)}</div>
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
	price: string
}

export interface IPlan {
	title: string
	price: { monthly: string; yearly: string }
}

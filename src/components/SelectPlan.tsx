import { Field, Form, Formik } from 'formik'
import { FC, FormEvent, useState } from 'react'
import { IPlan, ISelectedPlan } from './Panel'
import styles from './SelectPlan.module.scss'
import cn from 'classnames'
import { Plan } from './Plan'

export const SelectPlan: FC<SelectPlanPropsType> = ({
	plans,
	selectedPlan,
	setSelectedPlan,
	setStep
}) => {
	const [isMonthly, setIsMonthly] = useState(true)
	const handleFormSubmitted = (e: React.FormEvent) => {
		e.preventDefault()
		setStep(prevStep => prevStep + 1)
		console.log(selectedPlan);
	}

	return (
		<form onSubmit={handleFormSubmitted} className={styles.form}>
			<div className={styles.title}>Select your plan</div>
			<p className={styles.description}>
				You have the option of monthly or yearly billing.
			</p>
			<div className={styles.subscriptions}>
				<div className={styles.plans}>
					{plans.map(plan => (
						<Plan
							key={plan.title}
							plan={plan}
							isSelected={plan.title === selectedPlan.title}
							setSelectedPlan={setSelectedPlan}
							isMonthly={isMonthly}
						/>
					))}
				</div>
				<div className={styles.selectSubscription}>
					<div
						className={cn(styles.subscription, {
							[styles.selected]: isMonthly
						})}
						onClick={() => setIsMonthly(true)}
					>
						Monthly
					</div>
					<div
						className={cn(styles.switcher, { [styles.right]: !isMonthly })}
						onClick={() => setIsMonthly(prev => !prev)}
					>
						<div className={styles.circle}></div>
					</div>
					<div
						className={cn(styles.subscription, {
							[styles.selected]: !isMonthly
						})}
						onClick={() => setIsMonthly(false)}
					>
						Yearly
					</div>
				</div>
			</div>
			<div className={styles.navigation}>
				<button
					className={styles.goBack}
					type='button'
					onClick={() => setStep(prevStep => prevStep - 1)}
				>
					Go Back
				</button>
				<button className={styles.submit} type='submit'>
					Next Step
				</button>
			</div>
		</form>
	)
}

type SelectPlanPropsType = {
	plans: (IPlan & { icon: string })[]
	selectedPlan: ISelectedPlan
	setSelectedPlan: React.Dispatch<React.SetStateAction<ISelectedPlan>>
	setStep: React.Dispatch<React.SetStateAction<number>>
}

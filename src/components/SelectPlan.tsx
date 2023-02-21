import { Field, Form, Formik } from 'formik'
import { FC, FormEvent, useState } from 'react'
import { IPlan, ISelectedPlan } from './Panel'
import styles from './SelectPlan.module.scss'
import cn from 'classnames'
import { Plan } from './Plan'
import form from './Form.module.scss'

export const SelectPlan: FC<SelectPlanPropsType> = ({
	plans,
	selectedPlan,
	setSelectedPlan,
	setStep,
	isMonthly,
	setIsMonthly
}) => {
	const handleFormSubmitted = (e: React.FormEvent) => {
		e.preventDefault()
		setSelectedPlan(prev => ({
			...prev,
			isMonthly,
			price: plans.find(x => x.title === prev.title)!.price[
				isMonthly ? 'monthly' : 'yearly'
			]
		}))
		setStep(prevStep => prevStep + 1)
	}

	return (
		<form onSubmit={handleFormSubmitted} className={form.form}>
			<div className={form.title}>Select your plan</div>
			<p className={form.description}>
				You have the option of monthly or yearly billing.
			</p>
			<div className={styles.plansWrapper}>
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
				<div className={styles.subscriptions}>
					<div
						className={cn(styles.subscription, {
							[styles.selected]: isMonthly
						})}
						onClick={() => setIsMonthly(true)}
					>
						Monthly
					</div>
					<button
						type='button'
						className={cn(styles.switcher, { [styles.yearly]: !isMonthly })}
						onClick={() => setIsMonthly(prev => !prev)}
					>
						<div className={styles.circle}></div>
					</button>
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
			<div className={form.navigation}>
				<button
					className={form.goBack}
					type='button'
					onClick={() => setStep(prevStep => prevStep - 1)}
				>
					Go Back
				</button>
				<button className={form.submit} type='submit'>
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
	isMonthly: boolean
	setIsMonthly: React.Dispatch<React.SetStateAction<boolean>>
}

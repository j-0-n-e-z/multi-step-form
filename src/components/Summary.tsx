import { FC } from 'react'
import styles from './Summary.module.scss'
import form from './Form.module.scss'
import cn from 'classnames'
import { AddOn } from './AddOn'
import { addOns } from '../addOns'
import { ISelectedPlan } from './Panel'
import { getMoneyPerPeriodString } from '../helpers'
import { plans } from '../plans'

export const Summary: FC<AddOnsPropsType> = ({
	isMonthly,
	setIsMonthly,
	selectedPlan,
	selectedAddOns,
	setStep,
	setSelectedPlan
}) => {
	const handleFormSubmitted = (e: React.FormEvent) => {
		setStep(prev => prev + 1)
		e.preventDefault()
	}

	const handlePlanChanged = () => {
		setSelectedPlan(prev => ({
			...prev,
			isMonthly: !isMonthly,
			price: plans.find(x => x.title === prev.title)!.price[
				!isMonthly ? 'monthly' : 'yearly'
			]
		}))
		setIsMonthly(prev => !prev)
	}

	const totalPrice =
		selectedPlan.price +
		Object.keys(selectedAddOns)
			.filter(x => selectedAddOns[x])
			.reduce(
				(sum, x) =>
					sum +
					addOns.find(addOn => addOn.title === x)!.price[
						isMonthly ? 'monthly' : 'yearly'
					],
				0
			)

	return (
		<form onSubmit={handleFormSubmitted} className={form.form}>
			<div className={form.title}>Finishing Up</div>
			<p className={form.description}>
				Double-check everything looks OK before confirming.
			</p>
			<div className={styles.summary}>
				<div className={styles.selectedPlan}>
					<div className={styles.planTitle}>
						{selectedPlan.title} ({isMonthly ? 'Monthly' : 'Yearly'})
						<button
							type='button'
							className={styles.changePlan}
							onClick={() => handlePlanChanged()}
						>
							Change
						</button>
					</div>
					<div className={styles.planPrice}>
						{getMoneyPerPeriodString(
							isMonthly,
							selectedPlan.price,
							selectedPlan.price
						)}
					</div>
				</div>
				<div className={styles.selectedAddOns}>
					{Object.keys(selectedAddOns)
						.filter(x => selectedAddOns[x])
						.map(addOn => (
							<div key={addOn} className={styles.addOn}>
								<div className={styles.addOnTitle}>
									{addOn.replace('_', ' ')}
								</div>
								<div className={styles.addOnPrice}>
									{getMoneyPerPeriodString(
										isMonthly,
										addOns.find(x => x.title === addOn)?.price.monthly!,
										addOns.find(x => x.title === addOn)?.price.yearly!
									)}
								</div>
							</div>
						))}
				</div>
				<div className={styles.total}>
					<div className={styles.totalTitle}>
						Total (per {isMonthly ? 'month' : 'year'})
					</div>
					<div className={styles.totalPrice}>
						{getMoneyPerPeriodString(isMonthly, totalPrice, totalPrice)}
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
				<button className={cn(form.submit, styles.confirm)} type='submit'>
					Confirm
				</button>
			</div>
		</form>
	)
}

export type AddOnsPropsType = {
	setStep: React.Dispatch<React.SetStateAction<number>>
	isMonthly: boolean
	selectedAddOns: { [key: string]: boolean }
	selectedPlan: ISelectedPlan
	setIsMonthly: React.Dispatch<React.SetStateAction<boolean>>
	setSelectedPlan: React.Dispatch<React.SetStateAction<ISelectedPlan>>
}

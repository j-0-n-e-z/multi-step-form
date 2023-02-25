import { FC } from 'react'
import styles from './Summary.module.scss'
import form from './Form.module.scss'
import { addOnsData } from '../data/addOnsData'
import { FormItems } from './Panel'
import { breakCamelCase, capitalize, getPricePerPeriodString } from '../helpers'
import { plansData } from '../data/plansData'

export type AddOnsProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const Summary: FC<AddOnsProps> = ({
	isMonthly,
	updateFormData,
	selectedPlan,
	selectedAddOns
}) => {
	const handlePlanChanged = () => {
		updateFormData({ isMonthly: !isMonthly })
	}

	const totalPrice =
		plansData[selectedPlan][isMonthly ? 'monthly' : 'yearly'] +
		Object.keys(selectedAddOns).reduce(
			(sum, addOn) =>
				sum +
				(selectedAddOns[addOn]
					? addOnsData[addOn][isMonthly ? 'monthly' : 'yearly']
					: 0),
			0
		)

	return (
		<>
			<div className={form.title}>Finishing Up</div>
			<p className={form.description}>
				Double-check everything looks OK before confirming.
			</p>
			<div className={styles.summary}>
				<div className={styles.selectedPlan}>
					<div className={styles.planTitle}>
						{capitalize(selectedPlan)} ({isMonthly ? 'Monthly' : 'Yearly'})
						<button
							type='button'
							className={styles.changePlan}
							onClick={() => handlePlanChanged()}
						>
							Change
						</button>
					</div>
					<div className={styles.planPrice}>
						{getPricePerPeriodString(
							isMonthly,
							plansData[selectedPlan].monthly,
							plansData[selectedPlan].yearly
						)}
					</div>
				</div>
				{Object.values(selectedAddOns).some(Boolean) && (
					<div className={styles.selectedAddOns}>
						{Object.keys(selectedAddOns)
							.filter(addOn => selectedAddOns[addOn])
							.map(addOn => (
								<div key={addOn} className={styles.addOn}>
									<div className={styles.addOnTitle}>
										{capitalize(breakCamelCase(addOn))}
									</div>
									<div className={styles.addOnPrice}>
										{getPricePerPeriodString(
											isMonthly,
											addOnsData[addOn].monthly,
											addOnsData[addOn].yearly
										)}
									</div>
								</div>
							))}
					</div>
				)}
			</div>
			<div className={styles.total}>
				<div className={styles.totalTitle}>
					Total (per {isMonthly ? 'month' : 'year'})
				</div>
				<div className={styles.totalPrice}>
					{getPricePerPeriodString(isMonthly, totalPrice, totalPrice)}
				</div>
			</div>
		</>
	)
}

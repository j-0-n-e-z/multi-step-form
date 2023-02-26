import { FC } from 'react'
import styles from './FinishingUp.module.scss'
import form from '../Form.module.scss'
import { addOnsData } from '../../data/addOnsData'
import { AddOn as TAddOn, FormItems } from '../Panel'
import {
	breakCamelCase,
	capitalize,
	getPricePerPeriodString,
	getTotalPrice
} from '../../helpers'
import { plansData } from '../../data/plansData'

export type AddOnsProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const FinishingUp: FC<AddOnsProps> = ({
	planDuration,
	updateFormData,
	selectedPlan,
	pickedAddOns
}) => {
	const handlePlanChange = () => {
		updateFormData({
			planDuration: planDuration === 'monthly' ? 'yearly' : 'monthly'
		})
	}

	const totalPrice = getTotalPrice(planDuration, selectedPlan, pickedAddOns)

	return (
		<>
			<div className={form.title}>Finishing Up</div>
			<p className={form.description}>
				Double-check everything looks OK before confirming.
			</p>
			<div className={styles.summary}>
				<div className={styles.selectedPlan}>
					<div className={styles.planTitle}>
						{capitalize(selectedPlan)} ({capitalize(planDuration)})
						<button
							type='button'
							className={styles.changePlan}
							onClick={() => handlePlanChange()}
						>
							Change
						</button>
					</div>
					<div className={styles.planPrice}>
						{getPricePerPeriodString(
							planDuration,
							plansData[selectedPlan][planDuration]
						)}
					</div>
				</div>
				{Object.values(pickedAddOns).some(Boolean) && (
					<div className={styles.selectedAddOns}>
						{(Object.keys(pickedAddOns) as Array<TAddOn>)
							.filter(addOn => pickedAddOns[addOn])
							.map(addOn => (
								<div key={addOn} className={styles.addOn}>
									<div className={styles.addOnTitle}>
										{capitalize(breakCamelCase(addOn))}
									</div>
									<div className={styles.addOnPrice}>
										{getPricePerPeriodString(
											planDuration,
											addOnsData[addOn][planDuration]
										)}
									</div>
								</div>
							))}
					</div>
				)}
			</div>
			<div className={styles.total}>
				<div className={styles.totalTitle}>
					Total (per {planDuration.slice(0, -2)})
				</div>
				<div className={styles.totalPrice}>
					{getPricePerPeriodString(planDuration, totalPrice)}
				</div>
			</div>
		</>
	)
}

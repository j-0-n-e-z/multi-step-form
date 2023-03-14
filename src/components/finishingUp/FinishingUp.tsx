import { FC } from 'react'
import styles from './FinishingUp.module.scss'
import form from '../Form.module.scss'
import { addOnsData } from '../../data/addOnsData'
import { plansData } from '../../data/plansData'
import { calculateTotalPrice } from '../../utils/calculateTotalPrice'
import { capitalize } from '../../utils/capitalize'
import { formatPrice } from '../../utils/formatPrice'
import { breakCamelCase } from '../../utils/breakCamelCase'
import { SelectedAddOn, DefaultProps } from '../../types'

export const FinishingUp: FC<DefaultProps> = ({
	selectedPlan,
	planDuration,
	pickedAddOns,
	updateFormData
}) => {
	const handlePlanChange = () => {
		updateFormData({
			planDuration: planDuration === 'monthly' ? 'yearly' : 'monthly'
		})
	}

	const totalPrice = calculateTotalPrice(
		selectedPlan,
		pickedAddOns,
		planDuration
	)

	return (
		<div className={form.formContent}>
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
						{formatPrice(plansData[selectedPlan][planDuration], planDuration)}
					</div>
				</div>
				{Object.values(pickedAddOns).some(Boolean) && (
					<div className={styles.selectedAddOns}>
						{(Object.keys(pickedAddOns) as Array<SelectedAddOn>).map(
							addOn =>
								pickedAddOns[addOn] && (
									<div key={addOn} className={styles.addOn}>
										<div className={styles.addOnTitle}>
											{capitalize(breakCamelCase(addOn))}
										</div>
										<div className={styles.addOnPrice}>
											{formatPrice(
												addOnsData[addOn][planDuration],
												planDuration
											)}
										</div>
									</div>
								)
						)}
					</div>
				)}
			</div>
			<div className={styles.total}>
				<div className={styles.totalTitle}>
					Total (per {planDuration.slice(0, -2)})
				</div>
				<div className={styles.totalPrice}>
					{formatPrice(totalPrice, planDuration)}
				</div>
			</div>
		</div>
	)
}

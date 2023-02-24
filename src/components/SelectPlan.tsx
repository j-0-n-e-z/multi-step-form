import { FC } from 'react'
import { FormItems, Plan as TPlan } from './Panel'
import styles from './SelectPlan.module.scss'
import cn from 'classnames'
import { Plan } from './Plan'
import form from './Form.module.scss'
import { plansData } from '../data/plans'

type SelectPlanProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const SelectPlan: FC<SelectPlanProps> = ({
	selectedPlan,
	isMonthly,
	updateFormData
}) => {
	return (
		<div>
			<div className={form.title}>Select your plan</div>
			<p className={form.description}>
				You have the option of monthly or yearly billing.
			</p>
			<div className={styles.plansWrapper}>
				<div className={styles.plans}>
					{Object.keys(plansData).map(plan => (
						<Plan
							key={plan}
							plan={plan as TPlan}
							isSelected={plan === selectedPlan}
							isMonthly={isMonthly}
							updateFormData={updateFormData}
						/>
					))}
				</div>
				<div>
					<label htmlFor='toggle' className={styles.planLength}>
						<span
							className={cn(styles.planLengthCase, {
								[styles.selected]: isMonthly
							})}
						>
							Monthly
						</span>
						<input
							id='toggle'
							type='checkbox'
							className={styles.switcher}
							onChange={() =>
								updateFormData({
									isMonthly: !isMonthly
								})
							}
							checked={isMonthly}
						/>
						<div className={styles.circle}></div>
						<span
							className={cn(styles.planLengthCase, {
								[styles.selected]: !isMonthly
							})}
						>
							Yearly
						</span>
					</label>
				</div>
			</div>
		</div>
	)
}

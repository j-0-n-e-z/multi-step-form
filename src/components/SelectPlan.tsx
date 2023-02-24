import { FC } from 'react'
import { FormItems, Plan as TPlan } from './Panel'
import styles from './SelectPlan.module.scss'
import cn from 'classnames'
import { Plan } from './Plan'
import form from './Form.module.scss'
import { plansData } from '../data/plans'
import { PlanLengthSwitcher } from './PlanLengthSwitcher'

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
				<PlanLengthSwitcher
					isMonthly={isMonthly}
					updateFormData={updateFormData}
				/>
			</div>
		</div>
	)
}

import { FC } from 'react'
import styles from './SelectPlan.module.scss'
import { Plan } from './Plan'
import form from '../Form.module.scss'
import { plansData } from '../../data/plansData'
import { PlanLengthSwitcher } from './PlanLengthSwitcher'
import { DefaultProps, SelectedPlan } from '../../types'

export const SelectPlan: FC<DefaultProps> = ({
	selectedPlan,
	planDuration,
	updateFormData
}) => {
	return (
		<div className={form.formContent}>
			<div className={form.title}>Select your plan</div>
			<p className={form.description}>
				You have the option of monthly or yearly billing.
			</p>
			<div className={styles.plansWrapper}>
				<div className={styles.plans}>
					{(Object.keys(plansData) as Array<SelectedPlan>).map(plan => (
						<Plan
							key={plan}
							plan={plan}
							isSelected={plan === selectedPlan}
							planDuration={planDuration}
							updateFormData={updateFormData}
						/>
					))}
				</div>
				<PlanLengthSwitcher
					planDuration={planDuration}
					updateFormData={updateFormData}
				/>
			</div>
		</div>
	)
}

import { FC } from 'react'
import { FormItems, Plan as PlanType } from '../Panel'
import styles from './SelectPlan.module.scss'
import { Plan } from './Plan'
import form from '../Form.module.scss'
import { plansData } from '../../data/plansData'
import { PlanLengthSwitcher } from './PlanLengthSwitcher'

type SelectPlanProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const SelectPlan: FC<SelectPlanProps> = ({
	selectedPlan,
	planDuration,
	updateFormData
}) => {
	return (
		<>
			<div className={form.title}>Select your plan</div>
			<p className={form.description}>
				You have the option of monthly or yearly billing.
			</p>
			<div className={styles.plansWrapper}>
				<div className={styles.plans}>
					{(Object.keys(plansData) as PlanType[]).map(plan => (
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
		</>
	)
}

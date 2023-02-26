import { FormItems } from '../Panel'
import cn from 'classnames'
import { FC } from 'react'
import styles from './Plan.module.scss'
import { capitalize, getPricePerPeriodString } from '../../helpers'
import { plansData } from '../../data/plansData'
import { Plan as PlanType } from '../Panel'

type PlanProps = Pick<FormItems, 'planDuration'> & {
	plan: PlanType
	isSelected: boolean
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const Plan: FC<PlanProps> = ({
	plan,
	planDuration,
	isSelected,
	updateFormData
}) => {
	return (
		<label
			className={cn(styles.plan, { [styles.selected]: isSelected })}
			htmlFor={plan}
		>
			<div className={styles.planIcon}>
				<img src={`./images/plans/icon-${plan}.svg`} alt={plan} />
			</div>
			<p className={styles.planTitle}>{capitalize(plan)}</p>
			<p className={styles.price}>
				{getPricePerPeriodString(planDuration, plansData[plan][planDuration])}
			</p>
			{planDuration !== 'monthly' && (
				<div className={styles.monthsFree}>2 months free</div>
			)}
			<input
				id={plan}
				name='plan'
				type='radio'
				onChange={() => updateFormData({ selectedPlan: plan })}
				checked={isSelected}
				hidden
			/>
		</label>
	)
}

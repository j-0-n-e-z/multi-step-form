import cn from 'classnames'
import { FC } from 'react'
import styles from './Plan.module.scss'
import { plansData } from '../../data/plansData'
import { capitalize } from '../../utils/capitalize'
import { formatPrice } from '../../utils/formatPrice'
import { DefaultProps, FormItems, Plan as TPlan } from '../../types'

type PlanProps = Pick<DefaultProps, 'planDuration' | 'updateFormData'> & {
	plan: TPlan
	isSelected: boolean
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
			<img
				className={styles.icon}
				src={`./images/plans/icon-${plan}.svg`}
				alt={plan}
			/>
			<div className={styles.info}>
				<p className={styles.title}>{capitalize(plan)}</p>
				<p className={styles.price}>
					{formatPrice(plansData[plan][planDuration], planDuration).slice(1)}
				</p>
				{planDuration !== 'monthly' && (
					<div className={styles.monthsFree}>2 months free</div>
				)}
			</div>

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

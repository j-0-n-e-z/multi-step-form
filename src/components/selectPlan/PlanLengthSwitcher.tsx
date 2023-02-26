import { FC } from 'react'
import { FormItems } from '../Panel'
import styles from './PlanLengthSwitcher.module.scss'
import cn from 'classnames'

type PlanLengthSwitcherProps = Pick<FormItems, 'planDuration'> & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const PlanLengthSwitcher: FC<PlanLengthSwitcherProps> = ({
	planDuration,
	updateFormData
}) => {
	return (
		<label htmlFor='toggle' className={styles.planLength}>
			<span
				className={cn(styles.planLengthCase, {
					[styles.selected]: planDuration === 'monthly'
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
						planDuration: planDuration === 'monthly' ? 'yearly' : 'monthly'
					})
				}
				checked={planDuration === 'monthly'}
			/>
			<div className={styles.circle}></div>
			<span
				className={cn(styles.planLengthCase, {
					[styles.selected]: planDuration === 'yearly'
				})}
			>
				Yearly
			</span>
		</label>
	)
}

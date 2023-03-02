import { FC } from 'react'
import { DefaultProps, FormItems, FormUpdater } from '../../types'
import styles from './PlanLengthSwitcher.module.scss'
import cn from 'classnames'

type PlanLengthSwitcherProps = Pick<DefaultProps, 'planDuration' | 'updateFormData'>

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

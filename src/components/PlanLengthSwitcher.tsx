import { FC } from 'react'
import { FormItems } from './Panel'
import styles from './PlanLengthSwitcher.module.scss'
import cn from 'classnames'

type PlanLengthSwitcherProps = Pick<FormItems, 'isMonthly'> & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const PlanLengthSwitcher: FC<PlanLengthSwitcherProps> = ({
	isMonthly,
	updateFormData
}) => {
	return (
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
	)
}

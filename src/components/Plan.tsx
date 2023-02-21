import { IPlan, ISelectedPlan } from './Panel'
import cn from 'classnames'
import { FC } from 'react'
import styles from './Plan.module.scss'
import { getMoneyPerPeriodString } from '../helpers'

export const Plan: FC<PlanPropsType> = ({
	plan,
	setSelectedPlan,
	isSelected,
	isMonthly
}) => {
	const handleOnClickOrFocus = () => {
		setSelectedPlan({
			title: plan.title,
			price: isMonthly ? plan.price.monthly : plan.price.yearly,
			isMonthly
		})
	}

	return (
		<button
			type='button'
			className={cn(styles.plan, { [styles.selected]: isSelected })}
			onClick={() => handleOnClickOrFocus()}
			onFocus={() => handleOnClickOrFocus()}
		>
			<img src={plan.icon} alt={plan.title} />
			<div className={styles.planTitle}>{plan.title}</div>
			<div className={styles.price}>
				{getMoneyPerPeriodString(
					isMonthly,
					plan.price.monthly,
					plan.price.yearly
				)}
			</div>
			{!isMonthly && <div className={styles.monthsFree}>2 months free</div>}
		</button>
	)
}

type PlanPropsType = {
	plan: IPlan & { icon: string }
	setSelectedPlan: React.Dispatch<React.SetStateAction<ISelectedPlan>>
	isSelected: boolean
	isMonthly: boolean
}

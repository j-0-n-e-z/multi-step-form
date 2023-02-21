import { IPlan, ISelectedPlan } from './Panel'
import cn from 'classnames'
import { FC } from 'react'
import styles from './Plan.module.scss'

export const Plan: FC<PlanPropsType> = ({
	plan,
	setSelectedPlan,
	isSelected,
	isMonthly
}) => {
	return (
		<button
			type='button'
			className={cn(styles.plan, { [styles.selected]: isSelected })}
			onClick={() =>
				setSelectedPlan({
					title: plan.title,
					price: isMonthly ? plan.price.monthly : plan.price.yearly
				})
			}
			onFocus={() =>
				setSelectedPlan({
					title: plan.title,
					price: isMonthly ? plan.price.monthly : plan.price.yearly
				})
			}
		>
			<img src={plan.icon} alt={plan.title} />
			<div className={styles.planTitle}>{plan.title}</div>
			<div className={styles.price}>
				{isMonthly ? plan.price.monthly : plan.price.yearly}
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
